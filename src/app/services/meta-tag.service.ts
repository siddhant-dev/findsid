import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {

  constructor(private meta: Meta) { }


  removeMetaTags() {
    this.meta.removeTag('property="description"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="twitter:title"');
    this.meta.removeTag('property="twitter:description"');
    this.meta.removeTag('property="twitter:image"');
    this.meta.removeTag('property="twitter:card"');
    this.meta.removeTag('property="twitter:image:src"');
  }
}
