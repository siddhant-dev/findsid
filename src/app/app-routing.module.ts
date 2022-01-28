import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';
import { AppService } from './services/app.service';
import { AppsComponent } from './work/apps/apps.component';
import { ArtComponent } from './work/art/art.component';
import { ArticlePageComponent } from './work/article-page/article-page.component';
import { ArticlesComponent } from './work/articles/articles.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent
  },
  { 
    path: 'work', component: WorkComponent, children: [
      { path: 'articles', component: ArticlesComponent},
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      { path: 'apps', component: AppsComponent },
      { path: 'art', component: ArtComponent },
      { path: 'articles/:id', component: ArticlePageComponent }
    ]
  },
  {
    path: 'resume', component: ResumeComponent
  },
  {
    path: 'contact', component: ContactComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
