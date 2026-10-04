import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { ArticlePage } from '../models/dev.model';
import { articleCard, ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let http: HttpTestingController;
  const url = (page: number) => `https://dev.to/api/articles?username=siddev&page=${page}&per_page=10`;
  const source = {
    id: 42, title: 'Controlled title', description: 'Complete description',
    readable_publish_date: 'Oct 4', social_image: '/detail-cover.svg',
    published_at: '2026-10-03T00:00:00Z', user: { username: 'siddev' },
    tag_list: ['Angular', 'RxJS', ' ', 'Signals'],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ArticlesService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('pages only the public owner feed without credentials or body requests and waits for HTTP', () => {
    let result: ArticlePage | undefined;
    service.getPage(3).subscribe(data => result = data);
    const request = http.expectOne(url(3));
    expect(result).toBeUndefined();
    expect(request.request.headers.has('api-key')).toBeFalse();
    request.flush([source]);
    expect(result?.rawCount).toBe(1);
    expect(articleCard(result!.records[0].source)).toEqual({
      id: 42, kind: 'article', title: source.title, description: source.description,
      publishedDate: 'Oct 4', tags: ['Angular', 'RxJS', 'Signals'], destination: '/work/articles/42',
    });
    expect(result?.records[0].publicationInstant).toBe(Date.parse(source.published_at));
    expect('cover_image' in articleCard(result!.records[0].source)).toBeFalse();
    expect('body_html' in articleCard(result!.records[0].source)).toBeFalse();
  });

  it('rejects individual malformed/wrong-owner records without reserving IDs or dumping payloads', () => {
    const rejected = spyOn(console, 'warn');
    let result: ArticlePage | undefined;
    service.getPage(1).subscribe(data => result = data);
    http.expectOne(url(1)).flush([
      null, { ...source, title: ' ' }, { ...source, user: { username: 'other' } },
      { ...source, user: undefined }, { ...source, description: 4 }, { ...source, tag_list: {} },
      { ...source, tag_list: ['ok', 4] }, source,
    ]);
    expect(result?.rawCount).toBe(8);
    expect(result?.records.length).toBe(1);
    expect(result?.records[0].source.id).toBe(42);
    expect(rejected.calls.count()).toBe(7);
    expect(rejected.calls.allArgs().every(args => args.every(value => typeof value === 'string'))).toBeTrue();
  });

  it('omits optional content and keeps invalid IDs Archived rather than rejecting useful text', () => {
    for (const id of [undefined, null, 0, -1, 1.5, '7', Number.MAX_SAFE_INTEGER + 1]) {
      service.getPage(1).subscribe(data => {
        const card = articleCard(data.records[0].source);
        expect(card.destination).toBeUndefined();
        expect(card.description).toBeUndefined();
        expect(card.publishedDate).toBeUndefined();
        expect(card.tags).toEqual([]);
      });
      http.expectOne(url(1)).flush([{ id, title: 'Retained title', user: source.user }]);
    }
  });

  it('hides absent/invalid machine dates and retains valid fallback timestamps and labels', () => {
    service.getPage(1).subscribe(data => {
      expect(data.records.map(item => item.publicationInstant)).toEqual([
        undefined, undefined, undefined, Date.parse(source.published_at), Date.parse(source.published_at),
      ]);
      expect(data.records.map(item => item.source.published_date)).toEqual(['', '', '', 'Oct 4', 'Oct 4']);
    });
    http.expectOne(url(1)).flush([
      { ...source, published_at: null }, { ...source, published_at: 'bad' },
      { ...source, published_at: 4 }, { ...source, published_at: undefined, published_timestamp: source.published_at },
      { ...source, published_at: 'invalid', published_timestamp: source.published_at },
    ]);
  });

  it('keeps genuine empty, malformed-envelope, network and rate-limit results distinct', () => {
    service.getPage(1).subscribe(data => expect(data).toEqual({ rawCount: 0, records: [] }));
    http.expectOne(url(1)).flush([]);
    let failures = 0;
    for (const response of [{}, null, 'Not JSON']) {
      service.getPage(2).subscribe({ next: () => fail('Protocol failure must not succeed'), error: () => failures++ });
      http.expectOne(url(2)).flush(response);
    }
    service.getPage(3).subscribe({ next: () => fail('429 must not succeed'), error: () => failures++ });
    http.expectOne(url(3)).flush('Rate limited', { status: 429, statusText: 'Too Many Requests' });
    service.getPage(4).subscribe({ next: () => fail('Offline must not succeed'), error: () => failures++ });
    http.expectOne(url(4)).error(new ProgressEvent('error'));
    expect(failures).toBe(5);
  });

  it('keeps detail HTML and image metadata separate from card content', () => {
    service.getArticleById(42).subscribe(data => {
      expect(data.cover_image).toBe('/detail-cover.svg');
      expect(data.tags).toEqual(['Angular', 'RxJS', 'Signals']);
      expect(TestBed.inject(DomSanitizer).sanitize(SecurityContext.HTML, data.body_html!))
        .toContain('Detail content');
    });
    http.expectOne('https://dev.to/api/articles/42').flush({ ...source, body_html: '<p>Detail content</p>' });
  });
});
