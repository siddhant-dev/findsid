import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Articles } from 'src/app/models/dev.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles: Articles[] = [];
  articleSub!: Subscription;

  constructor(private articleService: ArticlesService, private meta: Meta, private metaTag: MetaTagService) { }

  ngOnInit(): void {
    this.getAllArticles();
    
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.articles.forEach(() => {
      this.metaTag.removeMetaTags();
    })
  }

  getAllArticles() {
   this.articleSub = this.articleService.getAllArticles().subscribe((data:Articles[]) => {
      this.articles = data;
      this.addTags();
    });
  }

  addTags() {
    this.articles.forEach(article => {
      this.meta.addTag({property: 'description', content: article.description});
      this.meta.addTag({ property: 'og:description', content: article.description });
      this.meta.addTag({ property: 'og:title', content: article.title });
      this.meta.addTag({ property: 'og:type', content: 'article' });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'og:image', content: article.cover_image });
      this.meta.addTag({ property: 'twitter:title', content: article.title });
      this.meta.addTag({ property: 'twitter:description', content: article.description });
      this.meta.addTag({ property: 'twitter:image', content: article.cover_image });
    });
  }
}
