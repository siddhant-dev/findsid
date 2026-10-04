import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SkeletonResult, snapshotBones } from 'boneyard-js';
import { Subscription } from 'rxjs';
import { articleCard, ArticlesService } from '../../services/articles.service';
import { CardComponent } from '../card/card.component';
import { ArticleCheckpoint, ArticleListSession } from './article-list-session';
import { SectionNavigationCoordinator } from '../../../home/section-navigation';
import { ArticleListSnapshotService } from './article-list-snapshot.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CardComponent, SkeletonComponent],
})
export class ArticlesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() embedded = false;
  @Input() checkpoint?: ArticleCheckpoint;
  readonly skeletons = Array.from({ length: 10 }, (_, i) => i);
  readonly articleCard = articleCard;
  readonly session: ArticleListSession;
  @ViewChildren(SkeletonComponent)
  private skeletonComponents!: QueryList<SkeletonComponent>;
  bones?: SkeletonResult;
  private skeletonSubscription?: Subscription;
  private skeletonFrame = 0;
  private appendFrame = 0;
  private appendIntent?: { token: number; keyboard: boolean };
  private departureSubscription?: Subscription;
  private initiatingCardKey?: string;
  private keyboardDeparture = false;
  private readonly motion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  reducedMotion = this.motion.matches;

  constructor(
    service: ArticlesService,
    private readonly detector: ChangeDetectorRef,
    private readonly element: ElementRef<HTMLElement>,
    private readonly navigation: SectionNavigationCoordinator,
    private readonly router: Router,
    private readonly snapshots: ArticleListSnapshotService,
  ) {
    this.session = new ArticleListSession(
      (page) => service.getPage(page),
      (key) => {
        detector.markForCheck();
        if (this.session.state === 'ready' && this.appendIntent)
          this.scheduleAppendNavigation(key);
      },
    );
  }
  ngOnInit(): void {
    this.motion.addEventListener('change', this.onMotionChange);
    if (this.checkpoint) this.session.restore(this.checkpoint);
    else this.session.start();
    this.departureSubscription = this.router.events.subscribe((event) => {
      if (
        !(event instanceof NavigationStart) ||
        !/^\/work\/articles\/[^/?#]+(?:[?#]|$)/.test(event.url)
      )
        return;
      const section =
        this.element.nativeElement.closest<HTMLElement>(
          '[data-home-section]',
        ) ?? this.element.nativeElement;
      const focused =
        document.activeElement?.closest<HTMLElement>('[data-article-key]');
      this.snapshots.save({
        checkpoint: this.session.checkpoint,
        sectionOffset: -section.getBoundingClientRect().top,
        initiatingCardKey:
          focused?.dataset['articleKey'] ?? this.initiatingCardKey,
        keyboard: this.keyboardDeparture,
      });
    });
  }
  @HostListener('click', ['$event'])
  @HostListener('pointerdown', ['$event'])
  rememberDeparture(event: MouseEvent): void {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>('[data-article-key]');
    if (card) {
      this.initiatingCardKey = card.dataset['articleKey'];
      this.keyboardDeparture = event.type === 'click' && event.detail === 0;
    }
  }
  @HostListener('keydown', ['$event'])
  rememberKeyboardDeparture(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || !(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>('[data-article-key]');
    if (card) {
      this.initiatingCardKey = card.dataset['articleKey'];
      this.keyboardDeparture = true;
    }
  }
  ngOnDestroy(): void {
    this.departureSubscription?.unsubscribe();
    this.session.dispose();
    this.motion.removeEventListener('change', this.onMotionChange);
    this.skeletonSubscription?.unsubscribe();
    if (this.skeletonFrame) cancelAnimationFrame(this.skeletonFrame);
    if (this.appendFrame) cancelAnimationFrame(this.appendFrame);
    this.appendIntent = undefined;
  }
  ngAfterViewInit(): void {
    this.skeletonSubscription = this.skeletonComponents.changes.subscribe(() =>
      this.captureSkeleton(),
    );
    this.captureSkeleton();
  }
  append(event: MouseEvent): void {
    if (this.session.state !== 'ready' || !this.session.hasMore) return;
    this.appendIntent = {
      token: this.navigation.beginAppendIntent(),
      keyboard: event.detail === 0,
    };
    this.session.append();
  }
  retry(event: MouseEvent): void {
    if (this.session.state === 'append-error') {
      this.appendIntent = {
        token: this.navigation.beginAppendIntent(),
        keyboard: event.detail === 0,
      };
    }
    this.session.retry();
  }
  private captureSkeleton(): void {
    if (this.bones || this.skeletonFrame || !this.skeletonComponents.first)
      return;
    this.skeletonFrame = requestAnimationFrame(() => {
      this.skeletonFrame = 0;
      const skeleton = this.skeletonComponents.first;
      if (skeleton) {
        this.bones = snapshotBones(
          skeleton.containerRef.nativeElement,
          'article-loading',
        );
        this.detector.markForCheck();
      }
    });
  }
  private scheduleAppendNavigation(key?: string): void {
    const intent = this.appendIntent!;
    this.appendIntent = undefined;
    if (this.appendFrame) cancelAnimationFrame(this.appendFrame);
    this.appendFrame = requestAnimationFrame(() => {
      this.appendFrame = 0;
      this.detector.detectChanges();
      const card = key
        ? this.element.nativeElement.querySelector<HTMLElement>(
            `[data-article-key="${key}"]`,
          )
        : null;
      const target =
        card?.querySelector<HTMLElement>('a, h3') ??
        this.element.nativeElement
          .closest('[data-home-section]')
          ?.querySelector<HTMLElement>('#articles-heading');
      if (target)
        this.navigation.completeAppendIntent(
          intent.token,
          target,
          intent.keyboard,
        );
    });
  }
  private readonly onMotionChange = (): void => {
    this.reducedMotion = this.motion.matches;
    this.detector.markForCheck();
  };
}
