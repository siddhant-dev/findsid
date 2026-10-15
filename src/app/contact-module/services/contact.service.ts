import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly formURL = environment.formURL;
  constructor(private readonly http: HttpClient) {}
  sendEmail(data: Readonly<Contact>): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' });
    return this.http.post<unknown>(this.formURL, data, { headers }).pipe(
      map(response => {
        if (!response || typeof response !== 'object' || !('success' in response) || response.success !== 'true') {
          throw new Error('Contact provider did not confirm success');
        }
      }),
      catchError((error: unknown) => {
        console.error('Contact request failed:',
          error instanceof HttpErrorResponse ? `HTTP ${error.status}` : 'Unconfirmed provider response');
        return throwError(() => error);
      }),
    );
  }
}
