import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    spyOn(window, 'IntersectionObserver').and.callFake(function(callback) {
      intersect = callback;
      observer = {
        observe: (target: Element) => observed.push(target),
        unobserve: () => undefined, disconnect: () => undefined,
        takeRecords: () => [], root: null, rootMargin: '0px', scrollMargin: '0px', thresholds: [0],
      };
      return observer;
    });
    spyOn(window, 'ResizeObserver').and.callFake(function(callback) {
      resized = callback;
      resizeObserver = { observe: () => undefined, unobserve: () => undefined, disconnect: () => undefined };
      return resizeObserver;
    });
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([{ path: '', component: HomeComponent }]),
        provideHttpClient(), provideHttpClientTesting(),
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
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    fixture.detectChanges();
  }

  function activate(): void {
    const section = fixture.nativeElement.querySelector('#experience') as HTMLElement;
    intersect([{
      target: section, isIntersecting: true, boundingClientRect: new DOMRect(),
      intersectionRect: new DOMRect(), rootBounds: null, time: 0, intersectionRatio: 1,
    }], observer);
  }

  it('keeps the heading permanent and defers all roles until viewport activation', async () => {
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('#experience-heading').length).toBe(1);
    expect(root.querySelector('app-experiences')).toBeNull();
    expect(root.textContent).not.toContain('Naviam');
    expect(observed.map(element => element.id)).toContain('experience');
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
    expect(fixture.nativeElement.querySelectorAll('#experience article').length).toBe(5);
  });

  it('preserves a later heading reading position when lazy Experiences increases height', async () => {
    const root: HTMLElement = fixture.nativeElement;
    for (const [id, top] of [['about', -900], ['lab', -700], ['experience', -500],
      ['articles', 80], ['vault', 900]] as const) {
      spyOn(root.querySelector<HTMLElement>(`#${id}-heading`)!, 'getBoundingClientRect')
        .and.returnValue(new DOMRect(0, top, 320, 24));
    }
    window.dispatchEvent(new Event('scroll'));
    await frames(2);
    const scroll = spyOn(window, 'scrollTo');
    activate();
    await frames();
    const heading = root.querySelector<HTMLElement>('#articles-heading')!;
    (heading.getBoundingClientRect as jasmine.Spy).and.returnValue(new DOMRect(0, 280, 320, 24));
    resized([], resizeObserver);
    await frames(2);
    expect(scroll.calls.mostRecent()?.args[0]).toEqual(jasmine.objectContaining({
      top: Math.max(0, window.scrollY + 200), behavior: 'instant',
    }));
    expect(root.querySelectorAll('#experience article').length).toBe(5);
  });

  it('requests Articles only on activation and retains the mounted session across Home fragments', async () => {
    http.expectNone(request => request.url.startsWith('https://dev.to/api/articles'));
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('app-articles')).toBeNull();
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    await navigation.select('articles');
    await frames();
    const mounted = root.querySelector('app-articles');
    expect(mounted).not.toBeNull();
    http.expectOne('https://dev.to/api/articles?username=siddev&page=1&per_page=10').flush([{
      id: 1, title: 'Owner article', user: { username: 'siddev' }, published_at: '2026-10-03T00:00:00Z',
    }]);
    await frames(2);
    expect(root.querySelectorAll('#articles h2').length).toBe(1);
    expect(root.querySelectorAll('#articles app-card').length).toBe(1);
    await navigation.select('about');
    await navigation.select('articles');
    await frames(2);
    expect(root.querySelector('app-articles')).toBe(mounted);
    http.expectNone(request => request.url.startsWith('https://dev.to/api/articles'));
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
    spyOn(card, 'getBoundingClientRect').and.returnValue(new DOMRect(0, 300, 320, 24));
    const scroll = spyOn(window, 'scrollTo');
    const original = window.matchMedia('(prefers-reduced-motion: reduce)');
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true, media: original.media, onchange: null,
      addListener: () => undefined, removeListener: () => undefined,
      addEventListener: () => undefined, removeEventListener: () => undefined, dispatchEvent: () => true,
    });
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    navigation.completeAppendIntent(navigation.beginAppendIntent(), card, true);
    expect(document.activeElement).toBe(card);
    expect(scroll.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({
      top: Math.max(0, window.scrollY + 204), behavior: 'instant',
    }));
    await frames(2);
    expect(scroll.calls.count()).toBe(1);
    card.remove();
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
    for (let i = 0; i < 30 && !harness.routeNativeElement?.querySelector('app-interaction-lab'); i++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
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
        provideHttpClient(), provideHttpClientTesting(),
      ],
    }).compileComponents();
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/#experience', HomeComponent);
    for (let i = 0; i < 30 && !harness.routeNativeElement?.querySelector('app-experiences'); i++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/#experience');
    expect(harness.routeNativeElement?.querySelectorAll('#experience h2').length).toBe(1);
    expect(harness.routeNativeElement?.querySelectorAll('#experience article').length).toBe(5);
    harness.fixture.destroy();
    http.verify({ ignoreCancelled: true });
  });
});
