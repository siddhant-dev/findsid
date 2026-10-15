import { Injectable, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, filter, Subscription } from 'rxjs';

export interface SectionPosition {
  id: string;
  top: number;
}

export type SectionNavigationSource = 'initial' | 'selection' | 'history';

export interface NavigationIntent {
  id: string;
  source: SectionNavigationSource;
}

const SECTION_IDS = ['about', 'lab', 'experience', 'articles', 'vault'];
const READING_LINE_TOLERANCE = 1;

@Injectable({ providedIn: 'root' })
export class SectionNavigationCoordinator implements OnDestroy {
  private readonly activeSubject = new BehaviorSubject<string>('about');
  private readonly intentSubject = new BehaviorSubject<NavigationIntent | null>(null);
  readonly activeSection$ = this.activeSubject.asObservable();
  private readonly subscription: Subscription;
  private homeHandler?: (intent: NavigationIntent) => void;
  private currentTrigger: 'imperative' | 'popstate' | 'hashchange' | undefined;
  private hasNavigated = false;
  private requestedSection: string | null = null;
  private appendHandler?: (target: HTMLElement, keyboard: boolean) => void;
  private appendGeneration = 0;
  private modalBackground?: string;
  registerAppendHandler(handler: (target: HTMLElement, keyboard: boolean) => void): Subscription {
    this.appendHandler = handler;
    return new Subscription(() => {
      if (this.appendHandler === handler) {
        this.appendHandler = undefined;
        this.cancelAppendIntent();
      }
    });
  }
  beginAppendIntent(): number { return ++this.appendGeneration; }
  cancelAppendIntent(): void { this.appendGeneration++; }
  completeAppendIntent(token: number, target: HTMLElement, keyboard: boolean): void {
    if (token !== this.appendGeneration) return;
    this.cancelAppendIntent();
    this.appendHandler?.(target, keyboard);
  }

  constructor(private readonly router: Router) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.split(/[?#]/)[0] === '/contact') {
          this.modalBackground ??= this.router.url;
          return;
        }
        this.cancelAppendIntent();
        this.currentTrigger = event.navigationTrigger;
      } else if (event instanceof NavigationEnd) {
        this.handleNavigationEnd(event.urlAfterRedirects);
      }
    });
  }

  select(id: string): Promise<boolean> | void {
    if (!SECTION_IDS.includes(id)) {
      return;
    }
    this.cancelAppendIntent();
    const current = this.router.parseUrl(this.router.url);
    const primary = current.root.children['primary'];
    const onHome = !primary || primary.segments.length === 0;
    this.requestedSection = id;

    if (onHome && current.fragment === id) {
      this.emitIntent({ id, source: 'selection' });
      return;
    }
    return this.router.navigateByUrl(this.router.createUrlTree(['/'], { fragment: id }));
  }

  registerHome(handler: (intent: NavigationIntent) => void): Subscription {
    this.homeHandler = handler;
    const current = this.router.parseUrl(this.router.url);
    const primary = current.root.children['primary'];
    if ((!primary || primary.segments.length === 0) && current.fragment) {
      if (SECTION_IDS.includes(current.fragment)) {
        const pending = this.intentSubject.value;
        const intent = pending?.id === current.fragment
          ? pending
          : { id: current.fragment, source: 'initial' as const };
        this.emitIntent(intent);
      }
    }
    return new Subscription(() => {
      if (this.homeHandler === handler) {
        this.homeHandler = undefined;
      }
    });
  }

  setPassiveActiveSection(id: string): void {
    if (!this.requestedSection && SECTION_IDS.includes(id) && this.activeSubject.value !== id) {
      this.activeSubject.next(id);
    }
  }

  finishIntent(id: string): void {
    if (this.requestedSection === id) {
      this.requestedSection = null;
    }
  }

  ngOnDestroy(): void {
    this.cancelAppendIntent();
    this.appendHandler = undefined;
    this.subscription.unsubscribe();
    this.intentSubject.complete();
    this.activeSubject.complete();
  }

  private handleNavigationEnd(url: string): void {
    if (url.split(/[?#]/)[0] === '/contact') return;
    if (this.modalBackground === url) {
      this.modalBackground = undefined;
      this.currentTrigger = undefined;
      return;
    }
    this.modalBackground = undefined;
    const tree = this.router.parseUrl(url);
    const primary = tree.root.children['primary'];
    const onHome = !primary || primary.segments.length === 0;
    if (onHome && tree.fragment && SECTION_IDS.includes(tree.fragment)) {
      const source: SectionNavigationSource = !this.hasNavigated
        ? 'initial'
        : this.currentTrigger === 'popstate'
          ? 'history'
          : 'selection';
      this.requestedSection = tree.fragment;
      this.emitIntent({ id: tree.fragment, source });
    } else if (onHome && tree.fragment) {
      this.requestedSection = null;
      this.activeSubject.next('about');
    } else {
      this.requestedSection = null;
      this.activeSubject.next('about');
    }
    this.hasNavigated = true;
    this.currentTrigger = undefined;
  }

  private emitIntent(intent: NavigationIntent): void {
    this.activeSubject.next(intent.id);
    this.intentSubject.next(intent);
    this.homeHandler?.(intent);
  }
}

export function activeSectionFromPositions(
  positions: SectionPosition[],
  readingLine = 96,
  atDocumentBottom = false,
): string {
  if (positions.length === 0) {
    return 'about';
  }
  if (atDocumentBottom) {
    return positions[positions.length - 1].id;
  }

  let active = positions[0].id;
  for (const position of positions) {
    if (position.top > readingLine + READING_LINE_TOLERANCE) {
      break;
    }
    active = position.id;
  }
  return active;
}

export function shouldPushSectionHistory(
  currentFragment: string | null,
  destination: string,
): boolean {
  return currentFragment !== destination;
}
