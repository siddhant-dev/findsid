import { InjectionToken, Type } from '@angular/core';

export type ArticleRouteLoader = () => Promise<Type<unknown>>;
export const ARTICLE_ROUTE_LOADER = new InjectionToken<ArticleRouteLoader>('Article route loader', {
  providedIn: 'root',
  factory: () => () => import('./work-module/work/article-page/article-page.component')
    .then(module => module.ArticlePageComponent),
});
