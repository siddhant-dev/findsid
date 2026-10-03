import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticlesComponent } from './articles.component';
import { ArticlesService } from '../../services/articles.service';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [{ provide: ArticlesService, useValue: { getAllArticles: () => of([]) } }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a controlled empty response without a live article request', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(component.showSpinner).toBeFalse();
    expect(element.querySelector('app-loader')).toBeNull();
    expect(element.querySelector('.error')).toBeNull();
  });
});
