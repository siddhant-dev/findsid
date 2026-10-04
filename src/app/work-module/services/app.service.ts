import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../models/card.model';
import apps from '../../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  getApps(): Observable<Card[]> {
    return of(apps);
  }
}
