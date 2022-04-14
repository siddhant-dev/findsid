import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  navbarOpen = false;
  menuIcon = 'menu';
  theme: boolean = false;
  @ViewChild('skipper', {static: false}) skipper!: ElementRef;

  constructor (private view: ViewportScroller, private themeService: ThemeService){}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if(this.navbarOpen) {
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

  onThemeChange( ) {
    this.themeService.setTheme(this.theme);
    
  }
}
