import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    params = params.append('fields', 'id,media_url,media_type,caption');
    params = params.append('access_token', this.access_token);
    
    return this.http.get<Insta[]>(this.url, { params }).pipe(map((d: any) => {
      let post = d.data;
      return post.map((post: any) => {
        return {
          id: post.id,
          media_url: post.media_url,
          media_type: post.media_type,
          caption: post.caption
        }
      })
    }), catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(err);
      errMsg = err.error.error.message.toString();
    }
    return throwError(()=>errMsg);
  }
  
}
