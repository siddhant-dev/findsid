import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ArticlePage } from '../../models/dev.model';
import { ArticlesComponent } from './articles.component';
import { ArticlesService } from '../../services/articles.service';
import { By } from '@angular/platform-browser';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SectionNavigationCoordinator } from '../../../home/section-navigation';

describe('ArticlesComponent', () => {
  let fixture: ComponentFixture<ArticlesComponent>;
  let requests: Subject<ArticlePage>[];
  let root: HTMLElement;
  const page = (start: number, count: number): ArticlePage => ({
    rawCount: count,
    records: Array.from({ length: count }, (_, i) => ({
      source: { id: start + i, title: `Article ${start + i}`, description: 'Full content',
        tags: ['Angular', 'RxJS'], typeOf: 'article', published_date: 'Oct 4', cover_image: '/detail-only.svg' },
      publicationInstant: 10000 - start - i,
    })),
  });
  const changed = () => {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  };
  beforeEach(async () => {
    requests = [];
    const load = () => {
      const response = new Subject<ArticlePage>();
      requests.push(response);
      return response;
    };
    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [
        provideRouter([]),
        { provide: ArticlesService, useValue: { getPage: load } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ArticlesComponent);
    fixture.componentRef.setInput('embedded', true);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });
  afterEach(() => fixture.destroy());
  function flush(value: ArticlePage): void {
    const response = requests[requests.length - 1];
    response.next(value);
    response.complete();
    changed();
  }
  it('starts only on mounted activation with ten inert skeletons and separate loading status', () => {
    expect(requests.length).toBe(1);
    expect(root.querySelectorAll('boneyard-skeleton').length).toBe(10);
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading articles');
    expect(root.querySelector('img')).toBeNull();
    expect(root.querySelector('h2')).toBeNull();
    expect(root.querySelector('[tabindex="0"]')).toBeNull();
  });
  it('keeps ten accepted cards and all tags through View more without replacing existing DOM', () => {
    flush(page(1, 10));
    expect(root.querySelectorAll('app-card').length).toBe(0);
    flush(page(11, 10));
    expect(root.querySelectorAll('app-card').length).toBe(10);
    const first = root.querySelector('app-card');
    const button = root.querySelector<HTMLButtonElement>('button')!;
    expect(button.textContent).toContain('View more');
    button.click();
    changed();
    expect(root.querySelector('button')?.disabled).toBeTrue();
    expect(root.textContent).toContain('Loading more...');
    expect(root.querySelectorAll('app-card').length).toBe(10);
    flush(page(21, 1));
    expect(root.querySelectorAll('app-card').length).toBe(20);
    expect(root.querySelector('app-card')).toBe(first);
    expect(root.querySelectorAll('app-card .tags li').length).toBe(40);
    expect(root.querySelector('app-card img')).toBeNull();
  });

  it('shows true empty without Retry but keeps all-invalid and network failures distinct and resumable', () => {
    flush({ rawCount: 10, records: [] });
    flush({ rawCount: 1, records: [] });
    expect(root.textContent).toContain("Articles couldn't be loaded.");
    expect(root.querySelector('button')?.textContent).toContain('Retry');
    root.querySelector<HTMLButtonElement>('button')!.click();
    requests[2].error(new Error('Rate limited'));
    changed();
    expect(root.textContent).not.toContain('No articles published yet.');
    root.querySelector<HTMLButtonElement>('button')!.click();
    flush({ rawCount: 0, records: [] });
    expect(root.textContent).toContain('No articles published yet.');
    expect(root.querySelector('button')).toBeNull();
  });

  it('retains cards on append error, presents only the approved Retry and cancels on departure', () => {
    flush(page(1, 10));
    flush(page(11, 10));
    root.querySelector<HTMLButtonElement>('button')!.click();
    requests[2].error(new Error('Unavailable'));
    changed();
    expect(root.querySelectorAll('app-card').length).toBe(10);
    expect(root.textContent).toContain('Retry loading more');
    root.querySelector<HTMLButtonElement>('button')!.click();
    changed();
    expect(root.querySelector('button')?.disabled).toBeTrue();
    const active = requests[3];
    fixture.destroy();
    expect(active.observed).toBeFalse();
  });

  it('captures real blueprint skeleton bones, fixed palette and reduced-motion binding with cleanup', async () => {
    for (let i = 0; i < 3; i++) await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    changed();
    const skeleton = fixture.debugElement.query(By.directive(SkeletonComponent)).componentInstance as SkeletonComponent;
    expect(skeleton.activeBones?.bones.length ?? 0).toBeGreaterThan(0);
    expect(skeleton.resolvedColor).toBe('var(--text-muted)');
    fixture.componentInstance.reducedMotion = true;
    changed();
    expect(skeleton.animationStyle).toBe('solid');
    expect(skeleton.staggerMs).toBe(0);
    expect(skeleton.transitionMs).toBe(0);
    const uid = skeleton.uid;
    fixture.destroy();
    expect(document.querySelector(`[data-boneyard-keyframes="${uid}"]`)).toBeNull();
  });

  it('uses available-width rem tracks with at most three columns and shrinking narrow layout', () => {
    flush(page(1, 10));
    flush(page(11, 1));
    const grid = root.querySelector<HTMLElement>('.grid-container')!;
    root.style.width = '1000px';
    document.body.appendChild(root);
    expect(getComputedStyle(grid).columnGap).toBe('24px');
    expect(getComputedStyle(grid).gridTemplateColumns.split(' ').length).toBe(3);
    root.style.width = '320px';
    expect(getComputedStyle(grid).gridTemplateColumns.split(' ').length).toBe(1);
    const card = grid.querySelector<HTMLElement>('.card')!;
    expect(card.getBoundingClientRect().right).toBeLessThanOrEqual(grid.getBoundingClientRect().right);
    const previous = document.documentElement.style.fontSize;
    document.documentElement.style.fontSize = '20px';
    expect(getComputedStyle(grid).columnGap).toBe('30px');
    document.documentElement.style.fontSize = previous;
    root.remove();
  });

  it('moves keyboard append to the new link or Archived heading only after rendering', async () => {
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    const moves: { target: HTMLElement; keyboard: boolean }[] = [];
    const registration = navigation.registerAppendHandler((target, keyboard) => moves.push({ target, keyboard }));
    flush(page(1, 10));
    const next = page(11, 10);
    next.records[0].source.id = undefined;
    flush(next);
    root.querySelector<HTMLButtonElement>('button')!.click();
    flush(page(21, 1));
    for (let i = 0; i < 3; i++) await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    expect(moves.length).toBe(1);
    expect(moves[0]?.target.tagName).toBe('H3');
    expect(moves[0]?.keyboard).toBeTrue();
    expect(root.querySelector('h3[tabindex="0"]')).toBeNull();
    registration.unsubscribe();
  });

  it('does not move or steal focus on failed, interrupted or destroyed append', async () => {
    const navigation = TestBed.inject(SectionNavigationCoordinator);
    const moved = jasmine.createSpy('append');
    const registration = navigation.registerAppendHandler(moved);
    flush(page(1, 10));
    flush(page(11, 10));
    root.querySelector<HTMLButtonElement>('button')!.click();
    navigation.cancelAppendIntent();
    flush(page(21, 1));
    for (let i = 0; i < 3; i++) await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    expect(moved).not.toHaveBeenCalled();
    registration.unsubscribe();
  });

  it('cancels all render intents when multiple buffered appends finish before departure', async () => {
    const moved = jasmine.createSpy('movement');
    const registration = TestBed.inject(SectionNavigationCoordinator).registerAppendHandler(moved);
    flush(page(1, 10));
    flush(page(11, 10));
    root.querySelector<HTMLButtonElement>('button')!.click();
    flush(page(21, 1));
    root.querySelector<HTMLButtonElement>('button')!.click();
    fixture.destroy();
    for (let i = 0; i < 3; i++) await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    expect(moved).not.toHaveBeenCalled();
    registration.unsubscribe();
  });
});
