import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  navbarOpen = false;
  menuIcon = 'menu';

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    if(this.navbarOpen) {
      this.menuIcon = 'x';
    } else {
      this.menuIcon = 'menu';
    }
  }
}
