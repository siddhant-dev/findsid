export interface Card {
  readonly id: number | undefined;
  readonly kind: 'article' | 'archive';
  readonly title: string;
  readonly description?: string;
  readonly publishedDate?: string;
  readonly tags: readonly string[];
  readonly destination?: string;
}

export interface ArchiveSource {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly published_date: string;
  readonly cover_image: string;
  readonly tags: readonly string[];
  readonly url?: string;
  readonly external?: boolean;
}

export function optionalText(
  value: unknown,
  field: string,
): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'string') throw new Error(`${field} must be text`);
  return value.trim() ? value : undefined;
}

export function cardTags(value: unknown): readonly string[] {
  if (value === null || value === undefined) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error('Tags must be a list of text labels');
  }
  return value.filter((tag: string) => tag.trim());
}

export function archiveCard(source: ArchiveSource): Card {
  if (!source.title.trim()) throw new Error('Card title must be nonblank');
  return {
    id: source.id,
    kind: 'archive',
    title: source.title,
    description: optionalText(source.description, 'Description'),
    publishedDate: optionalText(source.published_date, 'Publication date'),
    tags: cardTags(source.tags),
    destination: source.url,
  };
}
