import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleRouteComponent } from './article-route.component';
import {
  ContactModalHost,
  contactCanDeactivate,
} from './shared/contact-modal-host';

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
          import('./work-module/work.routes').then(
            (module) => module.WORK_ROUTES,
          ),
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact',
    outlet: 'contact',
    component: ContactModalHost,
    canDeactivate: [contactCanDeactivate],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
