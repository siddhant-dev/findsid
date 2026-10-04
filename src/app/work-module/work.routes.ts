import { Routes } from '@angular/router';

export const WORK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./work/work.component').then((m) => m.WorkComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'articles',
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./work/articles/articles.component').then(
            (m) => m.ArticlesComponent,
          ),
      },
      {
        path: 'apps',
        loadComponent: () =>
          import('./work/apps/apps.component').then((m) => m.AppsComponent),
      },
      {
        path: 'articles/:id',
        loadComponent: () =>
          import('./work/article-page/article-page.component').then(
            (m) => m.ArticlePageComponent,
          ),
      },
    ],
  },
];
