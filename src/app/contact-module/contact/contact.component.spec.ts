import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';
import { ContactSessionService } from '../services/contact-session.service';
import { ContactNavigationState } from '../../shared/contact-navigation-state';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        {
          provide: ContactService,
          useValue: {
            sendEmail: jasmine
              .createSpy('sendEmail')
              .and.returnValue(of({ success: 'true' })),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => fixture.destroy());

  it('keeps required, contact-method, and message validation in place', () => {
    expect(component.contactForm.invalid).toBeTrue();
    expect(component.name?.hasError('required')).toBeTrue();
    expect(component.message?.hasError('required')).toBeTrue();
    expect(component.contactForm.hasError('phoneOrEmailRequired')).toBeTrue();
    expect(
      document.querySelector<HTMLButtonElement>('.contact-dialog button[type="submit"]')?.disabled,
    ).toBeTrue();

    component.message?.setValue('Too short');
    expect(component.message?.hasError('minlength')).toBeTrue();
    component.name?.setValue('Sid');
    component.email?.setValue('sid@example.com');
    component.message?.setValue('A message long enough for this contact form.');
    fixture.detectChanges();

    expect(component.contactForm.valid).toBeTrue();
    expect(
      document.querySelector<HTMLButtonElement>('.contact-dialog button[type="submit"]')?.disabled,
    ).toBeFalse();
  });

  it('shows errors only after blur and never submits or touches all fields on invalid submit', () => {
    const send = TestBed.inject(ContactService).sendEmail as jasmine.Spy;
    component.email?.setValue('invalid'); component.email?.markAsDirty();
    fixture.detectChanges();
    expect(document.querySelector('.contact-dialog .error-text')).toBeNull();
    component.sendMessage();
    expect(send).not.toHaveBeenCalled();
    expect(component.name?.touched).toBeFalse();
    component.email?.markAsTouched();
    fixture.detectChanges();
    expect(document.querySelector('#contact-email-error')).not.toBeNull();
  });
  it('retains current message and phone boundaries and supports either contact channel', () => {
    component.name?.setValue('Synthetic');
    component.message?.setValue('x'.repeat(24));
    expect(component.message?.invalid).toBeTrue();
    component.message?.setValue('x'.repeat(25));
    component.phone?.setValue('1'.repeat(9)); expect(component.phone?.invalid).toBeTrue();
    component.phone?.setValue('1'.repeat(10)); expect(component.contactForm.valid).toBeTrue();
    component.phone?.setValue('1'.repeat(15)); expect(component.phone?.valid).toBeTrue();
    component.phone?.setValue('1'.repeat(16)); expect(component.phone?.invalid).toBeTrue();
    component.phone?.setValue(''); component.email?.setValue('fixture@example.invalid');
    expect(component.contactForm.valid).toBeTrue();
    component.phone?.setValue('abcdefghij'); expect(component.phone?.invalid).toBeTrue();
  });
  it('restores memory draft and uses one labelled dialog instead of a routed form plus result overlay', () => {
    fixture.destroy();
    TestBed.inject(ContactSessionService).update({
      name: 'Saved synthetic draft', email: '', phone: '', message: '',
    }, { name: true });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.name?.value).toBe('Saved synthetic draft');
    expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]').length).toBe(1);
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain("Let's connect");
    fixture.destroy();
  });
  it('hides the form while pending, blocks dismissal and clears success without restoring stale inputs on destruction', () => {
    const response = new Subject<void>();
    const send = TestBed.inject(ContactService).sendEmail as jasmine.Spy;
    send.and.returnValue(response);
    const navigation = TestBed.inject(ContactNavigationState);
    navigation.close = jasmine.createSpy('modal dismissal');
    component.contactForm.setValue({
      name: 'Synthetic tester', email: 'tester@example.invalid', phone: '',
      message: 'This controlled synthetic message is long enough.',
    });
    component.sendMessage(); fixture.detectChanges();
    expect(document.querySelector('.contact-dialog form')).toBeNull();
    expect(document.querySelector<HTMLButtonElement>('.contact-dialog button')?.disabled).toBeTrue();
    component.close(true);
    expect(navigation.close).not.toHaveBeenCalled();
    expect(send.calls.count()).toBe(1);
    response.next(); fixture.detectChanges();
    component.close(true);
    expect(navigation.close).toHaveBeenCalledOnceWith(true);
    fixture.destroy();
    expect(TestBed.inject(ContactSessionService).draft).toEqual({ name:'',email:'',phone:'',message:'' });
  });
  it('does not leave dangling channel-error descriptions after entering a valid channel', () => {
    component.email.markAsTouched(); fixture.detectChanges();
    expect(document.querySelector('#contact-email')?.getAttribute('aria-describedby')).toBe('contact-channel-error');
    component.email.setValue('fixture@example.invalid'); fixture.detectChanges();
    expect(document.querySelector('#contact-email')?.hasAttribute('aria-describedby')).toBeFalse();
  });
});
