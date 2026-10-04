import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HomeComponent } from './home.component';

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
