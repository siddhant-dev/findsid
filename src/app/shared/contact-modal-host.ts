import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  InjectionToken, OnDestroy, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CanDeactivateFn, DefaultUrlSerializer, NavigationCancel, NavigationError, Router, UrlSerializer, UrlHandlingStrategy, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { ContactNavigationState } from './contact-navigation-state';
import { retryableModuleLoader } from './retryable-module-loader';

export const CONTACT_MODAL_LOADER = new InjectionToken('Contact modal loader', {
  providedIn: 'root',
  factory: () => {
    const load = retryableModuleLoader(() => import('../contact-module/contact/contact.component'));
    return (retry = false) => load(retry).then(module => module.ContactComponent);
  },
});

export class ContactUrlSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    return tree.root.children['contact'] ? '/contact' : super.serialize(tree);
  }
}

export class ContactUrlHandlingStrategy implements UrlHandlingStrategy {
  private readonly serializer = inject(UrlSerializer);
  private readonly state = inject(ContactNavigationState);
  private background = '/';
  shouldProcessUrl(): boolean { return true; }
  extract(url: UrlTree): UrlTree {
    const publicUrl = this.serializer.serialize(url);
    if (publicUrl.split(/[?#]/)[0] !== '/contact') {
      if (!this.state.pending()) this.background = publicUrl;
      return url;
    }
    const tree = this.serializer.parse(this.background);
    const modal = new UrlSegmentGroup([new UrlSegment('contact', {})], {});
    modal.parent = tree.root;
    tree.root.children['contact'] = modal;
    return tree;
  }
  merge(processed: UrlTree): UrlTree {
    return processed.root.children['contact'] ? this.serializer.parse('/contact') : processed;
  }
}

export const CONTACT_ROUTING_PROVIDERS = [
  { provide: UrlSerializer, useClass: ContactUrlSerializer },
  { provide: UrlHandlingStrategy, useClass: ContactUrlHandlingStrategy },
];
export const contactCanDeactivate: CanDeactivateFn<ContactModalHost> = () => !inject(ContactNavigationState).pending();

@Component({
  selector: 'app-contact-modal-host',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ng-container #host />
    @if (state !== 'ready') {
      <dialog #boundary class="contact-code-dialog" aria-labelledby="contact-code-title"
        (cancel)="cancel($event)" (click)="backdrop($event)">
        <h2 id="contact-code-title" class="content-title" tabindex="-1">
          {{ state === 'error' ? "Contact couldn't be loaded." : 'Loading Contact' }}
        </h2>
        @if (state === 'error') {
          <p class="body-text error-text" role="alert">Please try again.</p>
          <button type="button" class="blueprint-button" (click)="retry()">Retry</button>
        } @else { <p class="body-text muted-text" role="status">Loading Contact</p> }
        <button type="button" class="blueprint-button" (click)="dismiss()">Close</button>
      </dialog>
    }
  `,
  styles: [`
    .contact-code-dialog { box-sizing: border-box; width: min(32rem, calc(100vw - 2rem));
      max-height: calc(100dvh - 2rem); overflow: auto; padding: 1.5rem;
      border: 1px solid var(--border-color); border-radius: 4px;
      color: var(--text-main); background: var(--bg-secondary); }
    .contact-code-dialog[open] { display: flex; flex-direction: column; gap: 1.5rem; }
    .contact-code-dialog::backdrop { background: var(--modal-backdrop); }
    p { margin: 0; } button { align-self: flex-start; }
  `],
})
export class ContactModalHost implements AfterViewInit, OnDestroy {
  @ViewChild('host', { read: ViewContainerRef, static: true }) private host!: ViewContainerRef;
  @ViewChild('boundary') private boundary?: ElementRef<HTMLDialogElement>;
  state: 'loading' | 'ready' | 'error' = 'loading';
  private readonly load = inject(CONTACT_MODAL_LOADER);
  private readonly detector = inject(ChangeDetectorRef);
  private readonly navigation = inject(ContactNavigationState);
  private readonly router = inject(Router);
  private dismissing = false;
  private readonly routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationCancel || event instanceof NavigationError) this.dismissing = false;
  });
  private generation = 0;
  private destroyed = false;
  private readonly closeHandler = () => this.dismiss();
  ngAfterViewInit(): void {
    this.navigation.open.set(true);
    this.navigation.close = this.closeHandler;
    this.boundary?.nativeElement.showModal();
    this.activate();
  }
  retry(): void {
    if (this.state !== 'error') return;
    this.state = 'loading';
    this.activate(true);
  }
  cancel(event: Event): void { event.preventDefault(); this.dismiss(); }
  backdrop(event: MouseEvent): void {
    if (event.target !== this.boundary?.nativeElement) return;
    const rect = this.boundary.nativeElement.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.dismiss();
  }
  dismiss(): void {
    if (this.navigation.pending() || this.destroyed || this.dismissing) return;
    this.dismissing = true;
    const context = history.state;
    const currentPage = context?.['ɵrouterPageId'];
    if (context?.contactModal === true && typeof context.contactOriginPage === 'number' &&
      currentPage === context.contactOriginPage + 1) {
      history.back();
    } else {
      void this.router.navigateByUrl(context?.contactBackground ?? '/', { replaceUrl: true });
    }
  }
  private activate(retry = false): void {
    const generation = ++this.generation;
    void this.load(retry).then(component => {
      if (this.destroyed || generation !== this.generation) return;
      this.boundary?.nativeElement.close();
      this.state = 'ready';
      this.host.createComponent(component);
      this.detector.detectChanges();
    }, error => {
      if (this.destroyed || generation !== this.generation) return;
      console.error('Contact code failed to load:', error instanceof Error ? error.message : 'Unknown code failure');
      this.state = 'error';
      this.detector.detectChanges();
      this.boundary?.nativeElement.querySelector<HTMLElement>('h2')?.focus();
    });
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    this.routerSubscription.unsubscribe();
    this.generation++;
    this.boundary?.nativeElement.close();
    this.navigation.open.set(false);
    if (this.navigation.close === this.closeHandler) {
      this.navigation.close = () => { throw new Error('Contact modal is not mounted'); };
    }
    requestAnimationFrame(() => {
      const origin = this.navigation.origin;
      (origin?.isConnected ? origin : document.getElementById('main'))?.focus({ preventScroll: true });
    });
  }
}
