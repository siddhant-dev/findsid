import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves the resume artwork and its download action in the fixed palette', () => {
    const element = fixture.nativeElement as HTMLElement;
    const artwork = element.querySelector<SVGElement>('#background');

    expect(element.querySelector('svg')).not.toBeNull();
    expect(element.querySelector('a.blueprint-button')).not.toBeNull();
    expect(artwork).not.toBeNull();
    expect(getComputedStyle(artwork!).fill).toBe('rgb(11, 25, 44)');
  });

  it('applies actual-origin external navigation while preserving mail and download actions', () => {
    const root: HTMLElement = fixture.nativeElement;
    for (const anchor of root.querySelectorAll('a[href^="https://findsid.dev"]')) {
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toContain('noopener');
      expect(anchor.getAttribute('rel')).toContain('noreferrer');
    }
    expect(root.querySelector('a[href^="mailto:"]')?.getAttribute('target')).toBeNull();
    expect(root.querySelector('a.blueprint-button')).not.toBeNull();
  });
});
