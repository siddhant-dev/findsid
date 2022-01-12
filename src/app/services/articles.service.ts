import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articles } from '../models/dev.model';
import { map, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  devURL: string = 'https://dev.to/api/articles';
  userName: string = 'siddev';

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  getAllArticles(): Observable<Articles[]> {
    return this.http.get<Articles[]>(`${this.devURL}?username=${this.userName}`).pipe(map((data: any) => {
      return data.map((article: any) => {
        return {
          id: article.id,
          title: article.title,
          typeOf: 'article',
          description: article.description,
          published_date: article.readable_publish_date,
          cover_image: article.social_image,
          tag: article.tag_list[0]
        }
      })
    }));
  }

  getArticleById(id: number): Observable<Articles> {
    return this.http.get<Articles>(`${this.devURL}/${id}`).pipe(map((data: any) => {
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        typeOf: 'article',
        published_date: data.readable_publish_date,
        cover_image: data.social_image,
        tag: data.tag_list[0],
        body_html: this.domSanitizer.bypassSecurityTrustHtml( data.body_html.toString() )
      }
    }));
  }
}
