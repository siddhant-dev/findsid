import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkModuleRoutingModule } from './work-module-routing.module';
import { WorkComponent } from './work/work.component';
import { AppsComponent } from './work/apps/apps.component';
import { ArticlePageComponent } from './work/article-page/article-page.component';
import { ArticlesComponent } from './work/articles/articles.component';
import { ArtComponent } from './work/art/art.component';
import { CardComponent } from './work/card/card.component';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    WorkComponent,
    AppsComponent,
    ArticlePageComponent,
    ArticlesComponent,
    ArtComponent,
    CardComponent,
    LoaderComponent
  
  ],
  imports: [
    CommonModule,
    WorkModuleRoutingModule,
    FeatherIconsModule,
  ]
})
export class WorkModuleModule { }
