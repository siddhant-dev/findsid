import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Articles } from 'src/app/models/dev.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Articles[] = [];
  articleSub!: Subscription;

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  ngOnDestory() {
    this.articleSub.unsubscribe();
  }

  getAllArticles() {
   this.articleSub = this.articleService.getAllArticles().subscribe((data:Articles[]) => {
      this.articles = data;
    });
  }
}
