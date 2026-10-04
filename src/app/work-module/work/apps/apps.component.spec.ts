import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppsComponent } from './apps.component';
import { AppService } from '../../services/app.service';
import { archiveCard } from '../../models/card.model';

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

  it('preserves all five archive records and adapts single tags without adding labels', () => {
    const records = new AppService().getApps();
    records.subscribe(data => {
      expect(data.map(record => record.title)).toEqual([
        'Authentic Weather App', 'Toonify App', 'Notes App', 'Wedding Invite App', 'Tic Tac Game',
      ]);
      expect(data.map(record => archiveCard(record).tags)).toEqual([
        ['angular'], ['vue'], ['angular'], ['vue'], ['react'],
      ]);
      expect(data.map(record => archiveCard(record).destination)).toEqual([
        'https://authentic-weather.web.app', 'https://toonify-me.web.app/',
        'https://keepit-notes.web.app', 'https://jaiswalswedding.web.app',
        'https://tic-tacgame.web.app/',
      ]);
    });
  });
});
