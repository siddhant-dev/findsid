import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('respects native reduced-motion preference and exposes a status label', () => {
    const loader = fixture.nativeElement.querySelector('.loader') as HTMLElement;
    const status = loader.querySelector('.loader-status') as HTMLElement;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    expect(loader.getAttribute('role')).toBe('status');
    expect(status.textContent?.trim()).toBe('Loading…');
    if (reducedMotion) {
      expect(getComputedStyle(loader).animationName).toBe('none');
    } else {
      expect(getComputedStyle(loader).animationName).toMatch(/spin$/);
    }
    expect(getComputedStyle(status).position).toBe(
      reducedMotion ? 'static' : 'absolute',
    );
  });
});
