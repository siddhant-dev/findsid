import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Insta } from 'src/app/models/insta.model';
import { InstagramService } from 'src/app/services/instagram.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss']
})
export class ArtComponent implements OnInit, OnDestroy {

  instaPosts!: Insta[];
  sub!: Subscription;

  constructor(private instaService: InstagramService, private meta: Meta, private metaTag: MetaTagService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.instaPosts.forEach(() => {
      this.metaTag.removeMetaTags();
    });
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.sub = this.instaService.getAllPosts().subscribe((data: Insta[]) => {
      this.instaPosts = data;
      this.addTags();
    });   
  }

  addTags() {
    this.instaPosts.forEach(post => {
      this.meta.addTag({name: 'description', content: post.caption});
      this.meta.addTag({ property: 'og:description', content: post.caption });
      this.meta.addTag({ property: 'og:title', content: 'Instagram Posts' });
      this.meta.addTag({ property: 'og:type', content: post.media_type });
      this.meta.addTag({ property: 'og:url', content: window.location.href });
      this.meta.addTag({ property: 'og:image', content: post.media_url });
      this.meta.addTag({ property: 'twitter:title', content: 'Instagram Posts' });
      this.meta.addTag({ property: 'twitter:description', content: post.caption });
      this.meta.addTag({ property: 'twitter:image', content: post.media_url });
    });
  }

}
