import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('type') typewritter!: ElementRef<HTMLElement>;
  i: number = 0;
  j: number = 1;
  reverse: boolean = false;
  text = ['Siddhant Jaiswal', 'a Developer', 'a Designer', 'an Illustrator']

  constructor() { }

  ngOnInit(): void {

    setInterval(() => {
      this.typing();
    }, 150);
  }


  typing() {
    let nowText = this.text[this.i];
    this.typewritter.nativeElement.innerHTML = nowText.substring(0, this.j);

    // reverse direction (erase) if reached end of text
    if (this.j == nowText.length + 5) {
      this.reverse = true;
    }

    this.j += this.reverse ? -2 : 1;

    // reset j and go forward (type) if reached beginning
    if (this.j <= 0) {
      this.j = 1;
      this.reverse = false;
      this.i++;
    }

    // reached end of list, start over
    if (this.i == this.text.length) {
      this.i = 0;
    }

  }
}
