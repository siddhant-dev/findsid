import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, ViewContainerRef,
  OnInit, OnDestroy, AfterViewInit, ElementRef, effect, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { ContactField, ContactSessionService } from '../services/contact-session.service';
import { ContactNavigationState } from '../../shared/contact-navigation-state';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, A11yModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', { nonNullable: true, validators: Validators.email }),
    phone: new FormControl('', { nonNullable: true, validators: [
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),
      Validators.minLength(10), Validators.maxLength(15),
    ] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(25)] }),
  }, { validators: form => form.get('email')?.value || form.get('phone')?.value ? null : { phoneOrEmailRequired: true } });
  @ViewChild('dialog', { static: true }) private template!: TemplateRef<unknown>;
  @ViewChild('stateHeading') private stateHeading?: ElementRef<HTMLElement>;
  @ViewChild('nameInput') private nameInput?: ElementRef<HTMLInputElement>;
  private overlayRef?: OverlayRef;
  private readonly subscriptions = new Subscription();
  private focusFrame = 0;
  private dismissed = false;
  get name() { return this.contactForm.controls.name; }
  get email() { return this.contactForm.controls.email; }
  get phone() { return this.contactForm.controls.phone; }
  get message() { return this.contactForm.controls.message; }
  constructor(readonly session: ContactSessionService, private readonly navigation: ContactNavigationState,
    private readonly overlay: Overlay, private readonly viewContainer: ViewContainerRef,
    private readonly detector: ChangeDetectorRef) {
    effect(() => {
      const state = session.state();
      this.detector.markForCheck();
      if (this.focusFrame) cancelAnimationFrame(this.focusFrame);
      this.focusFrame = requestAnimationFrame(() => {
        this.focusFrame = 0;
        this.detector.detectChanges();
        if (state === 'editing') this.nameInput?.nativeElement.focus();
        else this.stateHeading?.nativeElement.focus();
      });
    });
  }
  ngOnInit(): void {
    this.contactForm.setValue(this.session.draft);
    for (const field of Object.keys(this.session.touched) as ContactField[]) {
      if (this.session.touched[field]) this.contactForm.controls[field].markAsTouched();
    }
    this.subscriptions.add(this.contactForm.valueChanges.subscribe(() => this.saveDraft()));
  }
  ngAfterViewInit(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true, backdropClass: 'contact-backdrop', panelClass: 'contact-overlay-pane',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef.attach(new TemplatePortal(this.template, this.viewContainer));
    this.subscriptions.add(this.overlayRef.backdropClick().subscribe(() => this.close(false)));
    this.subscriptions.add(this.overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') { event.preventDefault(); this.close(false); }
      if (event.key === 'Tab' && this.session.state() === 'sending') {
        event.preventDefault();
        this.stateHeading?.nativeElement.focus();
      }
    }));
  }
  blur(field: ContactField): void {
    this.contactForm.controls[field].markAsTouched();
    this.saveDraft();
  }
  channelDescription(field: 'email' | 'phone'): string | null {
    const control = this.contactForm.controls[field];
    if (!control.touched) return null;
    const ids: string[] = [];
    if (this.contactForm.hasError('phoneOrEmailRequired')) ids.push('contact-channel-error');
    if (control.invalid) ids.push(`contact-${field}-error`);
    return ids.join(' ') || null;
  }
  private saveDraft(): void {
    const touched: Partial<Record<ContactField, boolean>> = {};
    for (const field of ['name', 'email', 'phone', 'message'] as const) touched[field] = this.contactForm.controls[field].touched;
    this.session.update(this.contactForm.getRawValue(), touched);
  }
  sendMessage(): void {
    if (this.dismissed || this.contactForm.invalid || this.session.state() !== 'editing') return;
    this.saveDraft();
    this.session.send(this.contactForm.getRawValue());
  }
  retry(): void {
    if (!this.dismissed) this.session.retry();
  }
  close(explicit: boolean): void {
    if (this.dismissed || this.navigation.pending()) return;
    this.saveDraft();
    this.session.close(explicit);
    this.dismissed = true;
    this.navigation.close(explicit);
  }
  ngOnDestroy(): void {
    if (!this.dismissed) this.saveDraft();
    this.subscriptions.unsubscribe();
    if (this.focusFrame) cancelAnimationFrame(this.focusFrame);
    this.overlayRef?.dispose();
  }
}
