import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../../models/dev.model';
import { ArticlesService } from '../../services/articles.service';
import { MetaTagService } from '../../../services/meta-tag.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [LoaderComponent],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  routeSub!: Subscription;
  id: number = 0;
  article!: Articles;
  articleSub!: Subscription;
  showSpinner: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private meta: Meta,
    private metaTag: MetaTagService,
  ) {}

  ngOnInit(): void {
    this.meta.removeTag('name="description"');

    window.scrollTo({
      top: 0,
    });

    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getArticle();
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.articleSub.unsubscribe();
    this.metaTag.removeMetaTags();
  }

  getArticle() {
    this.articleSub = this.articleService.getArticleById(this.id).subscribe({
      next: (data: Articles) => {
        this.article = data;
        this.addMetaTags();
        this.showSpinner = false;
      },
      error: (err) => {
        this.error = err.toString();
        this.showSpinner = false;
      },
    });
  }

  addMetaTags() {
    this.meta.addTag({
      name: 'description',
      content: this.article.description,
    });
    this.meta.addTag({
      property: 'og:description',
      content: this.article.description,
    });
    this.meta.addTag({ property: 'og:title', content: this.article.title });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({
      property: 'og:image',
      content: this.article.cover_image,
    });
    this.meta.addTag({
      property: 'twitter:title',
      content: this.article.title,
    });
    this.meta.addTag({
      property: 'twitter:description',
      content: this.article.description,
    });
    this.meta.addTag({
      property: 'twitter:image',
      content: this.article.cover_image,
    });
    this.meta.addTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.addTag({
      property: 'twitter:image:src',
      content: this.article.cover_image,
    });
  }
}
