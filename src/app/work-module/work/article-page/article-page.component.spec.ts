import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ArticlePageComponent } from './article-page.component';
import { ArticlesService } from '../../services/articles.service';

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ArticlesService,
          useValue: {
            getArticleById: () =>
              of({
                id: 1,
                title: 'Test article',
                description: 'A controlled article fixture',
                published_date: 'Today',
                cover_image: '',
                tag: 'test',
                typeOf: 'article',
                body_html:
                  '<p>Article content remains readable.</p><pre><code>long code</code></pre>',
              }),
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders controlled article text and keeps code scrolling local', () => {
    const element = fixture.nativeElement as HTMLElement;
    const article = element.querySelector('.full-article') as HTMLElement;
    const code = article.querySelector('pre') as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Test article');
    expect(article.textContent).toContain('Article content remains readable.');
    expect(getComputedStyle(code).overflowX).toBe('auto');
  });
});
