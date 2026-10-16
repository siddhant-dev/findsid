import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleDetail } from '../../models/dev.model';
import {
  ArticleNotFoundError,
  ArticlesService,
} from '../../services/articles.service';
import { ExternalLinksDirective } from '../../../shared/links/external-links.directive';
import { MetaTagService } from '../../../services/meta-tag.service';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SkeletonResult, snapshotBones } from 'boneyard-js';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, ExternalLinksDirective, SkeletonComponent],
})
export class ArticlePageComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  article?: ArticleDetail;
  showSpinner = true;
  error = '';
  @ViewChild(SkeletonComponent) private skeleton?: SkeletonComponent;
  bones?: SkeletonResult;
  private skeletonFrame = 0;
  private readonly motion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );
  reducedMotion = this.motion.matches;
  private routeSub?: Subscription;
  private request?: Subscription;
  private id?: number;
  private generation = 0;
  private metadataOwner = 0;
  private destroyed = false;
  private body?: HTMLElement;
  private readonly imageCleanup: (() => void)[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: ArticlesService,
    private readonly element: ElementRef<HTMLElement>,
    private readonly detector: ChangeDetectorRef,
    private readonly meta: MetaTagService,
  ) {}
  ngOnInit(): void {
    this.motion.addEventListener('change', this.onMotionChange);
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const raw = params.get('id');
      this.id =
        raw !== null &&
        /^[1-9]\d*$/.test(raw) &&
        Number.isSafeInteger(Number(raw))
          ? Number(raw)
          : undefined;
      this.load();
    });
  }
  retry(): void {
    if (
      !this.showSpinner &&
      this.error === "Article couldn't be loaded." &&
      !this.destroyed
    )
      this.load();
  }
  private load(): void {
    this.request?.unsubscribe();
    const generation = ++this.generation;
    this.article = undefined;
    this.error = '';
    this.showSpinner = true;
    this.clearImages();
    this.body = undefined;
    this.metadataOwner = this.meta.beginPage();
    if (this.id === undefined) {
      this.error = 'Article not found.';
      this.showSpinner = false;
      this.detector.markForCheck();
      return;
    }
    this.request = this.service.getArticleById(this.id).subscribe({
      next: (article) => {
        if (this.destroyed || generation !== this.generation) return;
        this.article = article;
        this.showSpinner = false;
        this.meta.article(this.metadataOwner, article);
        this.detector.markForCheck();
      },
      error: (error) => {
        if (this.destroyed || generation !== this.generation) return;
        this.error =
          error instanceof ArticleNotFoundError ||
          (error instanceof HttpErrorResponse && error.status === 404)
            ? 'Article not found.'
            : "Article couldn't be loaded.";
        this.showSpinner = false;
        this.detector.markForCheck();
      },
    });
  }
  ngAfterViewChecked(): void {
    if (this.skeleton && !this.bones && !this.skeletonFrame) {
      this.skeletonFrame = requestAnimationFrame(() => {
        this.skeletonFrame = 0;
        if (this.skeleton && !this.destroyed) {
          this.bones = snapshotBones(
            this.skeleton.containerRef.nativeElement,
            'article-detail-loading',
          );
          this.detector.markForCheck();
        }
      });
    }
    const body =
      this.element.nativeElement.querySelector<HTMLElement>('.full-article') ??
      undefined;
    if (body === this.body) return;
    this.clearImages();
    this.body = body;
    if (!body) return;
    for (const pre of body.querySelectorAll('pre')) {
      pre.tabIndex = 0;
      pre.setAttribute('aria-label', 'Code block');
    }
    for (const table of body.querySelectorAll('table')) {
      if (table.parentElement?.classList.contains('table-scroll')) continue;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', 'Article table');
      table.before(wrapper);
      wrapper.append(table);
    }
    for (const image of body.querySelectorAll('img')) {
      const error = () => {
        if (this.body !== body || !body.contains(image)) return;
        const fallback = document.createElement('p');
        fallback.className = 'image-fallback';
        fallback.setAttribute('role', 'status');
        fallback.textContent = image.alt.trim() || 'Article image unavailable.';
        image.replaceWith(fallback);
      };
      image.addEventListener('error', error, { once: true });
      this.imageCleanup.push(() => image.removeEventListener('error', error));
      if (image.complete && image.naturalWidth === 0) error();
    }
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    this.generation++;
    this.routeSub?.unsubscribe();
    this.request?.unsubscribe();
    this.clearImages();
    this.body = undefined;
    this.meta.release(this.metadataOwner);
    if (this.skeletonFrame) cancelAnimationFrame(this.skeletonFrame);
    this.motion.removeEventListener('change', this.onMotionChange);
  }
  private readonly onMotionChange = (): void => {
    this.reducedMotion = this.motion.matches;
    this.detector.markForCheck();
  };
  private clearImages(): void {
    this.imageCleanup.splice(0).forEach((dispose) => dispose());
  }
}
