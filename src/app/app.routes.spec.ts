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

describe('application routes', () => {
  let router: Router;
  let harness: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(APP_ROUTES),
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
});
