import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { classifyWebLink } from '../shared/links/link-policy';

@Injectable({ providedIn: 'root' })
export class MetaTagService {
  private generation = 0;
  private readonly homeDescription: string;
  constructor(private readonly meta: Meta, private readonly title: Title) {
    this.homeDescription = meta.getTag('name="description"')?.content ?? '';
  }
  beginPage(): number {
    this.generation++;
    this.removeMetaTags();
    this.title.setTitle('Find Sid');
    return this.generation;
  }
  article(owner: number, article: { title: string; description: string; cover_image: string }): void {
    if (owner !== this.generation) return;
    this.write(article.title, article.description, window.location.href, 'article', article.cover_image);
  }
  release(owner: number): void {
    if (owner === this.generation) this.beginPage();
  }
  home(): void {
    this.beginPage();
    this.write('Find Sid', this.homeDescription, new URL('/', document.baseURI).href, 'website', '');
  }
  private write(title: string, description: string, url: string, type: string, image: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description }, 'name="description"');
    const properties: Record<string, string> = {
      'og:title': title, 'og:description': description, 'og:type': type, 'og:url': url,
      'twitter:title': title, 'twitter:description': description, 'twitter:card': 'summary',
    };
    const safeImage = classifyWebLink(image)?.href;
    if (safeImage) {
      properties['og:image'] = safeImage;
      properties['twitter:image'] = safeImage;
      properties['twitter:card'] = 'summary_large_image';
    } else {
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('property="twitter:image"');
    }
    for (const [property, content] of Object.entries(properties)) {
      this.meta.updateTag({ property, content }, `property="${property}"`);
    }
  }
  removeMetaTags(): void {
    this.meta.removeTag('name="description"');
    for (const property of ['og:description', 'og:title', 'og:type', 'og:url', 'og:image',
      'twitter:title', 'twitter:description', 'twitter:image', 'twitter:card', 'twitter:image:src']) {
      this.meta.removeTag(`property="${property}"`);
    }
  }
}
