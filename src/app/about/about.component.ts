import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaTagService } from '../services/meta-tag.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class AboutComponent implements OnInit, OnDestroy {
  @Input() embedded = false;
  @ViewChild('type') typewritter!: ElementRef<HTMLElement>;
  i: number = 0;
  j: number = 1;
  reverse: boolean = false;
  text = ['Siddhant Jaiswal', 'a Developer', 'a Designer', 'an Illustrator'];
  private typingTimer?: number;

  constructor(
    private meta: Meta,
    private metaTag: MetaTagService,
  ) {}

  ngOnInit(): void {
    if (!this.embedded) {
      this.meta.removeTag('name="description"');
    }

    this.typingTimer = window.setInterval(() => {
      this.typing();
    }, 150);
    if (!this.embedded) {
      this.addTags();
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimer !== undefined) {
      window.clearInterval(this.typingTimer);
    }
    if (!this.embedded) {
      this.metaTag.removeMetaTags();
    }
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

  addTags() {
    this.meta.addTag({
      name: 'description',
      content:
        'Siddhant Jaiswal is a UI Developer, Designer and Illustrator. He is a passionate about creating web and mobile applications. He is a self-taught developer and has a knack for learning new technologies.',
    });
    this.meta.addTag({
      property: 'og:description',
      content:
        'Siddhant Jaiswal is a UI Developer, Designer and Illustrator. He is a passionate about creating web and mobile applications. He is a self-taught developer and has a knack for learning new technologies.',
    });
    this.meta.addTag({
      property: 'og:title',
      content: 'Siddhant Jaiswal - UI Developer',
    });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({
      property: 'og:image',
      content: '../../assets/favicon.ico',
    });
    this.meta.addTag({
      property: 'twitter:title',
      content: 'Siddhant Jaiswal - UI Developer',
    });
    this.meta.addTag({
      property: 'twitter:description',
      content:
        'Siddhant Jaiswal is a UI Developer, Designer and Illustrator. He is a passionate about creating web and mobile applications. He is a self-taught developer and has a knack for learning new technologies.',
    });
    this.meta.addTag({
      property: 'twitter:image',
      content: '../../assets/favicon.ico',
    });
  }
}
