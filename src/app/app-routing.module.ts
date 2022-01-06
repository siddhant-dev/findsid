import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ArticlesComponent } from './work/articles/articles.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent
  },
  { path: 'work', component: WorkComponent, children: [
    { path: 'articles', component: ArticlesComponent },
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
