import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { WorkComponent } from './work.component';

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render only Articles and Apps tabs', () => {
    const tabs = fixture.nativeElement.querySelectorAll('[role="tab"]') as NodeListOf<HTMLAnchorElement>;
    expect(Array.from(tabs, (tab) => tab.textContent?.trim())).toEqual(['Articles', 'Apps']);
    expect(Array.from(tabs, (tab) => tab.getAttribute('href'))).toEqual(['/articles', '/apps']);
    expect(fixture.nativeElement.querySelector('#tab-art')).toBeNull();
  });

  it('should wrap arrow navigation between the two remaining tabs', () => {
    const tabs = component.tabs.map((tab) => tab.nativeElement as HTMLAnchorElement);
    const clicks = tabs.map((tab) => spyOn(tab, 'click'));
    component.activatePanel(0);

    for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft']) {
      const expectedIndex = component.focused === 0 ? 1 : 0;
      component.handleKeyUp(new KeyboardEvent('keyup', { key }));
      expect(component.focused).toBe(expectedIndex);
      expect(component.activated).toBe(expectedIndex);
      expect(document.activeElement).toBe(tabs[expectedIndex]);
      expect(tabs[expectedIndex].tabIndex).toBe(0);
      expect(tabs[1 - expectedIndex].tabIndex).toBe(-1);
      expect(clicks[expectedIndex]).toHaveBeenCalled();
    }
  });

  it('should focus the first and last tabs with Home and End without activating them', () => {
    component.activatePanel(0);
    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
    expect(component.focused).toBe(1);
    expect(document.activeElement).toBe(component.tabs[1].nativeElement);
    expect(component.activated).toBe(0);

    component.handleKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(component.focused).toBe(0);
    expect(document.activeElement).toBe(component.tabs[0].nativeElement);
    expect(component.activated).toBe(0);
  });
});
