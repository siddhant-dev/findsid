import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Datasource, UiScrollModule } from 'ngx-ui-scroll';
import { SkeletonComponent } from 'boneyard-js/angular';
import { snapshotBones, SkeletonResult } from 'boneyard-js';

@Component({
  standalone: true,
  imports: [UiScrollModule, SkeletonComponent],
  template: `
    <div class="viewport" style="height:400px;max-height:60vh;overflow:auto">
      <div *uiScroll="let row of datasource" class="smoke-row">
        <p>{{ row }}</p><p>A wrapped description for a dynamically measured row.</p>
      </div>
    </div>
    <boneyard-skeleton [loading]="true" [initialBones]="bones" color="var(--text-muted)"
      darkColor="var(--text-muted)" animate="solid" [stagger]="false" [transition]="false">
      <p fallback>Representative loading row</p>
    </boneyard-skeleton>
  `,
})
class LibraryFixture {
  bones?: SkeletonResult;
  @ViewChild(SkeletonComponent) skeleton!: SkeletonComponent;
  datasource = new Datasource<string>({
    get: (index: number, count: number) => Promise.resolve(
      Array.from({ length: 100 }, (_, i) => `Record ${i + 1}`)
        .slice(Math.max(0, index), Math.max(0, index + count)),
    ),
    settings: { startIndex: 0, minIndex: 0, maxIndex: 99 },
  });
}

async function frames(count = 10): Promise<void> {
  for (let i = 0; i < count; i++) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
}

describe('Angular 22 library integration', () => {
  it('mounts a bounded dynamic-height list, reloads to its end and resets to empty', async () => {
    await TestBed.configureTestingModule({ imports: [LibraryFixture] }).compileComponents();
    const fixture = TestBed.createComponent(LibraryFixture);
    fixture.detectChanges();
    await frames();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('.smoke-row').length).toBeGreaterThan(0);
    expect(root.querySelectorAll('.smoke-row').length).toBeLessThan(100);
    expect(fixture.componentInstance.datasource.adapter.init).toBeTrue();
    const reload = await fixture.componentInstance.datasource.adapter.reload(99);
    expect(reload.success).toBeTrue();
    await frames();
    expect(root.textContent).toContain('Record 100');
    const reset = await fixture.componentInstance.datasource.adapter.reset({
      get: (_index: number, _count: number) => Promise.resolve([]),
      settings: { startIndex: 0, minIndex: 0, maxIndex: 0 },
    });
    expect(reset.success).toBeTrue();
    await frames();
    expect(root.querySelectorAll('.smoke-row').length).toBe(0);
    fixture.destroy();
    expect(fixture.componentInstance.datasource.adapter.init).toBeFalse();
  });

  it('captures a live skeleton, keeps its palette/static animation and disposes styles', async () => {
    await TestBed.configureTestingModule({ imports: [LibraryFixture] }).compileComponents();
    const fixture = TestBed.createComponent(LibraryFixture);
    fixture.detectChanges();
    const skeleton = fixture.componentInstance.skeleton;
    const capture = snapshotBones(skeleton.containerRef.nativeElement, 'lab-loading');
    expect(capture.bones.length).toBeGreaterThan(0);
    fixture.componentInstance.bones = capture;
    fixture.detectChanges();
    expect(skeleton.resolvedColor).toBe('var(--text-muted)');
    expect(skeleton.animationStyle).toBe('solid');
    expect(skeleton.staggerMs).toBe(0);
    expect(skeleton.transitionMs).toBe(0);
    const uid = skeleton.uid;
    fixture.destroy();
    expect(document.querySelector(`[data-boneyard-keyframes="${uid}"]`)).toBeNull();
  });
});
