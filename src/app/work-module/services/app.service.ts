import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArchiveSource } from '../models/card.model';
import apps from '../../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  getApps(): Observable<ArchiveSource[]> {
    return of(apps);
  }
}
