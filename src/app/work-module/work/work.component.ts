import { AfterViewChecked, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, AfterViewChecked {

  constructor() { }

  @ViewChildren('tabs', {read: ElementRef}) tabElement!: QueryList<ElementRef>;
  tabs: ElementRef[] = [];
  activated = 0;
  focused = 0;

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.tabs = this.tabElement.toArray();
    this.tabElement.first.nativeElement.index = '0';
    this.tabs.forEach(tab => {
      tab.nativeElement.tabIndex = -1
      if(tab.nativeElement.classList.contains('active')){
        tab.nativeElement.tabIndex = 0;
        this.focused = this.tabs.indexOf(tab);
        this.activated = this.tabs.indexOf(tab);
      }
        
    });
  }

  activatePanel(index: number): void {
    this.tabs.forEach(tab => (tab.nativeElement.tabIndex = -1));
    this.tabs[index].nativeElement.tabIndex = 0;
    this.focused = index;
    this.activated = index;
  }

  focusPanel(index: number) {
    this.focused = index;
    this.tabs[this.focused].nativeElement.focus();
  }

  handleKeyUp(event: KeyboardEvent) {
    event.preventDefault();
    let index = 0;
    switch (event.key) {
      case 'ArrowLeft':
        index = this.focused ? this.focused - 1 : this.tabs.length - 1
        this.activatePanel(index);
        this.tabs[index].nativeElement.focus();
        this.tabs[index].nativeElement.click();
        break;
      case 'ArrowRight':
        index = (this.focused + 1) % this.tabs.length;
        this.activatePanel(index);
        this.tabs[index].nativeElement.focus();
        this.tabs[index].nativeElement.click();
        break;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home':
        event.preventDefault();
        this.focusPanel(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusPanel(this.tabElement.length - 1);
        break;
    }
  }

}
