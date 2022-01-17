import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Card, CardClass } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class AppService implements Resolve<CardClass> {

  constructor(private http: HttpClient) { }
  url = '../../assets/data.json';
  saveData!: CardClass;

  getApps(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url);
  }

  resolve(): Observable<CardClass> {
    if(this.saveData) {
      return of(this.saveData);
    }
    return this.getApps().pipe(map((d: any) => {
      this.saveData = new CardClass(d);
      return new CardClass(d);
    }), catchError((err: any) => {
      return of(new CardClass([], err));
    }));
  }
}
