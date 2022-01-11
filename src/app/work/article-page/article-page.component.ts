import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from 'src/app/models/dev.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  routeSub!: Subscription
  id: number = 0;
  article!: Articles;

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getArticle();
      

    });

  }

  getArticle() {
    this.articleService.getArticleById(this.id).subscribe((data:Articles) => {
      console.log(data);
      this.article = data;
    });
  }

}
