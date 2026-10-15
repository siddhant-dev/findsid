import { Injectable, OnDestroy, signal } from '@angular/core';
import { Contact, ContactDraft } from '../models/contact.model';
import { ContactService } from './contact.service';
import { ContactNavigationState } from '../../shared/contact-navigation-state';
import { Subscription } from 'rxjs';

export type ContactState = 'editing' | 'sending' | 'success' | 'failure';
export type ContactField = 'name' | 'email' | 'phone' | 'message';
@Injectable({ providedIn: 'root' })
export class ContactSessionService implements OnDestroy {
  readonly state = signal<ContactState>('editing');
  draft: ContactDraft = { name: '', email: '', phone: '', message: '' };
  touched: Partial<Record<ContactField, boolean>> = {};
  private submitted?: Readonly<ContactDraft>;
  private request?: Subscription;
  constructor(private readonly service: ContactService, private readonly navigation: ContactNavigationState) {}
  update(draft: Contact, touched: Partial<Record<ContactField, boolean>>): void {
    if (this.state() !== 'editing') return;
    this.draft = { name: draft.name, email: draft.email ?? '', phone: draft.phone ?? '', message: draft.message };
    this.touched = { ...touched };
  }
  send(input: Contact): void {
    if (this.state() !== 'editing') return;
    this.submitted = Object.freeze({ name: input.name, email: input.email ?? '', phone: input.phone ?? '', message: input.message });
    this.draft = { ...this.submitted };
    this.begin();
  }
  retry(): void {
    if (this.state() === 'failure' && this.submitted) this.begin();
  }
  close(explicit: boolean): void {
    if (this.state() === 'sending') return;
    if (explicit && this.state() === 'success') {
      this.draft = { name: '', email: '', phone: '', message: '' };
      this.touched = {};
      this.submitted = undefined;
      this.state.set('editing');
    }
  }
  private begin(): void {
    if (!this.submitted) throw new Error('Contact submission snapshot is missing');
    this.navigation.pending.set(true);
    this.state.set('sending');
    this.request = this.service.sendEmail(this.submitted).subscribe({
      next: () => {
        this.navigation.pending.set(false);
        this.state.set('success');
      },
      error: () => {
        this.navigation.pending.set(false);
        this.state.set('failure');
      },
    });
  }
  ngOnDestroy(): void { this.request?.unsubscribe(); }
}
