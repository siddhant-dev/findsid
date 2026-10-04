import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { AppsComponent } from '../work-module/work/apps/apps.component';
import {
  LazySectionId,
  SectionActivationCoordinator,
  SectionLoader,
} from './section-activation';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { SectionNavigationCoordinator } from './section-navigation';
import { Title, Meta } from '@angular/platform-browser';

describe('Home Experiences activation', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let intersect: IntersectionObserverCallback;
  let resized: ResizeObserverCallback;
  let observed: Element[];
  let observer: IntersectionObserver;
  let resizeObserver: ResizeObserver;
  let http: HttpTestingController;

  beforeEach(async () => {
    observed = [];
    spyOn(window, 'IntersectionObserver').and.callFake(function (callback) {
      intersect = callback;
      observer = {
        observe: (target: Element) => observed.push(target),
        unobserve: () => undefined,
        disconnect: () => undefined,
        takeRecords: () => [],
        root: null,
        rootMargin: '0px',
        scrollMargin: '0px',
        thresholds: [0],
      };
      return observer;
    });
    spyOn(window, 'ResizeObserver').and.callFake(function (callback) {
      resized = callback;
      resizeObserver = {
        observe: () => undefined,
        unobserve: () => undefined,
        disconnect: () => undefined,
      };
      return resizeObserver;
    });
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([{ path: '', component: HomeComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
    spyOn(TestBed.inject(Title), 'setTitle');
    spyOn(TestBed.inject(Meta), 'updateTag');
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    http.verify();
  });

  async function frames(count = 30): Promise<void> {
    for (let i = 0; i < count; i++) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    fixture.detectChanges();
  }

  function activate(): void {
    const section = fixture.nativeElement.querySelector(
      '#experience',
    ) as HTMLElement;
    intersect(
      [
        {
          target: section,
          isIntersecting: true,
          boundingClientRect: new DOMRect(),
          intersectionRect: new DOMRect(),
          rootBounds: null,
          time: 0,
          intersectionRatio: 1,
        },
      ],
      observer,
    );
  }

  it('keeps the heading permanent and defers all roles until viewport activation', async () => {
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('#experience-heading').length).toBe(1);
    expect(root.querySelector('app-experiences')).toBeNull();
    expect(root.textContent).not.toContain('Naviam');
    expect(observed.map((element) => element.id)).toContain('experience');
    activate();
    await frames();
    expect(root.querySelectorAll('#experience article').length).toBe(5);
    expect(root.querySelectorAll('#experience h2').length).toBe(1);
    const mounted = root.querySelector('app-experiences');
    activate();
    await frames(2);
    expect(root.querySelector('app-experiences')).toBe(mounted);
    expect(TestBed.inject(Title).setTitle).not.toHaveBeenCalled();
    expect(TestBed.inject(Meta).updateTag).not.toHaveBeenCalled();
  });

  it('loads on explicit experience navigation and preserves the fragment', async () => {
    const router = TestBed.inject(Router);
    await TestBed.inject(SectionNavigationCoordinator).select('experience');
    await frames();
    expect(router.url).toBe('/#experience');
    expect(
      fixture.nativeElement.querySelectorAll('#experience article').length,
    ).toBe(5);
  });

  for (const [source, fontSize] of [
    ['selection', 16],
    ['fragment', 16],
    ['selection', 20],
    ['fragment', 20],
    ['selection', 32],
    ['fragment', 32],
  ] as const) {
    it(`keeps Experiences active after fractional ${source} landing at ${fontSize}px and releases it on manual scroll`, async () => {
      const root: HTMLElement = fixture.nativeElement;
      const originalSize = document.documentElement.style.fontSize;
      document.documentElement.style.fontSize = `${fontSize}px`;
      const readingLine = fontSize * 6;
      const navigation = TestBed.inject(SectionNavigationCoordinator);
      const router = TestBed.inject(Router);
      let active = '';
      const subscription = navigation.activeSection$.subscribe(
        (value) => (active = value),
      );
      const scroll = spyOn(window, 'scrollTo');
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);
      spyOnProperty(
        document.documentElement,
        'scrollHeight',
        'get',
      ).and.returnValue(10000);
      for (const [id, top] of [
        ['about', -900],
        ['lab', -400],
        ['experience', readingLine + 0.25],
        ['articles', 900],
        ['vault', 1200],
      ] as const) {
        spyOn(
          root.querySelector<HTMLElement>(`#${id}-heading`)!,
          'getBoundingClientRect',
        ).and.returnValue(new DOMRect(0, top, 320, 24));
      }
      try {
        if (source === 'selection') {
          await navigation.select('experience');
        } else {
          await router.navigateByUrl('/#experience');
        }
        await frames();
        window.dispatchEvent(new Event('scrollend'));
        window.dispatchEvent(new Event('scroll'));
        await frames(2);
        expect(router.url).toBe('/#experience');
        expect(active).toBe('experience');
        expect(
          getComputedStyle(root.querySelector('#about')!).scrollMarginTop,
        ).toBe(`${readingLine}px`);
        expect(scroll.calls.mostRecent().args[0]).toEqual(
          jasmine.objectContaining({ top: 0.25 }),
        );
        expect(root.querySelectorAll('#experience article').length).toBe(5);

        const heading = root.querySelector<HTMLElement>('#experience-heading')!;
        (heading.getBoundingClientRect as jasmine.Spy).and.returnValue(
          new DOMRect(0, 400, 320, 24),
        );
        window.dispatchEvent(new Event('wheel'));
        window.dispatchEvent(new Event('scroll'));
        await frames(2);
        expect(active).toBe('lab');
        expect(router.url).toBe('/#experience');
      } finally {
        subscription.unsubscribe();
        document.documentElement.style.fontSize = originalSize;
      }
    });
  }

  it('preserves a later heading reading position when lazy Experiences increases height', async () => {
    const root: HTMLElement = fixture.nativeElement;
    for (const [id, top] of [
      ['about', -900],
      ['lab', -700],
      ['experience', -500],
      ['articles', 80],
      ['vault', 900],
    ] as const) {
      spyOn(
        root.querySelector<HTMLElement>(`#${id}-heading`)!,
        'getBoundingClientRect',
      ).and.returnValue(new DOMRect(0, top, 320, 24));
    }
    window.dispatchEvent(new Event('scroll'));
    await frames(2);
    const scroll = spyOn(window, 'scrollTo');
    activate();
    await frames();
    const heading = root.querySelector<HTMLElement>('#articles-heading')!;
    (heading.getBoundingClientRect as jasmine.Spy).and.returnValue(
      new DOMRect(0, 280, 320, 24),
    );
    resized([], resizeObserver);
    await frames(2);
    expect(scroll.calls.mostRecent()?.args[0]).toEqual(
      jasmine.objectContaining({
        top: Math.max(0, window.scrollY + 200),
        behavior: 'instant',
      }),
    );
    expect(root.querySelectorAll('#experience article').length).toBe(5);
  });

  it('requests Articles only on activation and retains the mounted session across Home fragments', async () => {
    http.expectNone((request) =>
      request.url.startsWith('https://dev.to/api/articles'),
    );
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('app-articles')).toBeNull();
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    await navigation.select('articles');
    await frames();
    const mounted = root.querySelector('app-articles');
    expect(mounted).not.toBeNull();
    http
      .expectOne(
        'https://dev.to/api/articles?username=siddev&page=1&per_page=10',
      )
      .flush([
        {
          id: 1,
          title: 'Owner article',
          user: { username: 'siddev' },
          published_at: '2026-10-03T00:00:00Z',
        },
      ]);
    await frames(2);
    expect(root.querySelectorAll('#articles h2').length).toBe(1);
    expect(root.querySelectorAll('#articles app-card').length).toBe(1);
    await navigation.select('about');
    await navigation.select('articles');
    await frames(2);
    expect(root.querySelector('app-articles')).toBe(mounted);
    http.expectNone((request) =>
      request.url.startsWith('https://dev.to/api/articles'),
    );
    expect(TestBed.inject(Title).setTitle).not.toHaveBeenCalled();
    expect(TestBed.inject(Meta).updateTag).not.toHaveBeenCalled();
  });

  it('owns append focus/instant scroll and suppresses queued reading-position compensation', async () => {
    const root: HTMLElement = fixture.nativeElement;
    const heading = root.querySelector<HTMLElement>('#articles-heading')!;
    const card = document.createElement('a');
    card.href = '/work/articles/1';
    card.textContent = 'New card';
    heading.parentElement!.appendChild(card);
    spyOn(card, 'getBoundingClientRect').and.returnValue(
      new DOMRect(0, 300, 320, 24),
    );
    const scroll = spyOn(window, 'scrollTo');
    const original = window.matchMedia('(prefers-reduced-motion: reduce)');
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
      media: original.media,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => true,
    });
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    navigation.completeAppendIntent(navigation.beginAppendIntent(), card, true);
    expect(document.activeElement).toBe(card);
    expect(scroll.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining({
        top: Math.max(0, window.scrollY + 204),
        behavior: 'instant',
      }),
    );
    await frames(2);
    expect(scroll.calls.count()).toBe(1);
    card.remove();
  });

  it('uses the computed CSS reading offset for appended article movement', () => {
    const root: HTMLElement = fixture.nativeElement;
    const originalSize = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = '32px';
    root
      .querySelector<HTMLElement>('#about')!
      .style.setProperty('--section-reading-offset', '7rem');
    const card = document.createElement('a');
    root.querySelector('#articles')!.appendChild(card);
    spyOn(card, 'getBoundingClientRect').and.returnValue(
      new DOMRect(0, 300, 320, 24),
    );
    const scroll = spyOn(window, 'scrollTo');
    try {
      const navigation = TestBed.inject(SectionNavigationCoordinator);
      navigation.completeAppendIntent(
        navigation.beginAppendIntent(),
        card,
        false,
      );
      expect(scroll.calls.mostRecent().args[0]).toEqual(
        jasmine.objectContaining({
          top: Math.max(0, window.scrollY + 76),
        }),
      );
      window.dispatchEvent(new Event('scrollend'));
    } finally {
      document.documentElement.style.fontSize = originalSize;
      card.remove();
    }
  });

  it('defers Vault, retains its permanent heading and mounts actual bundled cards without JSON HTTP', async () => {
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('app-apps')).toBeNull();
    expect(root.querySelectorAll('#vault-heading').length).toBe(1);
    http.expectNone((request) => request.url.includes('data.json'));
    await TestBed.inject(SectionNavigationCoordinator).select('vault');
    await frames();
    expect(root.querySelectorAll('#vault app-card').length).toBe(5);
    expect(root.querySelectorAll('#vault h2').length).toBe(1);
    http.expectNone((request) => request.url.includes('data.json'));
    expect(TestBed.inject(Meta).updateTag).not.toHaveBeenCalled();
  });

  it('shows scoped Vault code failure and shares pending Retry without a late destroyed-owner mount', async () => {
    const activation = Reflect.get(
      fixture.componentInstance,
      'activation',
    ) as SectionActivationCoordinator<Type<unknown>>;
    const loaders = Reflect.get(activation, 'loaders') as Partial<
      Record<LazySectionId, SectionLoader<Type<unknown>>>
    >;
    let resolve!: (value: Type<unknown>) => void;
    const loader = jasmine
      .createSpy('vaultLoader')
      .and.returnValues(
        Promise.reject(new Error('Controlled chunk failure')),
        new Promise<Type<unknown>>((done) => (resolve = done)),
      );
    loaders.vault = loader;
    const root: HTMLElement = fixture.nativeElement;
    await TestBed.inject(SectionNavigationCoordinator).select('vault');
    await frames(3);
    expect(root.querySelector('#vault [role="alert"]')?.textContent).toContain(
      "This section couldn't be loaded.",
    );
    expect(root.querySelector('#about app-about')).not.toBeNull();
    fixture.componentInstance.retry('vault');
    fixture.componentInstance.retry('vault');
    await frames(2);
    expect(loader.calls.count()).toBe(2);
    expect(root.querySelector('#vault [role="status"]')?.textContent).toContain(
      'Loading Retro Vault',
    );
    fixture.destroy();
    resolve(AppsComponent);
    await Promise.resolve();
    expect(root.querySelector('app-apps')).toBeNull();
    expect(activation.state('vault').status).toBe('disposed');
  });

  it('preserves the reader and mounted Vault across same-Home navigation and delayed layout', async () => {
    const root: HTMLElement = fixture.nativeElement;
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    await navigation.select('vault');
    await frames();
    const mounted = root.querySelector('app-apps');
    await navigation.select('about');
    await navigation.select('vault');
    await frames(3);
    expect(root.querySelector('app-apps')).toBe(mounted);
    const scroll = spyOn(window, 'scrollTo');
    resized([], resizeObserver);
    await frames(2);
    expect(scroll).not.toHaveBeenCalled();
    expect(root.querySelectorAll('#vault-heading').length).toBe(1);
    http.expectNone((request) => request.url.includes('data.json'));
  });
});

describe('Home Lab activation', () => {
  it('keeps a permanent heading and activates Lab code on direct navigation without data', async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '', component: HomeComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/#lab', HomeComponent);
    for (
      let i = 0;
      i < 30 &&
      !harness.routeNativeElement?.querySelector('app-interaction-lab');
      i++
    ) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    harness.detectChanges();
    const section = harness.routeNativeElement?.querySelector('#lab');
    expect(section?.querySelectorAll('#lab-heading').length).toBe(1);
    expect(section?.querySelector('app-interaction-lab')).not.toBeNull();
    expect(section?.textContent).toContain('100,000');
    http.expectNone('assets/lab/records.json');
    harness.fixture.destroy();
    http.verify({ ignoreCancelled: true });
  });
});

describe('Home Experiences direct fragment', () => {
  it('mounts all roles for /#experience with one shell heading', async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '', component: HomeComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/#experience', HomeComponent);
    for (
      let i = 0;
      i < 30 && !harness.routeNativeElement?.querySelector('app-experiences');
      i++
    ) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/#experience');
    expect(
      harness.routeNativeElement?.querySelectorAll('#experience h2').length,
    ).toBe(1);
    expect(
      harness.routeNativeElement?.querySelectorAll('#experience article')
        .length,
    ).toBe(5);
    harness.fixture.destroy();
    http.verify({ ignoreCancelled: true });
  });
});
