import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
  inject,
  effect,
} from '@angular/core';
import { AsyncPipe, CommonModule, ViewportScroller } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { SectionNavigationCoordinator } from './home/section-navigation';
import { APP_VERSION } from './generated/app-version';
import { ExternalLinksDirective } from './shared/links/external-links.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    FeatherIconsModule,
    ExternalLinksDirective,
  ],
})
export class AppComponent implements OnDestroy {
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

  private identityContent = viewChild<ElementRef<HTMLElement>>('identityContent');
  private resizeObserver?: ResizeObserver;
  private destroyed = false;

  constructor() {
    effect(() =>  {
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
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.updateStickyState);
    document.fonts?.removeEventListener('loadingdone', this.updateStickyState);
  }

  selectSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    void this.navigation.select(id);
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
