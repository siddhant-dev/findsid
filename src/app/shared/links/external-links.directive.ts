import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';
import { classifyWebLink } from './link-policy';

@Directive({ selector: '[appExternalLinks]', standalone: true })
export class ExternalLinksDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly originals = new Map<Element, { target: string | null; rel: string | null }>();
  private observer?: MutationObserver;

  ngAfterViewInit(): void {
    this.annotate();
    this.observer = new MutationObserver(() => this.annotate());
    this.observer.observe(this.host, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['href', 'download'],
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.originals.clear();
  }

  private annotate(): void {
    for (const anchor of this.originals.keys()) {
      if (!this.host.contains(anchor)) this.originals.delete(anchor);
    }
    const anchors = new Set([
      ...this.host.querySelectorAll('a[href]'),
      ...this.originals.keys(),
    ]);
    for (const anchor of anchors) {
      const destination = classifyWebLink(anchor.getAttribute('href'));
      if (destination?.external && !anchor.hasAttribute('download')) {
        if (!this.originals.has(anchor)) {
          this.originals.set(anchor, {
            target: anchor.getAttribute('target'), rel: anchor.getAttribute('rel'),
          });
        }
        anchor.setAttribute('target', '_blank');
        const rel = new Set((anchor.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        anchor.setAttribute('rel', Array.from(rel).join(' '));
      } else {
        const original = this.originals.get(anchor);
        if (original) {
          for (const name of ['target', 'rel'] as const) {
            const value = original[name];
            if (value === null) anchor.removeAttribute(name);
            else anchor.setAttribute(name, value);
          }
          this.originals.delete(anchor);
        }
      }
    }
  }
}
