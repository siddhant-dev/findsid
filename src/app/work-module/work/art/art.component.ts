import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Insta } from '../../models/insta.model';
import { InstagramService } from '../../services/instagram.service';
import { MetaTagService } from '../../../services/meta-tag.service';
import { LoaderComponent } from '../../loader/loader.component';
import { FeatherIconsModule } from '../../../feather-icons/feather-icons.module';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [LoaderComponent, FeatherIconsModule],
})
export class ArtComponent implements OnInit, OnDestroy {
  instaPosts!: Insta[];
  sub!: Subscription;
  showSpinner: boolean = true;
  error: string = '';

  constructor(
    private instaService: InstagramService,
    private meta: Meta,
    private metaTag: MetaTagService,
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.instaPosts.forEach(() => {
      this.metaTag.removeMetaTags();
    });
  }

  ngOnInit(): void {
    this.meta.removeTag('name="description"');
    this.getAllPosts();
  }

  getAllPosts() {
    this.sub = this.instaService.getAllPosts().subscribe({
      next: (data: Insta[]) => {
        this.instaPosts = data.slice(0, 24);
        this.addTags();
        this.showSpinner = false;
      },
      error: (err) => {
        this.error = err.toString();
        this.showSpinner = false;
      },
    });
  }

  addTags() {
    this.instaPosts.forEach((post) => {
      this.meta.addTag({ name: 'description', content: post.caption });
      this.meta.addTag({ property: 'og:description', content: post.caption });
      this.meta.addTag({ property: 'og:title', content: 'Instagram Posts' });
      this.meta.addTag({ property: 'og:type', content: post.media_type });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'og:image', content: post.media_url });
      this.meta.addTag({
        property: 'twitter:title',
        content: 'Instagram Posts',
      });
      this.meta.addTag({
        property: 'twitter:description',
        content: post.caption,
      });
      this.meta.addTag({ property: 'twitter:image', content: post.media_url });
    });
  }
}
