import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Card, CardClass } from 'src/app/models/card.model';
import { MetaTagService } from 'src/app/services/meta-tag.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private meta: Meta, private metaTag: MetaTagService) { }

  apps: Card[] = [];
  error: string = '';

  ngOnInit(): void {
    const routeData: CardClass = this.route.snapshot.data['apps'];
    if(routeData.err) {
      this.error = this.handleError(routeData.err);
    }
    else {
      this.apps = routeData.card;
      this.addTags();
    }
  }

  ngOnDestroy() {
    if(this.apps.length){
      this.apps.forEach(() => {
        this.metaTag.removeMetaTags();
      })
    }
  }

  addTags() {
    this.apps.forEach(app => {
      this.meta.addTag({ name: 'description', content: app.description });
      this.meta.addTag({ property: 'og:title', content: app.title });
      this.meta.addTag({ property: 'og:description', content: app.description });
      this.meta.addTag({ property: 'og:image', content: app.cover_image });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'twitter:title', content: app.title });
      this.meta.addTag({ property: 'twitter:description', content: app.description });
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
