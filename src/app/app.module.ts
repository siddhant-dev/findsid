import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatherIconsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
