import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import { ContactModuleRoutingModule } from './contact-module-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactModuleRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FeatherIconsModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
    OverlayModule,
    A11yModule,
  ]
})
export class ContactModuleModule { }
