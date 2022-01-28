import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  navbarOpen = false;
  menuIcon = 'menu';
  @ViewChild('skipper', {static: false}) skipper!: ElementRef;

  constructor (private view: ViewportScroller){}

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
}
