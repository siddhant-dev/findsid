import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';

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

  it('keeps required, contact-method, and message validation in place', () => {
    expect(component.contactForm.invalid).toBeTrue();
    expect(component.name?.hasError('required')).toBeTrue();
    expect(component.message?.hasError('required')).toBeTrue();
    expect(component.contactForm.hasError('phoneOrEmailRequired')).toBeTrue();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
        'button',
      )?.disabled,
    ).toBeTrue();

    component.message?.setValue('Too short');
    expect(component.message?.hasError('minlength')).toBeTrue();
    component.name?.setValue('Sid');
    component.email?.setValue('sid@example.com');
    component.message?.setValue('A message long enough for this contact form.');
    fixture.detectChanges();

    expect(component.contactForm.valid).toBeTrue();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
        'button',
      )?.disabled,
    ).toBeFalse();
  });
});
