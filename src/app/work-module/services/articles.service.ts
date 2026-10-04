import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleDetail, ArticlePage, Articles } from '../models/dev.model';
import { Card, cardTags, optionalText } from '../models/card.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { classifyWebLink } from '../../shared/links/link-policy';

export class ArticleNotFoundError extends Error {}

export function articleCard(source: Articles): Card {
  if (!source.title.trim()) throw new Error('Card title must be nonblank');
  return {
    id: source.id,
    kind: 'article',
    title: source.title,
    description: optionalText(source.description, 'Description'),
    publishedDate: optionalText(source.published_date, 'Publication date'),
    tags: cardTags(source.tags),
    destination:
      typeof source.id === 'number' &&
      Number.isSafeInteger(source.id) &&
      source.id > 0
        ? `/work/articles/${source.id}`
        : undefined,
  };
}

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  readonly devURL = 'https://dev.to/api/articles';
  readonly userName = 'siddev';

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
  ) {}

  getPage(page: number): Observable<ArticlePage> {
    if (!Number.isSafeInteger(page) || page < 1) {
      throw new Error('Article page must be a positive safe integer');
    }
    return this.http
      .get<unknown>(
        `${this.devURL}?username=${this.userName}&page=${page}&per_page=10`,
      )
      .pipe(
        map((data) => {
          if (!Array.isArray(data))
            throw new Error('Article feed must be an array');
          const records: ArticlePage['records'][number][] = [];
          for (const value of data) {
            try {
              if (
                !value ||
                typeof value !== 'object' ||
                !('user' in value) ||
                !value.user ||
                typeof value.user !== 'object' ||
                !('username' in value.user) ||
                value.user.username !== this.userName
              ) {
                throw new Error('Article owner must be siddev');
              }
              const source = this.readArticle(value);
              const publicationInstant = ['published_at', 'published_timestamp']
                .map((field) => Reflect.get(value, field))
                .map((timestamp) =>
                  typeof timestamp === 'string' && timestamp.trim()
                    ? Date.parse(timestamp)
                    : NaN,
                )
                .find(Number.isFinite);
              if (publicationInstant === undefined) source.published_date = '';
              records.push({ source, publicationInstant });
            } catch (error) {
              const id =
                value && typeof value === 'object'
                  ? Reflect.get(value, 'id')
                  : undefined;
              console.warn(
                'Article record rejected:',
                error instanceof Error ? error.message : 'Invalid record',
                typeof id === 'number' && Number.isSafeInteger(id) && id > 0
                  ? `ID ${id}`
                  : 'No valid ID',
              );
            }
          }
          return { rawCount: data.length, records };
        }),
        catchError(this.handleError),
      );
  }

  getArticleById(id: number): Observable<ArticleDetail> {
    if (!Number.isSafeInteger(id) || id <= 0)
      return throwError(() => new ArticleNotFoundError('Invalid article ID'));
    return this.http.get<unknown>(`${this.devURL}/${id}`).pipe(
      map((data) => {
        if (!data || typeof data !== 'object')
          throw new Error('Article detail must be an object');
        if (!('id' in data) || data.id !== id)
          throw new Error('Article identity must match the request');
        const owner = Reflect.get(data, 'user');
        if (
          !owner ||
          typeof owner !== 'object' ||
          Reflect.get(owner, 'username') !== this.userName
        ) {
          throw new ArticleNotFoundError('Article owner does not match');
        }
        const text = (field: string): string | undefined => {
          const value = Reflect.get(data, field);
          return typeof value === 'string' ? value : undefined;
        };
        const article = this.readArticle({
          ...data,
          description: text('description'),
          readable_publish_date: text('readable_publish_date'),
          social_image: text('social_image'),
          tag_list: this.readDetailTags(data),
        });
        const raw = Reflect.get(data, 'body_html');
        if (typeof raw !== 'string' || !raw.trim())
          throw new Error('Article body must be nonblank HTML text');
        const body =
          this.domSanitizer.sanitize(SecurityContext.HTML, raw) ?? '';
        const parsed = document.createElement('template');
        parsed.innerHTML = body;
        if (
          !parsed.content.textContent?.trim() &&
          !parsed.content.querySelector('img[src]')
        ) {
          throw new Error('Sanitized article body contains no usable content');
        }
        const time = Reflect.get(data, 'reading_time_minutes');
        const timestamp = ['published_at', 'published_timestamp']
          .map((field) => Reflect.get(data, field))
          .map((value) =>
            typeof value === 'string' && value.trim() ? Date.parse(value) : NaN,
          )
          .find(Number.isFinite);
        return {
          ...article,
          id,
          ownerUsername: 'siddev' as const,
          body_html: body,
          published_date: timestamp === undefined ? '' : article.published_date,
          cover_image: classifyWebLink(article.cover_image)?.href ?? '',
          sourceUrl: classifyWebLink(Reflect.get(data, 'url'))?.href,
          readingTimeMinutes:
            typeof time === 'number' && Number.isFinite(time) && time > 0
              ? time
              : undefined,
        };
      }),
      catchError(this.handleError),
    );
  }

  private readDetailTags(data: object): readonly string[] {
    const tags = Reflect.get(data, 'tags');
    if (tags !== null && tags !== undefined) return cardTags(tags);
    const tagList = Reflect.get(data, 'tag_list');
    return cardTags(
      typeof tagList === 'string'
        ? tagList.split(',').map((tag) => tag.trim())
        : tagList,
    );
  }

  private readArticle(data: unknown): Articles {
    if (
      !data ||
      typeof data !== 'object' ||
      !('title' in data) ||
      typeof data.title !== 'string' ||
      !data.title.trim()
    ) {
      throw new Error('Article title must be nonblank text');
    }
    const field = (name: string): unknown =>
      name in data ? Reflect.get(data, name) : undefined;
    const id = field('id');
    return {
      id:
        typeof id === 'number' && Number.isSafeInteger(id) && id > 0
          ? id
          : undefined,
      title: data.title,
      typeOf: 'article',
      description: optionalText(field('description'), 'Description') ?? '',
      published_date:
        optionalText(field('readable_publish_date'), 'Publication date') ?? '',
      cover_image: optionalText(field('social_image'), 'Detail image') ?? '',
      tags: cardTags(field('tag_list')),
    };
  }

  private handleError(error: unknown): Observable<never> {
    console.error('Article request failed:', error);
    return throwError(() => error);
  }
}
