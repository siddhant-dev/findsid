import {
  Component, Input, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef, ElementRef, ViewChildren, QueryList,
} from '@angular/core';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SkeletonResult, snapshotBones } from 'boneyard-js';
import { Subscription } from 'rxjs';
import { articleCard, ArticlesService } from '../../services/articles.service';
import { CardComponent } from '../card/card.component';
import { ArticleListSession } from './article-list-session';
import { SectionNavigationCoordinator } from '../../../home/section-navigation';

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
  readonly skeletons = Array.from({ length: 10 }, (_, i) => i);
  readonly articleCard = articleCard;
  readonly session: ArticleListSession;
  @ViewChildren(SkeletonComponent) private skeletonComponents!: QueryList<SkeletonComponent>;
  bones?: SkeletonResult;
  private skeletonSubscription?: Subscription;
  private skeletonFrame = 0;
  private appendFrame = 0;
  private appendIntent?: { token: number; keyboard: boolean };
  private readonly motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = this.motion.matches;

  constructor(service: ArticlesService, private readonly detector: ChangeDetectorRef,
    private readonly element: ElementRef<HTMLElement>,
    private readonly navigation: SectionNavigationCoordinator) {
    this.session = new ArticleListSession(page => service.getPage(page), key => {
      detector.markForCheck();
      if (this.session.state === 'ready' && this.appendIntent) this.scheduleAppendNavigation(key);
    });
  }
  ngOnInit(): void {
    this.motion.addEventListener('change', this.onMotionChange);
    this.session.start();
  }
  ngOnDestroy(): void {
    this.session.dispose();
    this.motion.removeEventListener('change', this.onMotionChange);
    this.skeletonSubscription?.unsubscribe();
    if (this.skeletonFrame) cancelAnimationFrame(this.skeletonFrame);
    if (this.appendFrame) cancelAnimationFrame(this.appendFrame);
    this.appendIntent = undefined;
  }
  ngAfterViewInit(): void {
    this.skeletonSubscription = this.skeletonComponents.changes.subscribe(() => this.captureSkeleton());
    this.captureSkeleton();
  }
  append(event: MouseEvent): void {
    if (this.session.state !== 'ready' || !this.session.hasMore) return;
    this.appendIntent = { token: this.navigation.beginAppendIntent(), keyboard: event.detail === 0 };
    this.session.append();
  }
  retry(event: MouseEvent): void {
    if (this.session.state === 'append-error') {
      this.appendIntent = { token: this.navigation.beginAppendIntent(), keyboard: event.detail === 0 };
    }
    this.session.retry();
  }
  private captureSkeleton(): void {
    if (this.bones || this.skeletonFrame || !this.skeletonComponents.first) return;
    this.skeletonFrame = requestAnimationFrame(() => {
      this.skeletonFrame = 0;
      const skeleton = this.skeletonComponents.first;
      if (skeleton) {
        this.bones = snapshotBones(skeleton.containerRef.nativeElement, 'article-loading');
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
        ? this.element.nativeElement.querySelector<HTMLElement>(`[data-article-key="${key}"]`)
        : null;
      const target = card?.querySelector<HTMLElement>('a, h3') ??
        this.element.nativeElement.closest('[data-home-section]')?.querySelector<HTMLElement>('#articles-heading');
      if (target) this.navigation.completeAppendIntent(intent.token, target, intent.keyboard);
    });
  }
  private readonly onMotionChange = (): void => {
    this.reducedMotion = this.motion.matches;
    this.detector.markForCheck();
  };
}
