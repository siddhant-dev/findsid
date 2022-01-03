import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatherIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
