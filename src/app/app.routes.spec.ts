import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ARTICLE_ROUTE_LOADER } from './article-route-loader';
import { ArticlePageComponent } from './work-module/work/article-page/article-page.component';
import { ArticleListSnapshotService } from './work-module/work/articles/article-list-snapshot.service';
import { CONTACT_ROUTING_PROVIDERS } from './shared/contact-modal-host';

describe('application routes', () => {
  let router: Router;
  let harness: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(APP_ROUTES),
        ...CONTACT_ROUTING_PROVIDERS,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
    harness = await RouterTestingHarness.create();
  });

  afterEach(() => {
    harness.fixture.destroy();
    http.verify({ ignoreCancelled: true });
  });

  async function settleArticles(home: HomeComponent): Promise<void> {
    const nextFrame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await nextFrame();
    for (
      let frame = 0;
      frame < 30 &&
      ['idle', 'loading'].includes(home.state('articles').status);
      frame += 1
    ) {
      await nextFrame();
    }
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('#articles app-articles')).not.toBeNull();
    http.expectOne('https://dev.to/api/articles?username=siddev&page=1&per_page=10').flush([]);
  }

  async function settleVault(home: HomeComponent): Promise<void> {
    const nextFrame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await nextFrame();
    for (
      let frame = 0;
      frame < 30 && ['idle', 'loading'].includes(home.state('vault').status);
      frame += 1
    ) {
      await nextFrame();
    }
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(home.state('vault').status).toBe('ready');
    expect(harness.routeNativeElement?.querySelector('#vault app-apps')).not.toBeNull();
  }

  it('renders the five permanent homepage sections in contract order', async () => {
    await harness.navigateByUrl('/');
    const sections = Array.from(
      harness.routeNativeElement?.querySelectorAll<HTMLElement>('[data-home-section]') ?? [],
    );

    expect(sections.map((section) => section.id)).toEqual([
      'about',
      'lab',
      'experience',
      'articles',
      'vault',
    ]);
    expect(sections.map((section) => section.querySelector('h2')?.textContent?.trim())).toEqual([
      'About me',
      'Interaction Lab',
      'Experiences',
      'Articles',
      'Retro Vault',
    ]);
    const about = harness.routeNativeElement?.querySelector<HTMLElement>('#about');
    expect(about?.querySelectorAll('#about-heading').length).toBe(1);
    expect(about?.querySelectorAll('h1, h2, h3, h4, h5, h6').length).toBe(1);
    expect(about?.querySelectorAll('app-about p').length).toBe(1);
    expect(about?.querySelector('app-about p')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'I am a millennial born in Kolkata, Enjoy working as UI Developer and moved to UX design to strengthen my knowledge and bridge the gap between user interfaces and user need. Beyond work you’ll find me smashing and killing enemies in RPG games, dribbling in football games, travelling, watching movies/shows, designing or sleeping. For me learning never stops and I work on small personal projects to improve my skill.',
    );
  });

  for (const [path, destination] of [
    ['/work', '/#articles'],
    ['/work/articles', '/#articles'],
    ['/work/apps', '/#vault'],
  ]) {
    it(`replaces the legacy route ${path} with ${destination}`, async () => {
      const home = await harness.navigateByUrl(path, HomeComponent);
      if (destination.includes('articles')) {
        await settleArticles(home);
        expect(home.state('articles').status).not.toBe('idle');
        expect(home.state('articles').status).toBe('ready');
      } else {
        await settleVault(home);
      }
      expect(router.url).toBe(destination);
      expect(harness.routeNativeElement?.querySelector('#about-heading')).not.toBeNull();
    });
  }

  it('activates Articles immediately for a direct fragment and leaves unknown fragments alone', async () => {
    const home = await harness.navigateByUrl('/#articles', HomeComponent);
    await settleArticles(home);
    expect(home.state('articles').status).not.toBe('idle');
    expect(home.state('articles').status).toBe('ready');
    expect(router.url).toBe('/#articles');

    await harness.navigateByUrl('/#unrecognized');
    expect(router.url).toBe('/#unrecognized');
    expect(harness.routeNativeElement?.querySelector('#about-heading')).not.toBeNull();
  });

  it('preserves direct navigation to the About fragment', async () => {
    await harness.navigateByUrl('/#about', HomeComponent);

    expect(router.url).toBe('/#about');
    expect(harness.routeNativeElement?.querySelector('#about-heading')?.textContent?.trim()).toBe(
      'About me',
    );
    expect(harness.routeNativeElement?.querySelector('#about app-about p')).not.toBeNull();
  });

  it('keeps an eager code-load failure boundary with actual loader Retry and Back', async () => {
    harness.fixture.destroy();
    TestBed.resetTestingModule();
    let attempts = 0;
    const loader = jasmine.createSpy('actual detail loader').and.callFake(() =>
    ++attempts === 1 ? Promise.reject(new Error('Controlled unavailable chunk')) : Promise.resolve(ArticlePageComponent));
    await TestBed.configureTestingModule({
    providers: [provideRouter(APP_ROUTES), ...CONTACT_ROUTING_PROVIDERS, provideHttpClient(), provideHttpClientTesting(),
      { provide: ARTICLE_ROUTE_LOADER, useValue: loader }],
    }).compileComponents();
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
    await harness.navigateByUrl('/work/articles/42');
    await harness.fixture.whenStable();
    harness.detectChanges();
    http.match('https://dev.to/api/articles/42').forEach(request => request.flush({
    id: 42, user: { username: 'siddev' }, title: 'Unexpected eager detail', body_html: '<p>Body</p>',
    }));
    expect(harness.routeNativeElement?.textContent).toContain("This page couldn't be loaded.");
    const retry = harness.routeNativeElement?.querySelector<HTMLButtonElement>('button');
    expect(retry).not.toBeNull();
    expect(retry?.classList.contains('blueprint-button')).toBeTrue();
    retry?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(loader.calls.count()).toBe(2);
    const request = http.match('https://dev.to/api/articles/42')[0];
    expect(request).toBeDefined();
    request?.flush({ id: 42, user: { username: 'siddev' }, title: 'Recovered title', body_html: '<p>Recovered body</p>' });
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Recovered title');
    const back = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('a[href="/#articles"]');
    expect(back).not.toBeNull();
    back?.click();
    await harness.fixture.whenStable();
    const home = harness.routeDebugElement?.componentInstance as HomeComponent;
    await settleArticles(home);
    expect(router.url).toBe('/#articles');
  });

  it('renders a detail-shaped response and styled data Retry through the real route', async () => {
    await harness.navigateByUrl('/work/articles/805');
    for (let frame = 0; frame < 30 && !harness.routeNativeElement?.querySelector('app-article-page'); frame++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      harness.detectChanges();
    }
    http.expectOne('https://dev.to/api/articles/805').flush('Rate limited', {
      status: 429, statusText: 'Too Many Requests',
    });
    harness.detectChanges();
    const retry = harness.routeNativeElement?.querySelector<HTMLButtonElement>('button');
    expect(retry?.classList.contains('blueprint-button')).toBeTrue();
    retry?.click();
    retry?.click();
    http.expectOne('https://dev.to/api/articles/805').flush({
      id: 805, title: 'Independent routed detail', user: { username: 'siddev' },
      tag_list: 'angular,typescript,rxjs', tags: ['angular', 'typescript', 'rxjs'],
      body_html: '<h2>Preserved section</h2><p>Complete routed body</p>',
    });
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Independent routed detail');
    expect(harness.routeNativeElement?.querySelector('.full-article')?.textContent).toContain('Complete routed body');
    expect(Array.from(harness.routeNativeElement?.querySelectorAll('.tags .tag') ?? [], tag => tag.textContent))
      .toEqual(['angular', 'typescript', 'rxjs']);
  });

  it('restores committed listing data without page-one refetch through the real return route', async () => {
    const store = TestBed.inject(ArticleListSnapshotService);
    store.save({
    checkpoint: {
      displayed: [{ source: { id: 42, title: 'Saved card', typeOf: 'article', description: '',
        published_date: '', tags: [], cover_image: '' }, sessionKey: 'article-42', encounterOrder: 0 }],
      datedBuffer: [], undatedBuffer: [], acceptedIds: [42], nextPage: 3,
      sourceExhausted: true, sourceHadRecords: true, encounterOrder: 1, hasMore: false,
    }, sectionOffset: 100, initiatingCardKey: 'article-42', keyboard: true,
    });
    await harness.navigateByUrl('/work/articles/42');
    for (let frame = 0; frame < 30 && !harness.routeNativeElement?.querySelector('app-article-page'); frame++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      harness.detectChanges();
    }
    await harness.fixture.whenStable();
    harness.detectChanges();
    http.expectOne('https://dev.to/api/articles/42').flush({
    id: 42, user: { username: 'siddev' }, title: 'Detail', body_html: '<p>Body</p>',
    });
    await harness.navigateByUrl('/#articles');
    for (let frame = 0; frame < 30 && !harness.routeNativeElement?.querySelector('app-articles'); frame++) {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    harness.detectChanges();
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    expect(harness.routeNativeElement?.textContent).toContain('Saved card');
    http.expectNone('https://dev.to/api/articles?username=siddev&page=1&per_page=10');
    expect(document.activeElement?.textContent).toContain('Saved card');
  });
});
