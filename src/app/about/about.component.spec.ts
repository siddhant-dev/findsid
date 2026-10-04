import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(window, 'setInterval').and.returnValue(0);
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clears its typing interval when destroyed', () => {
    const clearInterval = spyOn(window, 'clearInterval');

    fixture.destroy();

    expect(clearInterval).toHaveBeenCalledWith(0);
  });
});
