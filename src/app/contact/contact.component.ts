import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup
  sub!: Subscription;

  constructor(private fb: FormBuilder, private contact: ContactService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), 
                    Validators.minLength(10), Validators.maxLength(15)]],
      message: ['', [Validators.required, Validators.minLength(25)]]

    }, {
      validator: this.phoneOrEmailRequired('email', 'phone')
    });
  }

  phoneOrEmailRequired(ctrl1:any, ctrl2: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.get(ctrl1)?.value;
      const phone = control.get(ctrl2)?.value;

      if(email || phone) {
        return null;
      }
      return {phoneOrEmailRequired: true};
    }
  }


  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get message() {
    return this.contactForm.get('message');
  }

  sendMessage() {
    this.sub = this.contact.sendEmail(this.contactForm.value).subscribe(
      {
        next: (data:any) => {
          console.log(data);
        this.contactForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
