import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from 'src/app/models/dev.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  routeSub!: Subscription
  id: number = 0;
  article!: Articles;
  articleSub!: Subscription;

  constructor(private route: ActivatedRoute, private articleService: ArticlesService, private meta: Meta) { }

  ngOnInit(): void {

    window.scrollTo({
      top: 0
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getArticle();

    });


  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.articleSub.unsubscribe();
    this.removeMetaTags();
  }

  getArticle() {
    this.articleSub = this.articleService.getArticleById(this.id).subscribe((data:Articles) => {
      console.log(data);
      this.article = data;
      this.addMetaTags();
    });
  }

  addMetaTags() {
    this.meta.addTag({ property: 'og:description', content: this.article.description });
    this.meta.addTag({ property: 'og:title', content: this.article.title });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({ property: 'og:image', content: this.article.cover_image });
    this.meta.addTag({ property: 'twitter:title', content: this.article.title });
    this.meta.addTag({ property: 'twitter:description', content: this.article.description });
    this.meta.addTag({ property: 'twitter:image', content: this.article.cover_image });
    this.meta.addTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ property: 'twitter:image:src', content: this.article.cover_image });
  }

  removeMetaTags() {
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="twitter:title"');
    this.meta.removeTag('property="twitter:description"');
    this.meta.removeTag('property="twitter:image"');
    this.meta.removeTag('property="twitter:card"');
    this.meta.removeTag('property="twitter:image:src"');

  }

}
