import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef, inject, OnDestroy, ViewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Datasource, IAngularDatasourceConstructed, UiScrollModule } from 'ngx-ui-scroll';
import { SkeletonComponent } from 'boneyard-js/angular';
import { SkeletonResult, snapshotBones } from 'boneyard-js';
import { MockRecordsService, recordWindow } from './mock-records.service';
import { DEFAULT_QUERY, MockRecord, QuerySelection } from './mock-record.model';
import { DemoMeasurement, OperationMeasurement } from './demo-measurement';

@Component({
  selector: 'app-virtual-scroll-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [UiScrollModule, SkeletonComponent, DecimalPipe],
  templateUrl: './virtual-scroll-demo.component.html',
  styleUrls: ['./virtual-scroll-demo.component.scss'],
  providers: [MockRecordsService],
})
export class VirtualScrollDemoComponent implements AfterViewInit, OnDestroy {
  private readonly records = inject(MockRecordsService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly measurement = new DemoMeasurement(value => {
    if (!this.destroyed && value.generation === this.generation) {
      this.metrics = value;
      this.cdr.markForCheck();
    }
  });
  private request?: Subscription;
  private renderFrame = 0;
  private skeletonResize?: ResizeObserver;
  private destroyed = false;
  private retryLabel = 'Start';

  @ViewChild('viewport') viewport?: ElementRef<HTMLElement>;
  @ViewChild('loadingSample') loadingSample?: ElementRef<HTMLElement>;

  status: 'idle' | 'loading' | 'querying' | 'ready' | 'empty' | 'error' = 'idle';
  selection: QuerySelection = DEFAULT_QUERY;
  generation = 0;
  reducedMotion = this.motion.matches;
  errorMessage = '';
  matchCount = 0;
  metrics?: OperationMeasurement;
  bones?: SkeletonResult;
  datasource?: IAngularDatasourceConstructed<MockRecord>;

  get hasData(): boolean {
    return this.records.loaded;
  }

  get hasRenderedList(): boolean {
    return this.status === 'ready' && !!this.datasource &&
      this.metrics?.generation === this.generation && this.metrics.renderedRows > 0;
  }

  get estimatedRowMemorySavings(): number | null {
    const measurement = this.metrics;
    if (this.status !== 'ready' || measurement?.generation !== this.generation ||
      this.matchCount <= 0 || measurement.renderedRows <= 0 ||
      measurement.renderedRows > this.matchCount) return null;
    return (1 - measurement.renderedRows / this.matchCount) * 100;
  }

  ngAfterViewInit(): void {
    this.motion.addEventListener('change', this.onMotionChange);
  }

  start(): void {
    if (this.destroyed || this.status === 'loading' || this.hasData) return;
    const generation = this.begin('Start', 'loading');
    this.request = this.records.load().subscribe({
      next: () => this.runQuery(generation),
      error: error => this.fail(generation, 'The mock dataset could not be loaded', error),
    });
  }

  retry(): void {
    if (this.destroyed || this.status !== 'error') return;
    if (this.hasData) this.updateSelection(this.selection, this.retryLabel);
    else this.start();
  }

  reset(): void {
    this.updateSelection(DEFAULT_QUERY, 'Reset');
  }

  search(value: string): void {
    this.updateSelection({ ...this.selection, search: value }, 'Search');
  }

  sortField(value: string): void {
    if (value !== 'id' && value !== 'name') throw new Error('Unsupported sort field');
    this.updateSelection({ ...this.selection, field: value }, 'Sort');
  }

  sortDirection(value: string): void {
    if (value !== 'asc' && value !== 'desc') throw new Error('Unsupported sort direction');
    this.updateSelection({ ...this.selection, direction: value }, 'Sort');
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.generation++;
    this.request?.unsubscribe();
    if (this.renderFrame) cancelAnimationFrame(this.renderFrame);
    this.skeletonResize?.disconnect();
    this.motion.removeEventListener('change', this.onMotionChange);
    this.measurement.dispose();
    this.records.dispose();
    this.datasource = undefined;
  }

  private updateSelection(selection: QuerySelection, label: string): void {
    if (this.destroyed || !this.hasData) return;
    this.selection = selection;
    this.runQuery(this.begin(label, 'querying'));
  }

  private begin(label: string, status: 'loading' | 'querying'): number {
    const generation = ++this.generation;
    this.retryLabel = label;
    this.errorMessage = '';
    this.status = status;
    this.matchCount = 0;
    this.measurement.begin(generation, label);
    if (this.renderFrame) cancelAnimationFrame(this.renderFrame);
    this.skeletonResize?.disconnect();
    this.skeletonResize = undefined;
    this.bones = undefined;
    // Destroy the previous directive before exposing a new immutable datasource.
    // This serializes result swaps and cancels the old library workflow outright.
    this.datasource = undefined;
    this.cdr.detectChanges();
    this.scheduleSkeletonCapture();
    return generation;
  }

  private runQuery(generation: number): void {
    void this.records.query(this.selection).then(
      rows => {
        if (!this.isCurrent(generation)) return;
        this.skeletonResize?.disconnect();
        if (this.renderFrame) cancelAnimationFrame(this.renderFrame);
        this.matchCount = rows.length;
        this.status = rows.length ? 'ready' : 'empty';
        if (rows.length) {
          this.datasource = this.createDatasource(rows, generation);
          this.cdr.detectChanges();
          const viewport = this.viewport?.nativeElement;
          if (viewport) {
            viewport.scrollTop = 0;
            this.measurement.observe(viewport, generation);
          }
        } else {
          this.measurement.unavailable(generation);
          this.cdr.markForCheck();
        }
      },
      error => this.fail(generation, 'The current query could not be rendered', error),
    );
  }

  private createDatasource(rows: readonly MockRecord[], generation: number): IAngularDatasourceConstructed<MockRecord> {
    return new Datasource<MockRecord>({
      get: (index: number, count: number) => {
        try {
          if (!this.isCurrent(generation)) {
            return Promise.reject(new Error('This list operation was superseded'));
          }
          return Promise.resolve(recordWindow(rows, index, count));
        } catch (error) {
          this.fail(generation, 'The virtual list could not supply a record window', error);
          return Promise.reject(error);
        }
      },
      settings: { startIndex: 0, minIndex: 0, maxIndex: rows.length - 1 },
    });
  }

  private fail(generation: number, context: string, error: unknown): void {
    if (!this.isCurrent(generation)) return;
    this.status = 'error';
    this.errorMessage = `${context}. ${error instanceof Error ? error.message : 'Please try again.'}`;
    this.datasource = undefined;
    this.skeletonResize?.disconnect();
    if (this.renderFrame) cancelAnimationFrame(this.renderFrame);
    this.measurement.unavailable(generation);
    this.cdr.markForCheck();
  }

  private scheduleSkeletonCapture(): void {
    this.renderFrame = requestAnimationFrame(() => {
      this.renderFrame = 0;
      if (this.destroyed || !['loading', 'querying'].includes(this.status)) return;
      const sample = this.loadingSample?.nativeElement;
      if (!sample) return;
      const capture = () => {
        if (!this.destroyed && ['loading', 'querying'].includes(this.status)) {
          // The skeleton hides projected content after capture. Temporarily expose
          // it for synchronous measurement, restoring visibility before any paint.
          const visibility = sample.style.visibility;
          try {
            sample.style.visibility = 'visible';
            this.bones = snapshotBones(sample, 'lab-record-loading');
          } finally {
            sample.style.visibility = visibility;
          }
          this.cdr.markForCheck();
        }
      };
      capture();
      this.skeletonResize = new ResizeObserver(capture);
      this.skeletonResize.observe(sample);
    });
  }

  private isCurrent(generation: number): boolean {
    return !this.destroyed && generation === this.generation;
  }

  private readonly onMotionChange = (): void => {
    this.reducedMotion = this.motion.matches;
    this.cdr.markForCheck();
  };
}
