import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
  inject,
  effect,
} from '@angular/core';
import { AsyncPipe, CommonModule, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { SectionNavigationCoordinator } from './home/section-navigation';
import { APP_VERSION } from './generated/app-version';
import { ExternalLinksDirective } from './shared/links/external-links.directive';
import { MetaTagService } from './services/meta-tag.service';
import { ContactNavigationState } from './shared/contact-navigation-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterOutlet,
    FeatherIconsModule,
    ExternalLinksDirective,
  ],
})
export class AppComponent implements OnDestroy {
  readonly contactState = inject(ContactNavigationState);
  readonly sections = [
    { id: 'about', label: '01. About me' },
    { id: 'lab', label: '02. Interaction Lab' },
    { id: 'experience', label: '03. Experiences' },
    { id: 'articles', label: '04. Articles' },
    { id: 'vault', label: '05. Retro Vault' },
  ] as const;
  private readonly navigation = inject(SectionNavigationCoordinator);
  private readonly view  = inject(ViewportScroller);
  readonly appVersion = APP_VERSION;
  readonly activeSection$ = this.navigation.activeSection$;
  stickyDisabled = false;
  readingMode = false;
  private readonly router = inject(Router);
  private readonly routeSubscription: Subscription;
  private readonly metadata = inject(MetaTagService);

  private identityContent = viewChild<ElementRef<HTMLElement>>('identityContent');
  private resizeObserver?: ResizeObserver;
  private destroyed = false;

  constructor() {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let route = this.router.routerState.snapshot.root;
        this.readingMode = false;
        while (route) {
          this.readingMode ||= route.data['layout'] === 'reading';
          if (!route.firstChild) break;
          route = route.firstChild;
        }
        if (event.urlAfterRedirects !== '/contact' && !this.readingMode &&
          this.router.parseUrl(event.urlAfterRedirects).root.children['primary'] === undefined) {
          this.metadata.home();
        }
      }
    });
    effect(() =>  {
      this.resizeObserver?.disconnect();
      this.resizeObserver = undefined;
      this.updateStickyState();
      if (typeof ResizeObserver !== 'undefined' && typeof this.identityContent() !=='undefined') {
        this.resizeObserver = new ResizeObserver(() => this.updateStickyState());
        this.resizeObserver.observe(this.identityContent()!.nativeElement);
      }
      window.addEventListener('resize', this.updateStickyState);
      document.fonts?.addEventListener('loadingdone', this.updateStickyState);
      void document.fonts?.ready.then(() => {
        if (!this.destroyed) {
          this.updateStickyState();
        }
      });
  });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.updateStickyState);
    document.fonts?.removeEventListener('loadingdone', this.updateStickyState);
  }

  selectSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    void this.navigation.select(id);
  }

  openContact(event: MouseEvent): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (this.contactState.open() || this.contactState.pending()) return;
    this.contactState.origin = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    void this.router.navigateByUrl('/contact', { state: {
      contactModal: true, contactBackground: this.router.url,
      contactOriginPage: history.state?.['ɵrouterPageId'] ?? 0,
    } });
  }

  skipContent(event: MouseEvent): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
    this.view.scrollToAnchor('main');
  }

  private readonly updateStickyState = (): void => {
    if (this.identityContent() !== undefined) {
      this.stickyDisabled =
        this.identityContent()!.nativeElement.getBoundingClientRect().height > window.innerHeight;
    }
  };
}
