import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleRouteComponent } from './article-route.component';

export const APP_ROUTES: Routes = [
  {
    path: 'work/articles/:id',
    data: { layout: 'reading' },
    component: ArticleRouteComponent,
  },
  {
    path: 'work',
    pathMatch: 'full',
    redirectTo: () => inject(Router).parseUrl('/#articles'),
  },
  {
    path: 'work',
    children: [
      {
        path: 'articles',
        pathMatch: 'full',
        redirectTo: () => inject(Router).parseUrl('/#articles'),
      },
      {
        path: 'apps',
        pathMatch: 'full',
        redirectTo: () => inject(Router).parseUrl('/#vault'),
      },
      {
        path: '',
        loadChildren: () =>
          import('./work-module/work.routes').then((module) => module.WORK_ROUTES),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./resume-module/resume/resume.component').then(
        (module) => module.ResumeComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact-module/contact/contact.component').then(
        (module) => module.ContactComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
