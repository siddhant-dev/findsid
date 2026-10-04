import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should retain other social links without linking to the artwork profile', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      compiled.querySelectorAll<HTMLAnchorElement>('footer a[aria-label]'),
    );
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'LinkedIn', 'Twitter', 'GitHub', 'CodePen', 'Dev.to',
    ]);
    expect(links.some((link) => link.href.includes('instagram.com'))).toBeFalse();
  });

  it('renders the approved identity and five ordered section destinations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.textContent).toContain('Siddhant Jaiswal');
    expect(root.textContent).toContain('Lead Product Development Professional');
    expect(root.textContent).toContain(
      'Architecting scalable Angular applications, high-performance virtualized rendering engines, and accessible design systems',
    );
    expect(root.querySelector('.version-badge')?.textContent?.trim()).toBe('v0.9.9');
    expect(
      Array.from(root.querySelectorAll<HTMLElement>('[data-section-link]'))
        .map((link) => link.textContent?.trim()),
    ).toEqual([
      '01. About me',
      '02. Interaction Lab',
      '03. Experiences',
      '04. Articles',
      '05. Retro Vault',
    ]);
  });

  it('places Contact before five safely named social links in the footer only', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const footer = root.querySelector('footer');

    expect(footer?.querySelector('a[href="/contact"]')?.textContent?.trim()).toBe('Contact');
    expect(
      Array.from(footer?.querySelectorAll<HTMLAnchorElement>('a[aria-label]') ?? [])
        .map((link) => link.getAttribute('aria-label')),
    ).toEqual(['LinkedIn', 'Twitter', 'GitHub', 'CodePen', 'Dev.to']);
    expect(
      Array.from(root.querySelectorAll('header a, header button'))
        .some((link) => /contact|linkedin|twitter|github|codepen|dev\.to/i.test(link.textContent ?? '')),
    ).toBeFalse();
    for (const link of footer?.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]') ?? []) {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    }
  });

  it('does not inspect or react to the device color-scheme preference', () => {
    spyOn(window, 'matchMedia').and.callThrough();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(window.matchMedia).not.toHaveBeenCalled();
  });

  it('does not render a theme switch or load an alternate palette stylesheet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('input[type="checkbox"]')).toBeNull();
    expect(
      Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
        .some((link) => /(?:light|dark)\.css$/i.test(link.href)),
    ).toBeFalse();
  });

  it('mounts one hidden, noninteractive canvas behind the existing shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const canvases = root.querySelectorAll<HTMLElement>('.blueprint-bg');

    expect(canvases.length).toBe(1);
    const canvas = canvases.item(0);
    if (!canvas) {
      fail('The reference blueprint canvas is missing');
      return;
    }

    expect(canvas.getAttribute('aria-hidden')).toBe('true');
    expect(canvas.tabIndex).toBe(-1);
    expect(canvas.querySelector('a, button, input, [tabindex]')).toBeNull();
    expect(getComputedStyle(canvas).pointerEvents).toBe('none');
    expect(getComputedStyle(canvas).zIndex).toBe('-1');
    expect(getComputedStyle(root).isolation).toBe('isolate');
    expect(root.querySelector('aside nav[aria-label="Portfolio sections"]')).not.toBeNull();
    expect(root.querySelector('main router-outlet')).not.toBeNull();
    expect(root.querySelector('footer')).not.toBeNull();

    const link = root.querySelector<HTMLAnchorElement>('footer a[aria-label]')!;
    link.focus();
    expect(document.activeElement).toBe(link);
    link.scrollIntoView({ behavior: 'instant', block: 'center' });
    const bounds = link.getBoundingClientRect();
    const hit = document.elementFromPoint(
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2,
    );
    expect(hit).not.toBeNull();
    expect(link.contains(hit)).toBeTrue();

    const scrollTop = window.scrollY;
    const spacer = document.createElement('div');
    spacer.style.height = '3000px';
    root.querySelector('main')!.appendChild(spacer);
    try {
      window.scrollTo({ top: 500, behavior: 'instant' });
      expect(window.scrollY).toBeGreaterThan(0);
      expect(canvas.getBoundingClientRect().top).toBe(0);
    } finally {
      spacer.remove();
      window.scrollTo({ top: scrollTop, behavior: 'instant' });
    }
  });
});
