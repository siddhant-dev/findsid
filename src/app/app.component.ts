import { CommonModule, ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FeatherIconsModule,
  ],
})
export class AppComponent {
  navbarOpen = false;
  menuIcon = 'menu';
  theme: boolean = false;
  @ViewChild('skipper', { static: false }) skipper!: ElementRef;

  constructor(
    private view: ViewportScroller,
    private themeService: ThemeService,
  ) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.theme = true;
      this.onThemeChange();
    } else {
      this.theme = false;
      this.onThemeChange();
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if (this.navbarOpen) {
      this.menuIcon = 'x';
    } else {
      this.menuIcon = 'menu';
    }
    this.skipContent();
  }

  skipContent() {
    this.skipper.nativeElement.focus();
    this.view.scrollToAnchor('main');
  }

  onThemeChange() {
    this.themeService.setTheme(this.theme);
  }
}
