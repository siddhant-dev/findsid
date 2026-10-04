import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { WORK_ROUTES } from './work.routes';

describe('Work routes', () => {
  let http: HttpTestingController;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'work', children: WORK_ROUTES }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    harness = await RouterTestingHarness.create();
  });

  afterEach(() => {
    harness.fixture.destroy();
    http.expectNone((request) => request.url.includes('graph.instagram.com'));
    http.verify();
  });

  for (const path of ['/work', '/work/art', '/work/articles']) {
    it(`should show articles at ${path} without requesting artwork`, async () => {
      await harness.navigateByUrl(path);
      http.expectOne('https://dev.to/api/articles?username=siddev&page=1&per_page=10').flush([]);
      harness.detectChanges();

      expect(TestBed.inject(Router).url).toBe('/work/articles');
      expect(harness.routeNativeElement?.querySelector('app-articles')).not.toBeNull();
      expect(harness.routeNativeElement?.querySelector('app-art')).toBeNull();
      const tabs = harness.routeNativeElement?.querySelectorAll<HTMLAnchorElement>('[role="tab"]');
      expect(Array.from(tabs ?? [], (tab) => tab.getAttribute('href'))).toEqual([
        '/work/articles', '/work/apps',
      ]);
    });
  }

  it('should keep Apps usable without requesting artwork', async () => {
    await harness.navigateByUrl('/work/apps');
    http.expectNone('../../assets/data.json');
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/work/apps');
    expect(harness.routeNativeElement?.querySelector('app-apps')).not.toBeNull();
  });

  it('should keep article details usable without requesting artwork', async () => {
    await harness.navigateByUrl('/work/articles/123');
    http.expectOne('https://dev.to/api/articles/123').flush({
      id: 123,
      user: { username: 'siddev' },
      title: 'Article title',
      description: 'Article description',
      readable_publish_date: 'Oct 3',
      social_image: 'https://example.com/article.png',
      tag_list: ['angular'],
      body_html: '<p>Article content</p>',
    });
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/work/articles/123');
    expect(harness.routeNativeElement?.querySelector('app-article-page')?.textContent)
      .toContain('Article content');
  });

  it('should redirect only the exact legacy art path', () => {
    const artRoute = WORK_ROUTES[0].children?.find((route) => route.path === 'art');
    expect(artRoute?.pathMatch).toBe('full');
    expect(artRoute?.redirectTo).toBe('articles');
    expect(artRoute?.loadComponent).toBeUndefined();
  });
});
