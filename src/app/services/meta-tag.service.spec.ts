import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTagService } from './meta-tag.service';

describe('Page metadata ownership', () => {
  it('is idempotent and cannot let obsolete cleanup erase a newer owner', () => {
    const service = TestBed.inject(MetaTagService);
    const meta = TestBed.inject(Meta);
    const first = service.beginPage();
    service.article(first, { title: 'First', description: 'First description',
      cover_image: 'https://example.invalid/first.svg' });
    const next = service.beginPage();
    expect(meta.getTag('property="og:image"')).toBeNull();
    const article = { title: 'Current', description: 'Current description',
      cover_image: 'https://example.invalid/current.svg' };
    service.article(next, article);
    service.article(next, article);
    service.article(first, { title: 'Obsolete late write', description: '', cover_image: '' });
    service.release(first);
    expect(TestBed.inject(Title).getTitle()).toContain('Current');
    expect(meta.getTags('property="og:title"').length).toBe(1);
    expect(meta.getTag('property="og:image"')?.content).toBe(article.cover_image);
    service.home();
    service.release(next);
    expect(TestBed.inject(Title).getTitle()).toBe('Find Sid');
    expect(meta.getTag('property="og:image"')).toBeNull();
    expect(meta.getTag('property="og:url"')?.content).toBe(new URL('/', document.baseURI).href);
  });
});
