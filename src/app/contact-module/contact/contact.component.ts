import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { MetaTagService } from '../../services/meta-tag.service';
import { Overlay, OverlayConfig,OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm!: FormGroup
  sub!: Subscription;
  @ViewChild('template') tpl!: TemplateRef<unknown>;
  overlayRef!: OverlayRef;
  title:string = 'Thank you!';
  src!: string;
  body!: string;
  error!: string;
  head!: ElementRef;
  options!: AnimationOptions;
  

  constructor(private fb: FormBuilder, private contact: ContactService, private overlay: Overlay,
     private viewContainerRef: ViewContainerRef, private meta: Meta, private metaTag: MetaTagService) { }

  ngOnInit(): void {
    this.meta.removeTag('name="description"');
    this.addTags();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), 
                    Validators.minLength(10), Validators.maxLength(15)]],
      message: ['', [Validators.required, Validators.minLength(25)]]

    }, {
      validators: this.phoneOrEmailRequired('email', 'phone')
    });
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    this.metaTag.removeMetaTags();
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
    this.openWithTemplate();
    this.sub = this.contact.sendEmail(this.contactForm.value).subscribe(
      {
        next: (data:any) => {
          this.contactForm.reset();
          this.error = data.success;
          if(this.error === 'true') {
            this.title = 'Thank you!';
            this.body = 'Your message has been sent. I will get back to you soon.';
            this.options = {path:'https://assets2.lottiefiles.com/packages/lf20_rzwlshcq.json'};
          }
          else {
            this.title = 'Error!';
            this.body = 'Something went wrong. Please try again later.';
            this.options = {path:'https://assets6.lottiefiles.com/packages/lf20_pcguxrto.json'};

          }
        },
        error: (err: any) => {
          console.log(err);
          this.title = 'Error!';
          this.body = err;
          this.error = 'false';
          this.options = {path:'https://assets6.lottiefiles.com/packages/lf20_pcguxrto.json'};
        }
    });
  }

  addTags() {
    this.meta.addTag({ name: 'description', content: 'Connect With Siddhant Jaiswal' });
    this.meta.addTag({ property: 'og:title', content: 'Connect With Siddhant Jaiswal' });
    this.meta.addTag({ property: 'og:description', content: 'Connect With Siddhant Jaiswal' });
    this.meta.addTag({ property: 'og:image', content: '../../assets/favicon.ico' });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({ property: 'twitter:title', content: 'Connect With Siddhant Jaiswal' });
    this.meta.addTag({ property: 'twitter:description', content: 'Contact me' });
    this.meta.addTag({ property: 'twitter:image', content: '../../assets/favicon.ico' });
  }

  openWithTemplate() {
    // this.body = 'Your message has been sent. I will get back to you soon.';
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'active'],
      backdropClass: 'modal-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(new TemplatePortal(this.tpl, this.viewContainerRef)); 

  }

  closeModal(){
    this.overlayRef.dispose();
  }

  handleKey(event: KeyboardEvent) {
    if(event.key === 'Escape' || event.key === 'Enter') {
      this.closeModal();
    }
  }

}
