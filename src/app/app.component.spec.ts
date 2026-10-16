import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ standalone: true, template: '<h1>Reading fixture</h1>' })
class ReadingFixture {}

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

  it('scales shell spacing and identity text with the root font size', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const originalSize = document.documentElement.style.fontSize;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    root.querySelector<HTMLElement>('footer')!.style.width = '7rem';
    const socials = root.querySelector<HTMLElement>('.social-links')!;
    try {
      for (const size of [16, 20, 32]) {
        document.documentElement.style.fontSize = `${size}px`;
        const shell = getComputedStyle(root.querySelector('.shell')!);
        expect(parseFloat(shell.paddingLeft)).toBe(size * 1.5);
        expect(parseFloat(shell.maxWidth)).toBe(size * 80);
        expect(parseFloat(shell.columnGap)).toBe(desktop ? size * 3 : 0);
        expect(getComputedStyle(socials).flexWrap).toBe('wrap');
        expect(socials.scrollWidth).toBeLessThanOrEqual(socials.clientWidth);
        expect(
          parseFloat(
            getComputedStyle(root.querySelector('.owner-name')!).fontSize,
          ),
        ).toBe(size * (desktop ? 3.5 : 2.25));
      }
    } finally {
      document.documentElement.style.fontSize = originalSize;
      fixture.destroy();
    }
  });

  it('pins the desktop column rather than scrolling its padded inner content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const column = root.querySelector<HTMLElement>('.identity-column')!;
    const content = root.querySelector<HTMLElement>('.identity-content')!;
    fixture.componentInstance.stickyDisabled = false;
    fixture.detectChanges();
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    expect(getComputedStyle(column).position).toBe(
      desktop ? 'sticky' : 'static',
    );
    expect(getComputedStyle(column).alignSelf).toBe('start');
    expect(getComputedStyle(content).position).toBe('static');
    fixture.destroy();
  });

  it('releases the column when its content and padding cannot fit the viewport', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const column = root.querySelector<HTMLElement>('.identity-column')!;
    const content = root.querySelector<HTMLElement>('.identity-content')!;
    const styles = getComputedStyle(column);
    const padding =
      parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const bounds = spyOn(content, 'getBoundingClientRect');
    try {
      bounds.and.returnValue(
        new DOMRect(0, 0, 400, window.innerHeight - padding),
      );
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(fixture.componentInstance.stickyDisabled).toBeFalse();
      bounds.and.returnValue(
        new DOMRect(0, 0, 400, window.innerHeight - padding + 1),
      );
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(fixture.componentInstance.stickyDisabled).toBeTrue();
      expect(getComputedStyle(column).position).toBe('static');
    } finally {
      fixture.destroy();
    }
  });

  it('uses route reading mode without identity sidebar and keeps bottom actions once', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([
          {
            path: 'reading',
            component: ReadingFixture,
            data: { layout: 'reading' },
          },
        ]),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/reading');
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('aside')).toBeNull();
    expect(root.querySelectorAll('footer.page-actions').length).toBe(1);
    expect(root.querySelector('.shell.reading')).not.toBeNull();
    fixture.destroy();
  });

  it('should retain other social links without linking to the artwork profile', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      compiled.querySelectorAll<HTMLAnchorElement>('footer a[aria-label]'),
    );
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'LinkedIn',
      'Twitter',
      'GitHub',
      'CodePen',
      'Dev.to',
    ]);
    expect(
      links.some((link) => link.href.includes('instagram.com')),
    ).toBeFalse();
  });

  it('renders the approved identity and five ordered section destinations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.currentWorkExperience = 9.75;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.textContent).toContain('Siddhant Jaiswal');
    expect(root.textContent).toContain('Lead Product Development Professional');
    expect(root.textContent).toContain(
      'Architecting scalable Angular applications, high-performance virtualized rendering engines, and accessible design systems',
    );
    expect(root.querySelector('.eyebrow')?.textContent?.trim()).toBe(
      `PORTFOLIO / ${fixture.componentInstance.appVersion}`,
    );
    expect(root.querySelector('.version-badge')?.textContent?.trim()).toBe(
      'SYS.ARCH | 9.8 years',
    );
    expect(
      Array.from(root.querySelectorAll<HTMLElement>('[data-section-link]')).map(
        (link) => link.textContent?.trim(),
      ),
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

    expect(
      footer?.querySelector('a[href="/contact"]')?.textContent?.trim(),
    ).toBe('Contact');
    expect(
      Array.from(
        footer?.querySelectorAll<HTMLAnchorElement>('a[aria-label]') ?? [],
      ).map((link) => link.getAttribute('aria-label')),
    ).toEqual(['LinkedIn', 'Twitter', 'GitHub', 'CodePen', 'Dev.to']);
    expect(
      Array.from(root.querySelectorAll('header a, header button')).some(
        (link) =>
          /contact|linkedin|twitter|github|codepen|dev\.to/i.test(
            link.textContent ?? '',
          ),
      ),
    ).toBeFalse();
    for (const link of footer?.querySelectorAll<HTMLAnchorElement>(
      'a[target="_blank"]',
    ) ?? []) {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    }
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
    expect(root.querySelector('.eyebrow')?.textContent?.trim()).toBe(
      'PORTFOLIO / 26.10.2',
    );
    expect(
      Array.from(root.querySelectorAll<HTMLElement>('[data-section-link]')).map(
        (link) => link.textContent?.trim(),
      ),
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

    expect(
      footer?.querySelector('a[href="/contact"]')?.textContent?.trim(),
    ).toBe('Contact');
    expect(
      Array.from(
        footer?.querySelectorAll<HTMLAnchorElement>('a[aria-label]') ?? [],
      ).map((link) => link.getAttribute('aria-label')),
    ).toEqual(['LinkedIn', 'Twitter', 'GitHub', 'CodePen', 'Dev.to']);
    expect(
      Array.from(root.querySelectorAll('header a, header button')).some(
        (link) =>
          /contact|linkedin|twitter|github|codepen|dev\.to/i.test(
            link.textContent ?? '',
          ),
      ),
    ).toBeFalse();
    for (const link of footer?.querySelectorAll<HTMLAnchorElement>(
      'a[target="_blank"]',
    ) ?? []) {
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
      Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
      ).some((link) => /(?:light|dark)\.css$/i.test(link.href)),
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
    expect(
      root.querySelector('aside nav[aria-label="Portfolio sections"]'),
    ).not.toBeNull();
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
