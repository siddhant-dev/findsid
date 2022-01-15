import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  url = '../../assets/data.json';

  getApps(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url);
  }
}
