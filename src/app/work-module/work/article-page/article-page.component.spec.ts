import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ArticlePageComponent } from './article-page.component';
import {
  ArticleNotFoundError,
  ArticlesService,
} from '../../services/articles.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('Blueprint article reading', () => {
  let fixture: ComponentFixture<ArticlePageComponent>;
  let requests: { id: number; response: Subject<unknown> }[];
  let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  const detail = {
    id: 42,
    ownerUsername: 'siddev',
    title: 'Complete controlled article',
    description: 'Controlled metadata',
    published_date: 'Oct 4',
    tags: ['Angular', 'RxJS'],
    cover_image: 'https://example.invalid/social.svg',
    typeOf: 'article',
    sourceUrl: 'https://dev.to/siddev/controlled',
    readingTimeMinutes: 3,
    body_html:
      '<h2>Safe section</h2><p>Full body <a href="https://outside.invalid">Outside</a></p>' +
      '<ul><li>List item</li></ul><pre><code>' +
      'wideCode'.repeat(80) +
      '</code></pre>' +
      '<table><tbody><tr><td>' +
      'wideCell'.repeat(80) +
      '</td></tr></tbody></table>' +
      '<img src="/bad.svg" alt="Supplied image description"><img src="/bad2.svg">',
  };
  beforeEach(async () => {
    requests = [];
    params = new BehaviorSubject(convertToParamMap({ id: '42' }));
    await TestBed.configureTestingModule({
      imports: [ArticlePageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: params,
            params: new BehaviorSubject({ id: '42' }),
          },
        },
        {
          provide: ArticlesService,
          useValue: {
            getArticleById: (id: number) => {
              const response = new Subject<unknown>();
              requests.push({ id, response });
              return response;
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ArticlePageComponent);
    fixture.detectChanges();
  });
  afterEach(() => fixture.destroy());
  it('rejects invalid route IDs without requesting and clears previous content', async () => {
    await ready();
    for (const id of [
      '0',
      '-1',
      '1.5',
      'abc',
      '1e2',
      '9007199254740992',
      '42 ',
      '',
    ]) {
      params.next(convertToParamMap({ id }));
      render();
      expect(fixture.nativeElement.textContent).toContain('Article not found.');
      expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    }
    expect(requests.length).toBe(1);
  });
  it('cancels superseded IDs and permits a single controlled data Retry', () => {
    params.next(convertToParamMap({ id: '43' }));
    expect(requests[0].response.observed).toBeFalse();
    requests[0].response.next(detail);
    render();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    requests[1].response.error(new HttpErrorResponse({ status: 429 }));
    render();
    expect(fixture.nativeElement.textContent).toContain(
      "Article couldn't be loaded.",
    );
    const retry: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(retry).not.toBeNull();
    retry?.click();
    retry?.click();
    expect(requests.length).toBe(3);
    expect(requests[2].id).toBe(43);
    requests[2].response.next({ ...detail, id: 43, title: 'Latest' });
    render();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe(
      'Latest',
    );
    params.next(convertToParamMap({ id: '44' }));
    render();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    requests[3].response.error(new ArticleNotFoundError('Owner'));
    render();
    expect(fixture.nativeElement.textContent).toContain('Article not found.');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    params.next(convertToParamMap({ id: '45' }));
    requests[4].response.error(new HttpErrorResponse({ status: 404 }));
    render();
    expect(fixture.nativeElement.textContent).toContain('Article not found.');
  });
  const render = () => {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  };
  async function ready(): Promise<HTMLElement> {
    requests[0].response.next(detail);
    render();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    return fixture.nativeElement;
  }
  it('shows one complete header and safe body with no cover or whole-body Tab stop', async () => {
    const root = await ready();
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelector('h1')?.textContent).toBe(detail.title);
    expect(root.querySelector('a[href="/#articles"]')).not.toBeNull();
    expect(root.querySelectorAll('.tags .tag').length).toBe(2);
    expect(root.textContent).toContain('3 min read');
    expect(root.querySelector('a.source-link')?.getAttribute('target')).toBe(
      '_blank',
    );
    expect(root.querySelector('.full-article[tabindex]')).toBeNull();
    expect(root.querySelector('img[alt="banner"]')).toBeNull();
    expect(root.querySelector('.full-article h2')?.textContent).toBe(
      'Safe section',
    );
  });
  it('styles injected descendants and gives wide code/tables local keyboard scrolling', async () => {
    const root = await ready();
    root.style.width = '320px';
    document.body.appendChild(root);
    const body = root.querySelector<HTMLElement>('.full-article')!;
    expect(getComputedStyle(body).textAlign).toBe('left');
    const pre = body.querySelector<HTMLElement>('pre')!;
    expect(getComputedStyle(pre).overflowX).toBe('auto');
    const padding = `${parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5}px`;
    for (const side of [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ] as const) {
      expect(getComputedStyle(pre)[side]).toBe(padding);
    }
    expect(pre.tabIndex).toBe(0);
    expect(
      body
        .querySelector('table')
        ?.parentElement?.classList.contains('table-scroll'),
    ).toBeTrue();
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
    root.remove();
  });
  it('replaces broken body images with safe alt/default text and disposes stale callbacks', async () => {
    requests[0].response.next(detail);
    render();
    const root: HTMLElement = fixture.nativeElement;
    const images = [...root.querySelectorAll('img')];
    const first = images.find(
      (image) => image.alt === 'Supplied image description',
    )!;
    first.dispatchEvent(new Event('error'));
    images
      .find((image) => image.getAttribute('src') === '/bad2.svg')!
      .dispatchEvent(new Event('error'));
    expect(root.textContent).toContain('Supplied image description');
    expect(root.textContent).toContain('Article image unavailable.');
    expect(root.querySelectorAll('.image-fallback').length).toBe(2);
    fixture.destroy();
    first.dispatchEvent(new Event('error'));
    expect(root.querySelectorAll('.image-fallback').length).toBe(2);
  });

  it('disposes image callbacks on content replacement and renders omitted optional fields without invented labels', () => {
    requests[0].response.next(detail);
    render();
    const previous: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    params.next(convertToParamMap({ id: '43' }));
    render();
    requests[1].response.next({
      ...detail,
      id: 43,
      cover_image: '',
      published_date: '',
      tags: [],
      readingTimeMinutes: undefined,
      sourceUrl: undefined,
      description: '',
      body_html: '<p>New body</p>',
    });
    render();
    previous.dispatchEvent(new Event('error'));
    expect(fixture.nativeElement.textContent).toContain('New body');
    expect(fixture.nativeElement.querySelector('.image-fallback')).toBeNull();
    expect(fixture.nativeElement.querySelector('.tags')).toBeNull();
    expect(fixture.nativeElement.querySelector('.metadata-text')).toBeNull();
    expect(fixture.nativeElement.querySelector('.source-link')).toBeNull();
  });

  it('renders controlled article text and keeps code scrolling local', () => {
    const element = fixture.nativeElement as HTMLElement;
    const article = element.querySelector('.full-article') as HTMLElement;
    const code = article.querySelector('pre') as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Test article');
    expect(article.textContent).toContain('Article content remains readable.');
    expect(getComputedStyle(code).overflowX).toBe('auto');
  });

  it('annotates replaced article HTML without affecting detail images and native internal links', async () => {
    const root: HTMLElement = fixture.nativeElement;
    for (const host of ['external.example', 'replacement.example']) {
      component.article = {
        ...component.article,
        body_html:
          `<p><a href="https://${host}">External</a>` +
          '<a href="/#about">Internal</a><a href="mailto:hi@example.com">Mail</a></p>',
      };
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      const external =
        root.querySelector<HTMLAnchorElement>('.full-article a')!;
      expect(external.target).toBe('_blank');
      expect(external.rel).toContain('noopener');
      expect(external.rel).toContain('noreferrer');
      expect(
        root
          .querySelector('.full-article a:nth-child(2)')
          ?.getAttribute('target'),
      ).toBeNull();
      expect(root.querySelector('img')).not.toBeNull();
    }
    expect(requests.length).toBe(1);
  });
  it('cancels superseded IDs and permits a single controlled data Retry', () => {
    params.next(convertToParamMap({ id: '43' }));
    expect(requests[0].response.observed).toBeFalse();
    requests[0].response.next(detail);
    render();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    requests[1].response.error(new HttpErrorResponse({ status: 429 }));
    render();
    expect(fixture.nativeElement.textContent).toContain(
      "Article couldn't be loaded.",
    );
    const retry: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(retry).not.toBeNull();
    retry?.click();
    retry?.click();
    expect(requests.length).toBe(3);
    expect(requests[2].id).toBe(43);
    requests[2].response.next({ ...detail, id: 43, title: 'Latest' });
    render();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe(
      'Latest',
    );
    params.next(convertToParamMap({ id: '44' }));
    render();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    requests[3].response.error(new ArticleNotFoundError('Owner'));
    render();
    expect(fixture.nativeElement.textContent).toContain('Article not found.');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    params.next(convertToParamMap({ id: '45' }));
    requests[4].response.error(new HttpErrorResponse({ status: 404 }));
    render();
    expect(fixture.nativeElement.textContent).toContain('Article not found.');
  });
  const render = () => {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  };
  async function ready(): Promise<HTMLElement> {
    requests[0].response.next(detail);
    render();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    return fixture.nativeElement;
  }
  it('shows one complete header and safe body with no cover or whole-body Tab stop', async () => {
    const root = await ready();
    expect(root.querySelectorAll('h1').length).toBe(1);
    expect(root.querySelector('h1')?.textContent).toBe(detail.title);
    expect(root.querySelector('a[href="/#articles"]')).not.toBeNull();
    expect(root.querySelectorAll('.tags .tag').length).toBe(2);
    expect(root.textContent).toContain('3 min read');
    expect(root.querySelector('a.source-link')?.getAttribute('target')).toBe(
      '_blank',
    );
    expect(root.querySelector('.full-article[tabindex]')).toBeNull();
    expect(root.querySelector('img[alt="banner"]')).toBeNull();
    expect(root.querySelector('.full-article h2')?.textContent).toBe(
      'Safe section',
    );
  });
  it('styles injected descendants and gives wide code/tables local keyboard scrolling', async () => {
    const root = await ready();
    root.style.width = '320px';
    document.body.appendChild(root);
    const body = root.querySelector<HTMLElement>('.full-article')!;
    expect(getComputedStyle(body).textAlign).toBe('left');
    const pre = body.querySelector<HTMLElement>('pre')!;
    expect(getComputedStyle(pre).overflowX).toBe('auto');
    const padding = `${parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5}px`;
    for (const side of [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ] as const) {
      expect(getComputedStyle(pre)[side]).toBe(padding);
    }
    expect(pre.tabIndex).toBe(0);
    expect(
      body
        .querySelector('table')
        ?.parentElement?.classList.contains('table-scroll'),
    ).toBeTrue();
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
    root.remove();
  });
  it('replaces broken body images with safe alt/default text and disposes stale callbacks', async () => {
    requests[0].response.next(detail);
    render();
    const root: HTMLElement = fixture.nativeElement;
    const images = [...root.querySelectorAll('img')];
    const first = images.find(
      (image) => image.alt === 'Supplied image description',
    )!;
    first.dispatchEvent(new Event('error'));
    images
      .find((image) => image.getAttribute('src') === '/bad2.svg')!
      .dispatchEvent(new Event('error'));
    expect(root.textContent).toContain('Supplied image description');
    expect(root.textContent).toContain('Article image unavailable.');
    expect(root.querySelectorAll('.image-fallback').length).toBe(2);
    fixture.destroy();
    first.dispatchEvent(new Event('error'));
    expect(root.querySelectorAll('.image-fallback').length).toBe(2);
  });

  it('disposes image callbacks on content replacement and renders omitted optional fields without invented labels', () => {
    requests[0].response.next(detail);
    render();
    const previous: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    params.next(convertToParamMap({ id: '43' }));
    render();
    requests[1].response.next({
      ...detail,
      id: 43,
      cover_image: '',
      published_date: '',
      tags: [],
      readingTimeMinutes: undefined,
      sourceUrl: undefined,
      description: '',
      body_html: '<p>New body</p>',
    });
    render();
    previous.dispatchEvent(new Event('error'));
    expect(fixture.nativeElement.textContent).toContain('New body');
    expect(fixture.nativeElement.querySelector('.image-fallback')).toBeNull();
    expect(fixture.nativeElement.querySelector('.tags')).toBeNull();
    expect(fixture.nativeElement.querySelector('.metadata-text')).toBeNull();
    expect(fixture.nativeElement.querySelector('.source-link')).toBeNull();
  });
});
