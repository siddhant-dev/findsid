import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';

describe('Contact viewport geometry', () => {
  it('uses a body-level viewport backdrop and a bounded internally scrolling panel', () => {
    TestBed.configureTestingModule({ imports: [ContactComponent], providers: [
      { provide: ContactService, useValue: { sendEmail: () => of(undefined) } },
    ] });
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const backdrop = document.querySelector<HTMLElement>('.contact-backdrop')!;
    const panel = document.querySelector<HTMLElement>('.contact-dialog')!;
    expect(backdrop.closest('.cdk-overlay-container')?.parentElement).toBe(document.body);
    const rect = backdrop.getBoundingClientRect();
    expect(rect.left).toBe(0);
    expect(rect.top).toBe(0);
    expect(rect.width).toBe(document.documentElement.clientWidth);
    expect(rect.height).toBe(document.documentElement.clientHeight);
    const font = parseFloat(getComputedStyle(document.documentElement).fontSize);
    expect(getComputedStyle(panel).padding).toBe(`${font * 1.5}px`);
    expect(getComputedStyle(panel).gap).toBe(`${font * 1.5}px`);
    expect(panel.getBoundingClientRect().width).toBeLessThanOrEqual(font * 32);
    expect(getComputedStyle(panel).overflowY).toBe('auto');
    fixture.destroy();
  });
});
