import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'work',
    loadChildren: () =>
      import('./work-module/work.routes').then((m) => m.WORK_ROUTES),
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./resume-module/resume/resume.component').then(
        (m) => m.ResumeComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact-module/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
