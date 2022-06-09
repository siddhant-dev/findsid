import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent
  },
  {
    path: 'work', loadChildren: () => import('./work-module/work-module.module').then(m => m.WorkModuleModule)
  },
  {
    path: 'resume', loadChildren: ()=> import('./resume-module/resume-module.module').then(m => m.ResumeModuleModule)
  },
  {
    path: 'contact', loadChildren: ()=> import('./contact-module/contact-module.module').then(m => m.ContactModuleModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
