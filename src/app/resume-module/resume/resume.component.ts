import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { FeatherIconsModule } from '../../feather-icons/feather-icons.module';
import { MetaTagService } from '../../services/meta-tag.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [FeatherIconsModule],
})
export class ResumeComponent implements OnInit, OnDestroy {
  url = environment.resumeURL;
  constructor(
    private meta: Meta,
    private metaTag: MetaTagService,
  ) {}

  ngOnInit(): void {
    this.meta.removeTag('name="description"');
    this.addTags();
  }

  ngOnDestroy(): void {
    this.metaTag.removeMetaTags();
  }

  addTags() {
    this.meta.addTag({
      name: 'description',
      content: "Siddant Jaiswal's resume",
    });
    this.meta.addTag({ property: 'og:title', content: 'Resume' });
    this.meta.addTag({
      property: 'og:description',
      content: "Siddant Jaiswal's resume",
    });
    this.meta.addTag({
      property: 'og:image',
      content: '../../assets/favicon.ico',
    });
    this.meta.addTag({ property: 'og:url', content: window.location.href });
    this.meta.addTag({ property: 'twitter:title', content: 'Resume' });
    this.meta.addTag({
      property: 'twitter:description',
      content: "Siddant Jaiswal's resume",
    });
    this.meta.addTag({
      property: 'twitter:image',
      content: '../../assets/favicon.ico',
    });
  }
}
