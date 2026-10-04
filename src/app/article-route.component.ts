import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTICLE_ROUTE_LOADER } from './article-route-loader';
import { MetaTagService } from './services/meta-tag.service';
import { ArticleListSnapshotService } from './work-module/work/articles/article-list-snapshot.service';

@Component({
  selector: 'app-article-route',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ng-container #host />
    @if (state !== 'ready') {
      <div class="reading-boundary">
        <a class="navigation-text" routerLink="/" fragment="articles">Back to Articles</a>
        @if (state === 'error') {
          <p class="error-text" role="alert">This page couldn't be loaded.</p>
          <button class="blueprint-button" type="button" (click)="retry()">Retry</button>
        } @else {
          <p class="body-text muted-text" role="status">Loading article</p>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; min-width: 0; }
    .reading-boundary { box-sizing: border-box; max-width: 48rem; margin: 0 auto; padding: 3rem 1.5rem;
      display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  `],
})
export class ArticleRouteComponent implements OnInit, OnDestroy {
  @ViewChild('host', { read: ViewContainerRef, static: true }) private host!: ViewContainerRef;
  state: 'loading' | 'ready' | 'error' = 'loading';
  private readonly load = inject(ARTICLE_ROUTE_LOADER);
  private readonly detector = inject(ChangeDetectorRef);
  private readonly meta = inject(MetaTagService);
  private readonly snapshots = inject(ArticleListSnapshotService);
  private owner = 0;
  private generation = 0;
  private destroyed = false;
  ngOnInit(): void {
    this.snapshots.enterDetail();
    this.owner = this.meta.beginPage();
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.activate();
  }
  retry(): void {
    if (this.state !== 'error' || this.destroyed) return;
    this.state = 'loading';
    this.activate();
  }
  private activate(): void {
    const generation = ++this.generation;
    void this.load().then(component => {
      if (this.destroyed || generation !== this.generation) return;
      this.host.createComponent(component);
      this.state = 'ready';
      this.detector.markForCheck();
    }, error => {
      if (this.destroyed || generation !== this.generation) return;
      console.error('Article route code failed:', error);
      this.state = 'error';
      this.detector.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    this.generation++;
    this.meta.release(this.owner);
  }
}
