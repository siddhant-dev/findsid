import {
  Component, Input, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef, ViewChildren, QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SkeletonResult, snapshotBones } from 'boneyard-js';
import { archiveCard, Card } from '../../models/card.model';
import { AppService } from '../../services/app.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CardComponent, SkeletonComponent],
})
export class AppsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() embedded = false;
  cards: Card[] = [];
  state: 'loading' | 'ready' | 'empty' | 'error' | 'disposed' = 'loading';
  readonly skeletons = Array.from({ length: 5 }, (_, i) => i);
  bones?: SkeletonResult;
  @ViewChildren(SkeletonComponent) private skeletonComponents!: QueryList<SkeletonComponent>;
  private sub?: Subscription;
  private skeletonSubscription?: Subscription;
  private skeletonFrame = 0;
  private active = false;
  private readonly motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = this.motion.matches;

  constructor(private readonly service: AppService, private readonly detector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.motion.addEventListener('change', this.onMotionChange);
    this.load();
  }
  retry(): void {
    if (this.state === 'error') this.load();
  }
  private load(): void {
    if (this.active || this.state === 'disposed') return;
    this.active = true;
    this.state = 'loading';
    this.sub = this.service.getApps().subscribe({
      next: data => {
        this.cards = data.map(archiveCard);
        this.active = false;
        this.state = this.cards.length ? 'ready' : 'empty';
        this.detector.markForCheck();
      },
      error: () => {
        this.active = false;
        this.state = 'error';
        this.detector.markForCheck();
      },
    });
  }
  ngAfterViewInit(): void {
    this.skeletonSubscription = this.skeletonComponents.changes.subscribe(() => this.captureSkeleton());
    this.captureSkeleton();
  }
  private captureSkeleton(): void {
    if (this.bones || this.skeletonFrame || !this.skeletonComponents.first) return;
    this.skeletonFrame = requestAnimationFrame(() => {
      this.skeletonFrame = 0;
      const skeleton = this.skeletonComponents.first;
      if (skeleton) {
        this.bones = snapshotBones(skeleton.containerRef.nativeElement, 'vault-loading');
        this.detector.markForCheck();
      }
    });
  }
  ngOnDestroy(): void {
    this.state = 'disposed';
    this.sub?.unsubscribe();
    this.skeletonSubscription?.unsubscribe();
    if (this.skeletonFrame) cancelAnimationFrame(this.skeletonFrame);
    this.motion.removeEventListener('change', this.onMotionChange);
  }
  private readonly onMotionChange = (): void => {
    this.reducedMotion = this.motion.matches;
    this.detector.markForCheck();
  };
}
