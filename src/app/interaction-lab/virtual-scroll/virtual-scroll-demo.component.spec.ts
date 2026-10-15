import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualScrollDemoComponent } from './virtual-scroll-demo.component';
import { MockRecord } from './mock-record.model';
import { MockRecordsService } from './mock-records.service';
import { By } from '@angular/platform-browser';
import { SkeletonComponent } from 'boneyard-js/angular';

function fullDataset(): MockRecord[] {
  return Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    name: `Record ${String(i + 1).padStart(6, '0')}`,
    description: `Synthetic description ${i + 1}`,
  }));
}

async function frames(count = 12): Promise<void> {
  for (let i = 0; i < count; i++) {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  }
}

describe('Virtual scroll demo', () => {
  let fixture: ComponentFixture<VirtualScrollDemoComponent>;
  let http: HttpTestingController;
  let root: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualScrollDemoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(VirtualScrollDemoComponent);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });
  afterEach(() => {
    fixture.destroy();
    http.verify({ ignoreCancelled: true });
  });

  async function start(): Promise<void> {
    fixture.componentInstance.start();
    fixture.detectChanges();
    http.expectOne('assets/lab/records.json').flush(fullDataset());
    await frames();
    fixture.detectChanges();
  }

  it('explains explicit Start, loads only on acceptance and renders a bounded window', async () => {
    expect(root.textContent).toContain('100,000');
    expect(root.querySelector('footer')).toBeNull();
    const idleViewport = root.querySelector<HTMLElement>('.record-viewport')!;
    const startButton = idleViewport.querySelector('button')!;
    const viewportBounds = idleViewport.getBoundingClientRect();
    const buttonBounds = startButton.getBoundingClientRect();
    expect(buttonBounds.left + buttonBounds.width / 2)
      .toBeCloseTo(viewportBounds.left + viewportBounds.width / 2, 0);
    expect(buttonBounds.top + buttonBounds.height / 2)
      .toBeCloseTo(viewportBounds.top + viewportBounds.height / 2, 0);
    http.expectNone('assets/lab/records.json');
    fixture.componentInstance.start();
    fixture.detectChanges();
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading records');
    expect(root.querySelector('boneyard-skeleton')).not.toBeNull();
    expect(root.querySelector('footer')).toBeNull();
    http.expectOne('assets/lab/records.json').flush(fullDataset());
    await frames();
    fixture.detectChanges();
    expect(root.querySelectorAll('[data-record-id]').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('[data-record-id]').length).toBeLessThan(1000);
    expect(root.querySelector('footer')).not.toBeNull();
    const viewport = root.querySelector<HTMLElement>('[role="region"]')!;
    expect(viewport.getAttribute('aria-label')).toBeTruthy();
    expect(viewport.tabIndex).toBe(0);
    const expectedHeight = Math.min(400, window.innerHeight * .6);
    expect(parseFloat(getComputedStyle(viewport).height)).toBeCloseTo(expectedHeight, 1);
    expect(viewport.getBoundingClientRect().height).toBeCloseTo(expectedHeight, 1);
    expect(root.querySelectorAll('[data-record-id] [tabindex]').length).toBe(0);
    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', cancelable: true }));
    expect(root.querySelector('[data-record-id="1"]')).not.toBeNull();
  });

  it('allows subpixel layout rounding for fractional viewport height caps', () => {
    const viewport = root.querySelector<HTMLElement>('.record-viewport')!;
    viewport.style.maxHeight = '262.2px';
    expect(parseFloat(getComputedStyle(viewport).height)).toBeCloseTo(262.2, 1);
    expect(viewport.getBoundingClientRect().height).toBeCloseTo(262.2, 1);
  });

  it('presents load failure distinctly and retries instead of claiming empty success', async () => {
    fixture.componentInstance.start();
    http.expectOne('assets/lab/records.json').flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    fixture.detectChanges();
    expect(root.querySelector('[role="alert"]')).not.toBeNull();
    expect(root.textContent).toContain('Retry');
    expect(root.textContent).not.toContain('No matching records');
    fixture.componentInstance.retry();
    http.expectOne('assets/lab/records.json').flush(fullDataset());
    await frames();
    fixture.detectChanges();
    expect(root.querySelector('[data-record-id]')).not.toBeNull();
  });

  it('cancels loading when the component is destroyed', () => {
    fixture.componentInstance.start();
    const request = http.expectOne('assets/lab/records.json');
    fixture.destroy();
    expect(request.cancelled).toBeTrue();
  });

  it('makes the newest search win and resets cached data and scroll to the top', async () => {
    await start();
    fixture.componentInstance.search('100000');
    fixture.componentInstance.search('no matching record here');
    await frames();
    fixture.detectChanges();
    expect(root.textContent).toContain('No matching records');
    expect(root.querySelectorAll('[data-record-id]').length).toBe(0);
    fixture.componentInstance.reset();
    await frames();
    fixture.detectChanges();
    expect(fixture.componentInstance.selection.search).toBe('');
    expect(root.querySelector('[data-record-id="1"]')).not.toBeNull();
    expect(root.querySelector<HTMLElement>('[role="region"]')?.scrollTop).toBe(0);
    http.expectNone('assets/lab/records.json');
  });

  it('keeps a captured reduced-motion skeleton stable through container resizing and cleanup', async () => {
    fixture.componentInstance.reducedMotion = true;
    fixture.componentInstance.start();
    const request = http.expectOne('assets/lab/records.json');
    await frames(3);
    fixture.detectChanges();
    const skeleton = fixture.debugElement.query(By.directive(SkeletonComponent))
      .componentInstance as SkeletonComponent;
    expect(skeleton.activeBones?.bones.length).toBeGreaterThan(0);
    expect(skeleton.animationStyle).toBe('solid');
    expect(skeleton.color).toBe(skeleton.darkColor);
    expect(skeleton.staggerMs).toBe(0);
    expect(skeleton.transitionMs).toBe(0);
    root.style.width = '320px';
    await frames(4);
    fixture.detectChanges();
    expect(skeleton.activeBones?.bones.length).toBeGreaterThan(0);
    expect(skeleton.activeBones?.width).toBeLessThanOrEqual(320);
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
    const uid = skeleton.uid;
    fixture.destroy();
    expect(request.cancelled).toBeTrue();
    expect(document.querySelector(`[data-boneyard-keyframes="${uid}"]`)).toBeNull();
  });

  it('does not publish an old query or error after a newer query completes', async () => {
    await start();
    const service = fixture.debugElement.injector.get(MockRecordsService);
    let rejectOld!: (reason: Error) => void;
    spyOn(service, 'query').and.returnValues(
      new Promise<readonly MockRecord[]>((_resolve, reject) => rejectOld = reject),
      Promise.resolve([{ id: 99999, name: 'Newest', description: 'Current query only' }]),
    );
    fixture.componentInstance.search('old');
    fixture.componentInstance.search('new');
    await frames();
    rejectOld(new Error('Old operation failed'));
    await frames(3);
    fixture.detectChanges();
    expect(root.querySelector('[data-record-id="99999"]')).not.toBeNull();
    expect(root.querySelector('[role="alert"]')).toBeNull();
    expect(fixture.componentInstance.metrics?.label).toBe('Search');
  });

  it('distinguishes cached query failure and retries without fetching the asset again', async () => {
    await start();
    const service = fixture.debugElement.injector.get(MockRecordsService);
    const original = service.query.bind(service);
    const query = spyOn(service, 'query').and.returnValue(Promise.reject(new Error('Query failed')));
    fixture.componentInstance.search('100000');
    await frames(3);
    fixture.detectChanges();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('Query failed');
    expect(root.querySelector('footer')).toBeNull();
    query.and.callFake(original);
    fixture.componentInstance.retry();
    await frames();
    fixture.detectChanges();
    expect(root.querySelector('[data-record-id="100000"]')).not.toBeNull();
    http.expectNone('assets/lab/records.json');
  });

  it('reports datasource failures rather than publishing a fake empty EOF', async () => {
    await start();
    const source = fixture.componentInstance.datasource!;
    await expectAsync(Promise.resolve(source.get(0, 0, () => undefined)))
      .toBeRejectedWithError(/Window index/);
    fixture.detectChanges();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('record window');
    expect(root.textContent).not.toContain('No matching records');
    expect(fixture.componentInstance.metrics?.firstRowMs).toBeNull();
    expect(root.querySelector('[data-record-id]')).toBeNull();
  });

  it('cannot publish a pending query after destruction', async () => {
    await start();
    const service = fixture.debugElement.injector.get(MockRecordsService);
    let resolveQuery!: (records: readonly MockRecord[]) => void;
    spyOn(service, 'query').and.returnValue(new Promise(resolve => resolveQuery = resolve));
    fixture.componentInstance.search('pending');
    const generation = fixture.componentInstance.generation;
    fixture.destroy();
    resolveQuery([{ id: 100000, name: 'Late', description: 'Must not publish' }]);
    await frames(3);
    expect(fixture.componentInstance.datasource).toBeUndefined();
    expect(fixture.componentInstance.generation).toBeGreaterThan(generation);
    expect(service.loaded).toBeFalse();
  });

  it('compares actual rendered rows with the matching normal-scroll baseline without RAM claims', async () => {
    await start();
    expect(fixture.componentInstance.metrics?.renderedRows).toBe(root.querySelectorAll('[data-record-id]').length);
    const component = fixture.componentInstance;
    expect(component.estimatedRowMemorySavings)
      .toBe((1 - component.metrics!.renderedRows / component.matchCount) * 100);
    let comparison = root.querySelector('[aria-label="Estimated row memory savings"]')!;
    expect(comparison.textContent).toContain('not measured RAM');
    expect(comparison.textContent).toContain('100,000 matching rows');
    expect(root.textContent).not.toContain('Owner-reported');
    const adapter = component.datasource!.adapter;
    component.search('100000');
    expect(component.estimatedRowMemorySavings).toBeNull();
    await frames();
    fixture.detectChanges();
    expect(component.matchCount).toBe(1);
    expect(component.estimatedRowMemorySavings).toBe(0);
    comparison = root.querySelector('[aria-label="Estimated row memory savings"]')!;
    expect(comparison.textContent).toContain('0%');
    component.search('no matching record here');
    await frames();
    fixture.detectChanges();
    expect(component.estimatedRowMemorySavings).toBeNull();
    expect(root.querySelector('footer')).toBeNull();
    fixture.destroy();
    expect(adapter.init).toBeFalse();
  });

  it('calculates the estimate exactly and withholds unavailable or stale comparisons', () => {
    const component = fixture.componentInstance;
    expect(component.estimatedRowMemorySavings).toBeNull();
    component.status = 'ready';
    component.matchCount = 100000;
    component.metrics = { generation: component.generation, label: 'Start', firstRowMs: 5, renderedRows: 10 };
    expect(component.estimatedRowMemorySavings).toBeCloseTo(99.99, 8);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    component.matchCount = 10;
    expect(component.estimatedRowMemorySavings).toBe(0);
    component.matchCount = 0;
    expect(component.estimatedRowMemorySavings).toBeNull();
    component.matchCount = 5;
    expect(component.estimatedRowMemorySavings).toBeNull();
    component.matchCount = 100000;
    component.metrics = { ...component.metrics, renderedRows: 0 };
    expect(component.estimatedRowMemorySavings).toBeNull();
    component.metrics = { ...component.metrics, renderedRows: 10, generation: component.generation - 1 };
    expect(component.estimatedRowMemorySavings).toBeNull();
    component.metrics = { ...component.metrics, generation: component.generation };
    for (const status of ['loading', 'querying', 'empty', 'error'] as const) {
      component.status = status;
      expect(component.estimatedRowMemorySavings).toBeNull();
    }
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  });

  it('traverses the actual bundled 100K asset without accumulating rendered rows', async () => {
    const response = await fetch('/assets/lab/records.json');
    expect(response.ok).toBeTrue();
    const records: unknown = await response.json();
    if (!Array.isArray(records)) throw new Error('The bundled JSON must be an array');
    fixture.componentInstance.start();
    http.expectOne('assets/lab/records.json').flush(records);
    await frames();
    fixture.detectChanges();
    const source = fixture.componentInstance.datasource!;
    expect(root.querySelector('[data-record-id="1"]')).not.toBeNull();
    for (const index of [25000, 50000, 75000, 99999, 0]) {
      const result = await source.adapter.reload(index);
      expect(result.success).toBeTrue();
      await frames(4);
      fixture.detectChanges();
      expect(root.querySelector(`[data-record-id="${index + 1}"]`)).not.toBeNull();
      expect(root.querySelectorAll('[data-record-id]').length).toBeLessThan(1000);
      expect(fixture.componentInstance.metrics?.renderedRows)
        .toBe(root.querySelectorAll('[data-record-id]').length);
    }
  });
});
