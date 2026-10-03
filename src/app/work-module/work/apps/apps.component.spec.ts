import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { provideRouter } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { AppsComponent } from './apps.component';
import { AppService, ARCHIVE_LOADER } from '../../services/app.service';
import { ArchiveSource } from '../../models/card.model';
import { By } from '@angular/platform-browser';
import { SkeletonComponent } from 'boneyard-js/angular';

const expected = [
  {
    title: 'Authentic Weather App',
    description:
      'An Authentic Weather App that gives you weather information with a grain of salt.',
    date: "Dec' 2021",
    tag: 'angular',
    url: 'https://authentic-weather.web.app',
  },
  {
    title: 'Toonify App',
    description:
      'Convert your Image into a Disney Charcter. Built using Vue and Open AI',
    date: "Sep' 2019",
    tag: 'vue',
    url: 'https://toonify-me.web.app/',
  },
  {
    title: 'Notes App',
    description: 'Another notes app built using Angular and Firebase',
    date: "Oct' 2018",
    tag: 'angular',
    url: 'https://keepit-notes.web.app',
  },
  {
    title: 'Wedding Invite App',
    description:
      "This was built for my sister's wedding to invite people to the wedding. Built using Vue",
    date: "Dec' 2021",
    tag: 'vue',
    url: 'https://jaiswalswedding.web.app',
  },
  {
    title: 'Tic Tac Game',
    description:
      'This was my first project, It does not look good but it works and marks the beginning of my journey as a developer',
    date: "Dec' 2021",
    tag: 'react',
    url: 'https://tic-tacgame.web.app/',
  },
];

describe('Retro Vault approved content', () => {
  let fixture: ComponentFixture<AppsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(AppsComponent);
    fixture.componentRef.setInput('embedded', true);
    fixture.detectChanges();
    for (
      let i = 0;
      i < 30 && fixture.componentInstance.state === 'loading';
      i++
    ) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    fixture.detectChanges();
  });
  afterEach(() => fixture.destroy());

  it('renders all five exact contract records in source order using native safe links', () => {
    const root: HTMLElement = fixture.nativeElement;
    const cards = [...root.querySelectorAll('app-card')];
    expect(cards.length).toBe(5);
    cards.forEach((card, i) => {
      expect(card.querySelector('h3')?.textContent?.trim()).toBe(
        expected[i].title,
      );
      expect(card.querySelector('.description')?.textContent?.trim()).toBe(
        expected[i].description,
      );
      expect(card.querySelector('.date')?.textContent?.trim()).toBe(
        expected[i].date,
      );
      expect(
        [...card.querySelectorAll('.tag')].map((tag) =>
          tag.textContent?.trim(),
        ),
      ).toEqual([expected[i].tag]);
      const link = card.querySelector('a')!;
      expect(link.href).toBe(new URL(expected[i].url).href);
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener noreferrer');
    });
    expect(root.querySelector('img, button, input, h2')).toBeNull();
    expect(root.textContent).not.toContain('10-year');
  });

  it('supplies a semantic collection without an extra Tab stop or metadata writer', async () => {
    const meta = TestBed.inject(Meta);
    const add = spyOn(meta, 'addTag');
    const remove = spyOn(meta, 'removeTag');
    const second = TestBed.createComponent(AppsComponent);
    second.detectChanges();
    for (
      let i = 0;
      i < 30 && second.componentInstance.state === 'loading';
      i++
    ) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    second.detectChanges();
    const root: HTMLElement = second.nativeElement;
    expect(root.querySelectorAll('ul.grid-container > li').length).toBe(5);
    expect(root.querySelector('[tabindex="0"]')).toBeNull();
    expect(root.querySelector('h2')).toBeNull();
    expect(add).not.toHaveBeenCalled();
    expect(remove).not.toHaveBeenCalled();
    second.destroy();
  });

  it('uses the approved available-width tracks and rem gaps without clipping meaningful content', () => {
    const root: HTMLElement = fixture.nativeElement;
    root.style.width = '1000px';
    document.body.appendChild(root);
    const grid = root.querySelector<HTMLElement>('.grid-container')!;
    expect(getComputedStyle(grid).gridTemplateColumns.split(' ').length).toBe(
      3,
    );
    expect(getComputedStyle(grid).gap).toBe('24px');
    root.style.width = '320px';
    expect(getComputedStyle(grid).gridTemplateColumns.split(' ').length).toBe(
      1,
    );
    const card = grid.querySelector<HTMLElement>('.card')!;
    expect(card.getBoundingClientRect().right).toBeLessThanOrEqual(
      grid.getBoundingClientRect().right,
    );
    const old = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = '20px';
    expect(getComputedStyle(grid).gap).toBe('30px');
    document.documentElement.style.fontSize = old;
    root.remove();
  });
});

describe('Retro Vault loading and feedback', () => {
  let fixture: ComponentFixture<AppsComponent>;
  let requests: Subject<ArchiveSource[]>[];
  let root: HTMLElement;
  const render = () => {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  };
  beforeEach(async () => {
    requests = [];
    await TestBed.configureTestingModule({
      imports: [AppsComponent],
      providers: [
        provideRouter([]),
        {
          provide: AppService,
          useValue: {
            getApps: () => {
              const response = new Subject<ArchiveSource[]>();
              requests.push(response);
              return response;
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppsComponent);
    fixture.componentRef.setInput('embedded', true);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  afterEach(() => fixture.destroy());
  it('shows five inert skeletons and separate status while actual data work is pending', async () => {
    expect(root.querySelectorAll('boneyard-skeleton').length).toBe(5);
    expect(root.querySelector('[role="status"]')?.textContent).toContain(
      'Loading projects',
    );
    expect(root.querySelector('[aria-hidden="true"][inert]')).not.toBeNull();
    for (let i = 0; i < 3; i++)
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    render();
    const skeleton = fixture.debugElement.query(By.directive(SkeletonComponent))
      ?.componentInstance as SkeletonComponent | undefined;
    expect(skeleton?.activeBones?.bones.length ?? 0).toBeGreaterThan(0);
  });
  it('distinguishes explicit data error/Retry from true empty and blocks duplicate operations', () => {
    requests[0].error(new Error('Malformed collection'));
    render();
    expect(root.textContent).toContain("Projects couldn't be loaded.");
    const retry = root.querySelector<HTMLButtonElement>('button');
    expect(retry?.textContent).toContain('Retry');
    retry?.click();
    retry?.click();
    render();
    expect(requests.length).toBe(2);
    requests[1]?.next([]);
    requests[1]?.complete();
    render();
    expect(root.textContent).toContain('No archived projects yet.');
    expect(root.querySelector('button')).toBeNull();
    expect(root.querySelector('app-card')).toBeNull();
  });
  it('cancels pending collection work and ignores late data after departure', () => {
    fixture.destroy();
    expect(requests[0].observed).toBeFalse();
    requests[0].next([]);
    expect(root.querySelector('app-card')).toBeNull();
  });
  it('binds native reduced motion, keeps the fixed palette and cleans skeleton/media ownership', async () => {
    fixture.destroy();
    const target = new EventTarget();
    const media: MediaQueryList = {
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: target.addEventListener.bind(target),
      removeEventListener: target.removeEventListener.bind(target),
      dispatchEvent: target.dispatchEvent.bind(target),
    };
    const native = window.matchMedia.bind(window);
    spyOn(window, 'matchMedia').and.callFake((query) =>
      query.includes('reduced-motion') ? media : native(query),
    );
    const removed = spyOn(media, 'removeEventListener').and.callThrough();
    fixture = TestBed.createComponent(AppsComponent);
    fixture.detectChanges();
    for (let i = 0; i < 3; i++)
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    render();
    const skeleton = fixture.debugElement.query(By.directive(SkeletonComponent))
      .componentInstance as SkeletonComponent;
    expect(skeleton.resolvedColor).toBe('var(--text-muted)');
    expect(skeleton.animationStyle).toBe('solid');
    expect(skeleton.staggerMs).toBe(0);
    expect(skeleton.transitionMs).toBe(0);
    Object.defineProperty(media, 'matches', { value: false });
    media.dispatchEvent(new Event('change'));
    render();
    expect(skeleton.animationStyle).toBe('pulse');
    const uid = skeleton.uid;
    fixture.destroy();
    expect(removed).toHaveBeenCalled();
    expect(
      document.querySelector(`[data-boneyard-keyframes="${uid}"]`),
    ).toBeNull();
  });
});

describe('Retro Vault immutable-data Retry', () => {
  it('revalidates a corrupted bundled collection without pretending Retry repaired it', async () => {
    const source = [{ title: ' ' }];
    const loader = jasmine.createSpy('loadBundledData').and.resolveTo(source);
    await TestBed.configureTestingModule({
      imports: [AppsComponent],
      providers: [
        provideRouter([]),
        { provide: ARCHIVE_LOADER, useValue: loader },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppsComponent);
    fixture.detectChanges();
    await Promise.resolve();
    await Promise.resolve();
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.textContent).toContain("Projects couldn't be loaded.");
    root.querySelector<HTMLButtonElement>('button')!.click();
    await Promise.resolve();
    await Promise.resolve();
    fixture.detectChanges();
    expect(loader.calls.count()).toBe(2);
    expect(root.textContent).toContain("Projects couldn't be loaded.");
    expect(root.textContent).not.toContain('No archived projects yet.');
    expect(root.querySelector('app-card')).toBeNull();
    expect(source).toEqual([{ title: ' ' }]);
    fixture.destroy();
  });

  it('renders controlled empty data without a network dependency', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(component.showSpinner).toBeFalse();
    expect(element.querySelector('#apps')).not.toBeNull();
    expect(element.querySelector('app-loader')).toBeNull();
  });
});
