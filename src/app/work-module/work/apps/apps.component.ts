import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Card, CardClass } from '../../models/card.model';
import { AppService } from '../../services/app.service';
import { MetaTagService } from '../../../services/meta-tag.service';
import { CardComponent } from '../card/card.component';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CardComponent, LoaderComponent],
})
export class AppsComponent implements OnInit, OnDestroy {
  constructor(
    private appService: AppService,
    private meta: Meta,
    private metaTag: MetaTagService,
  ) {}

  apps: Card[] = [];
  error: string = '';
  sub!: Subscription;
  showSpinner: boolean = true;

  ngOnInit(): void {
    this.meta.removeTag('name="description"');
    this.sub = this.appService.getApps().subscribe({
      next: (data: Card[]) => {
        this.apps = data;
        this.addTags();
        this.showSpinner = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.toString();
        this.showSpinner = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.apps.length) {
      this.apps.forEach(() => {
        this.metaTag.removeMetaTags();
      });
    }
  }

  addTags() {
    this.apps.forEach((app) => {
      this.meta.addTag({ name: 'description', content: app.description });
      this.meta.addTag({ property: 'og:title', content: app.title });
      this.meta.addTag({
        property: 'og:description',
        content: app.description,
      });
      this.meta.addTag({ property: 'og:image', content: app.cover_image });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'twitter:title', content: app.title });
      this.meta.addTag({
        property: 'twitter:description',
        content: app.description,
      });
      this.meta.addTag({ property: 'twitter:image', content: app.cover_image });
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
    } else {
      errMsg = `Backend returned code ${err.status}`;
    }
    return errMsg;
  }
}
