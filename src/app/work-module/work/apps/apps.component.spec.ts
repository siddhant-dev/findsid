import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppsComponent } from './apps.component';
import { AppService } from '../../services/app.service';

describe('AppsComponent', () => {
  let component: AppsComponent;
  let fixture: ComponentFixture<AppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsComponent],
      providers: [{ provide: AppService, useValue: { getApps: () => of([]) } }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders controlled empty data without a network dependency', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(component.showSpinner).toBeFalse();
    expect(element.querySelector('#apps')).not.toBeNull();
    expect(element.querySelector('app-loader')).toBeNull();
  });
});
