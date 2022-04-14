import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { CardComponent } from './work/card/card.component';
import { ArticlesComponent } from './work/articles/articles.component';
import { AppsComponent } from './work/apps/apps.component';
import { ArtComponent } from './work/art/art.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticlePageComponent } from './work/article-page/article-page.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import { ThemeService } from './services/theme.service';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WorkComponent,
    CardComponent,
    ArticlesComponent,
    AppsComponent,
    ArtComponent,
    ArticlePageComponent,
    ResumeComponent,
    ContactComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatherIconsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OverlayModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot()
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
