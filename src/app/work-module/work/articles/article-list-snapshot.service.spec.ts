import { of, Subject } from 'rxjs';
import { ArticleListSession } from './article-list-session';
import { ArticleListSnapshotService } from './article-list-snapshot.service';
import { ArticlePage } from '../../models/dev.model';

describe('Inert article listing return', () => {
  const page = (first: number, count: number): ArticlePage => ({
    rawCount: count,
    records: Array.from({ length: count }, (_, index) => ({
      source: { id: first + index, title: `Record ${first + index}`, description: '',
        published_date: '', cover_image: '', tags: [], typeOf: 'article' },
      publicationInstant: 1000 - first - index,
    })),
  });
  it('returns only one detached memory checkpoint after entering detail, retaining all lookahead and cursor', () => {
    const session = new ArticleListSession(n => of(page((n - 1) * 10 + 1, 10)));
    session.start();
    const store = new ArticleListSnapshotService();
    expect(store.takeReturn()).toBeUndefined();
    const snapshot = { checkpoint: session.checkpoint, sectionOffset: 128,
      initiatingCardKey: 'article-7', keyboard: true };
    store.save(snapshot);
    expect(store.takeReturn()).toBeUndefined();
    store.enterDetail();
    snapshot.checkpoint.displayed[0].source.title = 'Mutated input';
    const restored = store.takeReturn()!;
    expect(restored.checkpoint.displayed.length).toBe(10);
    expect(restored.checkpoint.displayed[0].source.title).toBe('Record 1');
    expect(restored.checkpoint.datedBuffer.length).toBe(10);
    expect(restored.checkpoint.acceptedIds.length).toBe(20);
    expect(restored.checkpoint.nextPage).toBe(3);
    expect(restored.sectionOffset).toBe(128);
    expect(restored.initiatingCardKey).toBe('article-7');
    expect(store.takeReturn()).toBeUndefined();
    expect(new ArticleListSnapshotService().takeReturn()).toBeUndefined();
  });
  it('does not commit interrupted append pages or serialize active work', () => {
    const third = new Subject<ArticlePage>();
    const session = new ArticleListSession(n => n < 3 ? of(page((n - 1) * 10 + 1, 10)) : third);
    session.start();
    session.append();
    const checkpoint = session.checkpoint;
    session.dispose();
    third.next(page(21, 10));
    expect(checkpoint.nextPage).toBe(3);
    expect(checkpoint.displayed.length).toBe(10);
    expect(checkpoint.datedBuffer.length).toBe(10);
    expect(session.checkpoint).toEqual(checkpoint);
    expect(JSON.parse(JSON.stringify(checkpoint))).toEqual(checkpoint);
  });

  it('strips detail HTML and restores complete deferred records and cursor without an initial request', () => {
    const original = new ArticleListSession(n => of(page((n - 1) * 10 + 1, n === 3 ? 5 : 10)));
    original.start();
    const checkpoint = original.checkpoint;
    checkpoint.displayed[0].source.body_html = '<script>Not listing state</script>';
    checkpoint.undatedBuffer.push({ source: { id: 100, title: 'Deferred undated', typeOf: 'article',
      description: '', published_date: '', tags: [], cover_image: '' },
      sessionKey: 'article-100', encounterOrder: 30 });
    checkpoint.acceptedIds.push(100);
    const store = new ArticleListSnapshotService();
    store.save({ checkpoint, sectionOffset: -30, keyboard: false });
    store.enterDetail();
    const snapshot = store.takeReturn()!;
    expect(snapshot.checkpoint.displayed[0].source.body_html).toBeUndefined();
    const loader = jasmine.createSpy('restored loader').and.callFake(n => of(page((n - 1) * 10 + 1, 5)));
    const restored = new ArticleListSession(loader);
    restored.restore(snapshot.checkpoint);
    restored.start();
    expect(loader).not.toHaveBeenCalled();
    expect(restored.displayed.length).toBe(10);
    expect(restored.checkpoint.undatedBuffer[0].sessionKey).toBe('article-100');
    expect(restored.checkpoint.acceptedIds).toContain(100);
    restored.append();
    expect(loader).toHaveBeenCalledOnceWith(3);
    expect(restored.displayed.length).toBe(20);
    restored.append();
    expect(restored.displayed.at(-1)?.source.title).toBe('Deferred undated');
    expect(restored.hasMore).toBeFalse();
  });
});
