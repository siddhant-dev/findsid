import { Subject } from 'rxjs';
import { ArticlePage, ListingArticle } from '../../models/dev.model';
import { ArticleListSession } from './article-list-session';

function record(id: number | undefined, instant?: number): ListingArticle {
  return {
    source: { id, title: `Article ${id}`, description: '', tags: [], published_date: '',
      cover_image: '', typeOf: 'article' },
    publicationInstant: instant,
  };
}

describe('Article listing atomic session', () => {
  let requests: { page: number; response: Subject<ArticlePage> }[];
  let session: ArticleListSession;
  let commits: (string | undefined)[];

  beforeEach(() => {
    requests = [];
    commits = [];
    session = new ArticleListSession(page => {
      const response = new Subject<ArticlePage>();
      requests.push({ page, response });
      return response;
    }, key => commits.push(key));
  });
  afterEach(() => session.dispose());

  function flush(records: ListingArticle[], rawCount = records.length): void {
    const request = requests[requests.length - 1];
    expect(request).toBeDefined();
    if (!request) return;
    request.response.next({ records, rawCount });
    request.response.complete();
  }
  const ten = (start: number) => Array.from({ length: 10 }, (_, i) => record(start + i, 10000 - start - i));

  for (const count of [0, 1, 9, 10, 11, 20, 21]) {
    it(`reveals all ${count} records in exact ten-card batches with accurate lookahead`, () => {
      session.start();
      let supplied = 0;
      let rendered = 0;
      while (supplied <= count) {
        const remaining = Math.min(10, count - supplied);
        flush(Array.from({ length: remaining }, (_, i) => record(supplied + i + 1, 10000 - supplied - i)));
        supplied += remaining;
        if (remaining < 10) break;
        if (session.state === 'ready') {
          rendered += 10;
          expect(session.displayed.length).toBe(rendered);
          expect(session.hasMore).toBeTrue();
          session.append();
        }
      }
      while (session.hasMore) {
        rendered += 10;
        expect(session.displayed.length).toBe(rendered);
        session.append();
      }
      expect(session.displayed.length).toBe(count);
      expect(session.hasMore).toBeFalse();
      expect(session.state).toBe(count ? 'ready' : 'empty');
      expect(new Set(session.displayed.map(item => item.source.id)).size).toBe(count);
    });
  }

  it('continues full rejected/duplicate pages and retains first accepted IDs', () => {
    session.start();
    flush([record(1, 11000)], 10);
    flush([], 10);
    flush([record(1), ...ten(2)], 10);
    expect(session.displayed.map(item => item.source.id)).toEqual(Array.from({ length: 10 }, (_, i) => i + 1));
    expect(session.hasMore).toBeTrue();
    session.append();
    flush([], 0);
    expect(session.displayed.map(item => item.source.id)).toEqual(Array.from({ length: 11 }, (_, i) => i + 1));
    expect(requests.map(item => item.page)).toEqual([1, 2, 3, 4]);
  });

  it('defers undated records until exhaustion, sorts dates and keeps stable ties/encounter identities', () => {
    session.start();
    flush([record(undefined, undefined), record(1, 200), record(2, 200)], 10);
    flush([record(3, 100), record(undefined, undefined)], 2);
    expect(session.displayed.map(item => item.source.id)).toEqual([1, 2, 3, undefined, undefined]);
    expect(new Set(session.displayed.map(item => item.sessionKey)).size).toBe(5);
  });

  it('preserves partial initial progress and retries only the failed lookahead page', () => {
    session.start();
    flush(ten(1));
    expect(session.displayed).toEqual([]);
    expect(requests.length).toBe(2);
    requests[1]?.response.error(new Error('Offline'));
    expect(session.state).toBe('initial-error');
    expect(session.checkpoint.nextPage).toBe(1);
    session.retry();
    flush([record(11, 9000)], 1);
    expect(requests.map(item => item.page)).toEqual([1, 2, 2]);
    expect(session.displayed.length).toBe(10);
    expect(session.hasMore).toBeTrue();
  });

  it('keeps displayed cards and pending progress atomic across append failure and duplicate actions', () => {
    session.start();
    session.start();
    expect(requests.length).toBe(1);
    flush(ten(1));
    flush(ten(11));
    const checkpoint = structuredClone(session.checkpoint);
    session.append();
    session.append();
    session.retry();
    expect(requests.length).toBe(3);
    requests[2]?.response.error(new Error('429'));
    expect(session.state).toBe('append-error');
    expect(session.displayed.length).toBe(10);
    expect(session.checkpoint).toEqual(checkpoint);
    session.retry();
    flush([record(21, 8000)], 1);
    expect(session.displayed.length).toBe(20);
    expect(requests.map(item => item.page)).toEqual([1, 2, 3, 3]);
    expect(commits.filter(key => key !== undefined)).toEqual(['article-11']);
    session.append();
    expect(session.displayed.length).toBe(21);
  });

  it('cancels active work and preserves only the committed checkpoint on departure', () => {
    session.start();
    flush(ten(1));
    flush(ten(11));
    const checkpoint = structuredClone(session.checkpoint);
    session.append();
    const pending = requests[2]?.response;
    session.dispose();
    expect(pending?.observed).toBeFalse();
    pending?.next({ records: [record(21)], rawCount: 1 });
    expect(session.state).toBe('disposed');
    expect(session.checkpoint).toEqual(checkpoint);
    expect(session.displayed.length).toBe(10);
  });

  it('distinguishes true empty from exhausted rejected content and restarts only explicit data-error Retry', () => {
    session.start();
    flush([], 10);
    flush([], 1);
    expect(session.state).toBe('initial-error');
    session.retry();
    expect(requests.map(item => item.page)).toEqual([1, 2, 1]);
    flush([], 0);
    expect(session.state).toBe('empty');
    session.retry();
    expect(requests.length).toBe(3);
  });

  it('retains committed raw remainder, deferred content and IDs, discarding interrupted append', () => {
    session.start();
    flush([record(undefined), ...ten(1).slice(0, 9)], 10);
    flush(ten(10));
    flush(ten(20));
    flush([], 0);
    const checkpoint = session.checkpoint;
    expect(checkpoint.displayed.length).toBe(10);
    expect(checkpoint.datedBuffer.length).toBe(19);
    expect(checkpoint.undatedBuffer.length).toBe(1);
    expect(checkpoint.acceptedIds.length).toBe(29);
    expect(checkpoint.nextPage).toBe(5);
    expect(checkpoint.sourceExhausted).toBeTrue();
    checkpoint.datedBuffer.length = 0;
    expect(session.checkpoint.datedBuffer.length).toBe(19);
    session.append();
    expect(session.displayed.length).toBe(20);
    session.append();
    expect(session.displayed.length).toBe(30);
    expect(session.displayed[29].source.id).toBeUndefined();
    expect(session.hasMore).toBeFalse();
  });

  it('treats a zero-new exhausted append as completion and never commits stale errors', () => {
    session.start();
    flush(ten(1));
    flush(ten(11));
    session.append();
    flush([], 0);
    expect(session.state).toBe('ready');
    expect(session.displayed.length).toBe(20);
    expect(session.hasMore).toBeFalse();
    session.append();
    expect(requests.length).toBe(3);
    session.dispose();
    requests[2].response.error(new Error('Late error'));
    expect(session.state).toBe('disposed');
  });

  it('does not cap rejected-only enumeration or lose partially accumulated append progress on Retry', () => {
    session.start();
    for (let i = 0; i < 30; i++) flush([], 10);
    flush(ten(1));
    flush([record(11, 9989)], 10);
    expect(session.displayed.length).toBe(10);
    session.append();
    flush(ten(12).slice(0, 5), 10);
    const checkpoint = session.checkpoint;
    requests[requests.length - 1].response.error(new Error('Protocol error'));
    expect(session.displayed.length).toBe(10);
    expect(session.checkpoint).toEqual(checkpoint);
    session.retry();
    flush([record(17, 9983)], 1);
    expect(session.displayed.map(item => item.source.id)).toEqual(Array.from({ length: 17 }, (_, i) => i + 1));
    expect(session.hasMore).toBeFalse();
    expect(requests.slice(-4).map(item => item.page)).toEqual([32, 33, 34, 34]);
  });
});
