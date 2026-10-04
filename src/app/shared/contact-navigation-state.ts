import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactNavigationState {
  readonly pending = signal(false);
  readonly open = signal(false);
  origin?: HTMLElement;
  close: (explicit: boolean) => void = () => { throw new Error('Contact modal is not mounted'); };
}
