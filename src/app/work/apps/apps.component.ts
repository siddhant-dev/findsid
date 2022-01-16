import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { AppService } from 'src/app/services/app.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, OnDestroy {

  constructor(private app: AppService, private meta: Meta, private metaTag: MetaTagService) { }

  apps!: Card[];
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.app.getApps().subscribe(data => {
      this.apps = data;
      this.addTags();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.apps.forEach(() => {
      this.metaTag.removeMetaTags();
    })
  }

  addTags() {
    this.apps.forEach(app => {
      this.meta.addTag({ property: 'description', content: app.description });
      this.meta.addTag({ property: 'og:title', content: app.title });
      this.meta.addTag({ property: 'og:description', content: app.description });
      this.meta.addTag({ property: 'og:image', content: app.cover_image });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'twitter:title', content: app.title });
      this.meta.addTag({ property: 'twitter:description', content: app.description });
      this.meta.addTag({ property: 'twitter:image', content: app.cover_image });
    });
  }

}
