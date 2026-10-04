import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router, withRouterConfig } from '@angular/router';
import { AppComponent } from '../app.component';
import { APP_ROUTES } from '../app.routes';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CONTACT_ROUTING_PROVIDERS, CONTACT_MODAL_LOADER } from './contact-modal-host';
import { ContactNavigationState } from './contact-navigation-state';
import { ContactComponent } from '../contact-module/contact/contact.component';

describe('Whole-viewport routed contact host', () => {
  it('keeps the exact Home view mounted under /contact and opens only one full-screen modal', async () => {
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [
      provideRouter(APP_ROUTES, withRouterConfig({ canceledNavigationResolution: 'computed' })), provideHttpClient(), provideHttpClientTesting(),
      ...CONTACT_ROUTING_PROVIDERS,
    ] });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    const home = fixture.nativeElement.querySelector('app-home');
    await router.navigateByUrl('/contact');
    for (let i = 0; i < 30 && !document.querySelector('[role="dialog"]'); i++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      fixture.detectChanges();
    }
    expect(fixture.nativeElement.querySelector('app-home')).toBe(home);
    expect(document.querySelectorAll('[role="dialog"]').length).toBe(1);
    expect(document.querySelector('.cdk-overlay-container')).not.toBeNull();
    fixture.destroy();
  });

  it('blocks pending same-app navigation and keeps direct-entry Home underneath', async () => {
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [
      provideRouter(APP_ROUTES, withRouterConfig({ canceledNavigationResolution: 'computed' })),
      ...CONTACT_ROUTING_PROVIDERS, provideHttpClient(), provideHttpClientTesting(),
    ] });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/contact');
    for (let i = 0; i < 30 && !document.querySelector('.contact-dialog'); i++) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      fixture.detectChanges();
    }
    const home = fixture.nativeElement.querySelector('app-home');
    expect(home).not.toBeNull();
    TestBed.inject(ContactNavigationState).pending.set(true);
    expect(await router.navigateByUrl('/resume')).toBeFalse();
    expect(router.url).toBe('/contact');
    expect(fixture.nativeElement.querySelector('app-home')).toBe(home);
    TestBed.inject(ContactNavigationState).pending.set(false);
    await router.navigateByUrl('/');
    expect(fixture.nativeElement.querySelector('app-home')).toBe(home);
    fixture.destroy();
  });

  it('recovers from a controlled code failure and invalidates a late resolution after Close', async () => {
    let resolve!: (component: typeof ContactComponent) => void;
    let attempts = 0;
    const loader = jasmine.createSpy('contact code loader').and.callFake(() =>
      ++attempts === 1 ? Promise.reject(new Error('Controlled code failure')) :
        new Promise<typeof ContactComponent>(done => resolve = done));
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [
      provideRouter(APP_ROUTES), ...CONTACT_ROUTING_PROVIDERS,
      provideHttpClient(), provideHttpClientTesting(), { provide: CONTACT_MODAL_LOADER, useValue: loader },
    ] });
    const fixture = TestBed.createComponent(AppComponent); fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/contact');
    await fixture.whenStable(); fixture.detectChanges();
    const boundary = document.querySelector('dialog')!;
    expect(boundary.textContent).toContain("Contact couldn't be loaded.");
    boundary.querySelector<HTMLButtonElement>('button')!.click();
    boundary.querySelector<HTMLButtonElement>('button')!.click();
    expect(loader.calls.count()).toBe(2);
    await router.navigateByUrl('/');
    resolve(ContactComponent);
    await fixture.whenStable(); fixture.detectChanges();
    expect(document.querySelector('.contact-dialog')).toBeNull();
    fixture.destroy();
  });
});
