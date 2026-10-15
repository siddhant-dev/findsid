import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { ArchiveSource, cardTags, optionalText } from '../models/card.model';

export const ARCHIVE_LOADER = new InjectionToken<() => Promise<unknown>>('Bundled archive loader', {
  providedIn: 'root', factory: () => () => import('../../../assets/data.json').then(module => module.default),
});

export function validateArchive(source: unknown): ArchiveSource[] {
  if (!Array.isArray(source)) throw new Error('Archive collection must be an array');
  const accepted: ArchiveSource[] = [];
  const ids = new Set<number>();
  for (const value of source) {
    try {
      if (!value || typeof value !== 'object' || !('title' in value) ||
        typeof value.title !== 'string' || !value.title.trim()) {
        throw new Error('Project title must be nonblank text');
      }
      const field = (name: string): unknown => Reflect.get(value, name);
      const rawId = field('id');
      const id = typeof rawId === 'number' && Number.isSafeInteger(rawId) && rawId > 0 ? rawId : undefined;
      const record: ArchiveSource = {
        id, title: value.title,
        description: optionalText(field('description'), 'Description') ?? '',
        published_date: optionalText(field('published_date'), 'Publication date') ?? '',
        tags: cardTags(field('tags')),
        cover_image: optionalText(field('cover_image'), 'Source image') ?? '',
        url: typeof field('url') === 'string' ? optionalText(field('url'), 'Destination') : undefined,
      };
      if (id !== undefined && ids.has(id)) {
        console.debug('Duplicate project ignored:', id);
        continue;
      }
      if (id !== undefined) ids.add(id);
      accepted.push(record);
    } catch (error) {
      const id = value && typeof value === 'object' ? Reflect.get(value, 'id') : undefined;
      console.warn('Project record rejected:', error instanceof Error ? error.message : 'Invalid record',
        typeof id === 'number' && Number.isSafeInteger(id) && id > 0 ? `ID ${id}` : 'No valid ID');
    }
  }
  if (source.length && !accepted.length) throw new Error('Archive collection contains no usable projects');
  return accepted;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(@Inject(ARCHIVE_LOADER) private readonly load: () => Promise<unknown>) {}
  getApps(): Observable<ArchiveSource[]> {
    return defer(this.load).pipe(
      map(validateArchive),
      catchError((error: unknown) => {
        console.error('Archive collection failed:', error instanceof Error ? error.message : 'Module import failed');
        return throwError(() => error);
      }),
    );
  }
}
