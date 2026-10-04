import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentRef,
  Component,
  ElementRef,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleListSnapshot, ArticleListSnapshotService } from '../work-module/work/articles/article-list-snapshot.service';
import { AboutComponent } from '../about/about.component';
import {
  LazySectionId,
  SectionActivationCoordinator,
  SectionActivationState,
  sectionActivationRootMargin,
} from './section-activation';
import {
  NavigationIntent,
  SectionNavigationCoordinator,
  activeSectionFromPositions,
} from './section-navigation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CommonModule, AboutComponent],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly sectionIds = ['about', 'lab', 'experience', 'articles', 'vault'] as const;
  private readonly renderedStates: Record<
    LazySectionId,
    SectionActivationState<Type<unknown>>
  > = {
    lab: { status: 'idle' },
    experience: { status: 'idle' },
    articles: { status: 'idle' },
    vault: { status: 'idle' },
  };
  private readonly activation = new SectionActivationCoordinator<Type<unknown>>({
    lab: () =>
      import('../interaction-lab/interaction-lab.component').then(
        module => module.InteractionLabComponent,
      ),
    experience: () =>
      import('../experiences/experiences.component').then(
        module => module.ExperiencesComponent,
      ),
    articles: () =>
      import('../work-module/work/articles/articles.component').then(
        (module) => module.ArticlesComponent,
      ),
    vault: () =>
      import('../work-module/work/apps/apps.component').then(
        (module) => module.AppsComponent,
      ),
  });

  @ViewChildren('sectionBody') sectionBodies!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('labHost', { read: ViewContainerRef })
  private labHost?: ViewContainerRef;
  @ViewChild('experienceHost', { read: ViewContainerRef })
  private experienceHost?: ViewContainerRef;
  @ViewChild('articlesHost', { read: ViewContainerRef })
  private articlesHost?: ViewContainerRef;
  @ViewChild('vaultHost', { read: ViewContainerRef })
  private vaultHost?: ViewContainerRef;
  private readonly renderedComponents: Partial<
    Record<LazySectionId, ComponentRef<unknown>>
  > = {};

  private activationObserver?: IntersectionObserver;
  private resizeObserver?: ResizeObserver;
  private activationSubscription?: Subscription;
  private appendSubscription?: Subscription;
  private scrollFrame = 0;
  private correctionFrame = 0;
  private scrollEndTimer?: number;
  private readonly renderFrames = new Set<number>();
  private previousScrollRestoration: ScrollRestoration = 'auto';
  private lastReadingPosition?: { id: string; top: number };
  private requestedTarget: string | null = null;
  private userIntentGeneration = 0;
  private destroyed = false;
  private restoration?: ArticleListSnapshot;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly navigation: SectionNavigationCoordinator,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly snapshots: ArticleListSnapshotService,
  ) {}

  ngAfterViewInit(): void {
    this.restoration = this.snapshots.takeReturn();
    if (this.restoration) {
      this.requestedTarget = 'articles';
      this.activate('articles');
    }
    this.previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    this.activationSubscription = this.navigation.registerHome((intent) =>
      this.handleNavigationIntent(intent),
    );
    this.appendSubscription = this.navigation.registerAppendHandler((target, keyboard) =>
      this.handleAppendNavigation(target, keyboard),
    );
    this.setupActivationObserver();
    this.setupResizeObserver();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onViewportChange, { passive: true });
    window.addEventListener('wheel', this.onUserIntent, { passive: true });
    window.addEventListener('touchstart', this.onUserIntent, { passive: true });
    window.addEventListener('pointerdown', this.onUserIntent, { passive: true });
    window.addEventListener('keydown', this.onKeyIntent);
    window.addEventListener('scrollend', this.onScrollEnd);
    document.fonts?.addEventListener('loadingdone', this.onViewportChange);
    requestAnimationFrame(() => this.updateActiveSection());
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.activationSubscription?.unsubscribe();
    this.appendSubscription?.unsubscribe();
    this.activationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.activation.destroy();
    this.labHost?.clear();
    this.experienceHost?.clear();
    this.articlesHost?.clear();
    this.vaultHost?.clear();
    this.sectionBodies?.forEach(({ nativeElement }) =>
      this.resizeObserver?.unobserve(nativeElement),
    );
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onViewportChange);
    window.removeEventListener('wheel', this.onUserIntent);
    window.removeEventListener('touchstart', this.onUserIntent);
    window.removeEventListener('pointerdown', this.onUserIntent);
    window.removeEventListener('keydown', this.onKeyIntent);
    window.removeEventListener('scrollend', this.onScrollEnd);
    document.fonts?.removeEventListener('loadingdone', this.onViewportChange);
    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
    }
    if (this.correctionFrame) {
      cancelAnimationFrame(this.correctionFrame);
    }
    if (this.scrollEndTimer !== undefined) {
      window.clearTimeout(this.scrollEndTimer);
    }
    for (const frame of this.renderFrames) {
      cancelAnimationFrame(frame);
    }
    history.scrollRestoration = this.previousScrollRestoration;
  }

  state(id: LazySectionId): SectionActivationState<Type<unknown>> {
    return this.renderedStates[id];
  }

  retry(id: LazySectionId): void {
    void this.activation.retry(id).then(
      () => this.scheduleChangeDetection(id),
      () => this.scheduleChangeDetection(id),
    );
    this.scheduleChangeDetection(id);
  }

  private activate(id: LazySectionId): void {
    void this.activation.activate(id).then(
      () => this.scheduleChangeDetection(id),
      () => this.scheduleChangeDetection(id),
    );
    this.scheduleChangeDetection(id);
  }

  private scheduleChangeDetection(id: LazySectionId): void {
    const frame = requestAnimationFrame(() => {
      this.renderFrames.delete(frame);
      if (!this.destroyed) {
        const state = this.activation.state(id);
        this.renderedStates[id] = state;
        if (state.status === 'ready' && !this.renderedComponents[id]) {
          const host = id === 'lab' ? this.labHost :
            id === 'experience' ? this.experienceHost :
            id === 'articles' ? this.articlesHost : this.vaultHost;
          if (host) {
            const component = host.createComponent(state.value);
            component.setInput('embedded', true);
            if (id === 'articles' && this.restoration) component.setInput('checkpoint', this.restoration.checkpoint);
            component.changeDetectorRef.detectChanges();
            this.renderedComponents[id] = component;
            if (id === 'articles' && this.restoration) this.restoreArticles();
          }
        }
        this.changeDetector.markForCheck();
      }
    });
    this.renderFrames.add(frame);
  }

  private setupActivationObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.recreateActivationObserver();
    for (const id of ['lab', 'experience', 'articles', 'vault'] as const) {
      const section = this.sectionElement(id);
      if (section) {
        this.activationObserver?.observe(section);
      }
    }
  }

  private recreateActivationObserver(): void {
    this.activationObserver?.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }
    const fontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const rootMargin = sectionActivationRootMargin(fontSize);
    this.activationObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const id = (entry.target as HTMLElement).id as LazySectionId;
          this.activate(id);
          this.activationObserver?.unobserve(entry.target);
        }
      },
      { rootMargin, threshold: 0 },
    );
    for (const id of ['lab', 'experience', 'articles', 'vault'] as const) {
      const section = this.sectionElement(id);
      if (section && this.state(id).status === 'idle') {
        this.activationObserver.observe(section);
      }
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => this.preserveReadingPosition());
    this.sectionBodies?.forEach(({ nativeElement }) =>
      this.resizeObserver?.observe(nativeElement),
    );
    if (this.sectionBodies) {
      this.sectionBodies.changes.subscribe((bodies: QueryList<ElementRef<HTMLElement>>) =>
        bodies.forEach(({ nativeElement }) => this.resizeObserver?.observe(nativeElement)),
      );
    }
  }

  private sectionElement(id: string): HTMLElement | null {
    return this.element.nativeElement.querySelector<HTMLElement>(`#${id}[data-home-section]`);
  }

  private handleNavigationIntent(intent: NavigationIntent): void {
    const generation = ++this.userIntentGeneration;
    this.requestedTarget = intent.id;
    if (intent.id === 'lab' || intent.id === 'experience' || intent.id === 'articles' || intent.id === 'vault') {
      this.activate(intent.id);
    }
    if (intent.id === 'articles' && this.restoration) return;

    const target = this.element.nativeElement.querySelector<HTMLElement>(
      `#${intent.id}-heading`,
    );
    if (!target) {
      return;
    }
    requestAnimationFrame(() => {
      if (this.destroyed || this.requestedTarget !== intent.id || generation !== this.userIntentGeneration) {
        return;
      }
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior =
        intent.source === 'selection' && !reducedMotion ? 'smooth' : 'instant';
      window.scrollTo({
        top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 96),
        behavior,
      });
      this.lastReadingPosition = {
        id: intent.id,
        top: target.getBoundingClientRect().top,
      };
      if (behavior === 'smooth') {
        this.scrollEndTimer = window.setTimeout(() => this.finishIntent(intent.id), 1200);
      } else {
        this.finishIntent(intent.id);
      }
    });
  }

  private handleAppendNavigation(target: HTMLElement, keyboard: boolean): void {
    if (this.destroyed || !this.element.nativeElement.contains(target)) return;
    this.userIntentGeneration++;
    if (this.correctionFrame) {
      cancelAnimationFrame(this.correctionFrame);
      this.correctionFrame = 0;
    }
    if (this.scrollEndTimer !== undefined) window.clearTimeout(this.scrollEndTimer);
    if (this.requestedTarget) this.navigation.finishIntent(this.requestedTarget);
    this.requestedTarget = 'articles';
    if (keyboard) {
      if (target.tagName !== 'A') {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
      target.focus({ preventScroll: true });
    }
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant' : 'smooth';
    window.scrollTo({
      top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 96), behavior,
    });
    if (behavior === 'instant') {
      this.finishIntent('articles');
    } else {
      this.scrollEndTimer = window.setTimeout(() => this.finishIntent('articles'), 1200);
    }
  }

  private restoreArticles(): void {
    const snapshot = this.restoration!;
    const generation = this.userIntentGeneration;
    const frame = requestAnimationFrame(() => {
      this.renderFrames.delete(frame);
      this.restoration = undefined;
      if (this.destroyed || generation !== this.userIntentGeneration) return;
      const section = this.sectionElement('articles');
      if (!section) return;
      const card = [...section.querySelectorAll<HTMLElement>('[data-article-key]')]
        .find(node => node.dataset['articleKey'] === snapshot.initiatingCardKey);
      const target = card?.querySelector<HTMLElement>('a, h3');
      if (snapshot.keyboard && target) {
        if (target.tagName !== 'A') target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
      window.scrollTo({ top: Math.max(0, window.scrollY + section.getBoundingClientRect().top + snapshot.sectionOffset),
        behavior: 'instant' });
      this.finishIntent('articles');
    });
    this.renderFrames.add(frame);
  }

  private updateActiveSection(): void {
    if (this.destroyed || this.requestedTarget) {
      return;
    }
    const positions = this.sectionIds.map((id) => ({
      id,
      top:
        this.element.nativeElement
          .querySelector<HTMLElement>(`#${id}-heading`)
          ?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
    }));
    const atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 1;
    const active = activeSectionFromPositions(positions, 96, atBottom);
    this.navigation.setPassiveActiveSection(active);
    this.lastReadingPosition = {
      id: active,
      top:
        this.element.nativeElement
          .querySelector<HTMLElement>(`#${active}-heading`)
          ?.getBoundingClientRect().top ?? 0,
    };
  }

  private preserveReadingPosition(): void {
    if (this.destroyed || !this.lastReadingPosition || this.requestedTarget) {
      return;
    }
    const generation = this.userIntentGeneration;
    const previous = this.lastReadingPosition;
    const heading = this.element.nativeElement.querySelector<HTMLElement>(
      `#${previous.id}-heading`,
    );
    if (!heading) {
      return;
    }
    const delta = heading.getBoundingClientRect().top - previous.top;
    if (Math.abs(delta) < 1) {
      return;
    }
    if (this.correctionFrame) {
      cancelAnimationFrame(this.correctionFrame);
    }
    this.correctionFrame = requestAnimationFrame(() => {
      this.correctionFrame = 0;
      if (this.destroyed || generation !== this.userIntentGeneration || this.requestedTarget) {
        return;
      }
      window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: 'instant' });
      this.lastReadingPosition = {
        id: previous.id,
        top: heading.getBoundingClientRect().top,
      };
    });
  }

  private finishIntent(id: string): void {
    if (this.requestedTarget !== id) {
      return;
    }
    this.requestedTarget = null;
    this.navigation.finishIntent(id);
    this.updateActiveSection();
  }

  private readonly onScroll = (): void => {
    if (this.scrollFrame) {
      return;
    }
    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateActiveSection();
    });
  };

  private readonly onScrollEnd = (): void => {
    if (this.restoration) return;
    if (this.requestedTarget) {
      this.finishIntent(this.requestedTarget);
    }
  };

  private readonly onUserIntent = (): void => {
    this.navigation.cancelAppendIntent();
    this.userIntentGeneration += 1;
    if (this.requestedTarget) {
      const requested = this.requestedTarget;
      this.requestedTarget = null;
      this.navigation.finishIntent(requested);
    }
    this.updateActiveSection();
  };

  private readonly onKeyIntent = (event: KeyboardEvent): void => {
    this.navigation.cancelAppendIntent();
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      this.onUserIntent();
    }
  };

  private readonly onViewportChange = (): void => {
    this.recreateActivationObserver();
    this.preserveReadingPosition();
  };
}
