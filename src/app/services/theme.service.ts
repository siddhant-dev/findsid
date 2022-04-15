import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private readonly style: HTMLLinkElement;

  constructor(private sanitizer: DomSanitizer) {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);
    
   }

  setTheme(theme: boolean) {
    if(theme) {
      console.log(theme)
      this.style.href = 'dark.css';
    } else {
      this.style.href = 'light.css';
    }
    return theme;
  }

}
