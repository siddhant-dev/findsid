import { CommonModule, ViewportScroller } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeatherIconsModule } from './feather-icons/feather-icons.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FeatherIconsModule,
  ],
})
export class AppComponent {
  navbarOpen = false;
  menuIcon = 'menu';
  @ViewChild('skipper', { static: false }) skipper!: ElementRef;

  constructor(private view: ViewportScroller) {}

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
}
