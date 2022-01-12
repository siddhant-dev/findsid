import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insta } from '../models/insta.model';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  url = 'https://graph.instagram.com/me/media';
  access_token = environment.accessKey;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Insta[]> {
    let params = new HttpParams();
    params = params.append('fields', 'id,media_url,media_type');
    params = params.append('access_token', this.access_token);
    
    return this.http.get<Insta[]>(this.url, { params }).pipe(map((d: any) => {
      let post = d.data;
      return post.map((post: any) => {
        return {
          id: post.id,
          media_url: post.media_url,
          media_type: post.media_type
        }
      })
    }));
  }
}
