import { InjectionToken, Type } from '@angular/core';
import { retryableModuleLoader } from './shared/retryable-module-loader';

export type ArticleRouteLoader = (retry?: boolean) => Promise<Type<unknown>>;
export const ARTICLE_ROUTE_LOADER = new InjectionToken<ArticleRouteLoader>(
  'Article route loader',
  {
    providedIn: 'root',
    factory: () => {
      const load = retryableModuleLoader(
        () => import('./work-module/work/article-page/article-page.component'),
      );
      return (retry = false) =>
        load(retry).then((module) => module.ArticlePageComponent);
    },
  },
);
