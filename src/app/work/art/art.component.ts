import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Insta } from 'src/app/models/insta.model';
import { InstagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss']
})
export class ArtComponent implements OnInit {

  instaPosts!: Insta[];
  sub!: Subscription;

  constructor(private instaService: InstagramService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.sub = this.instaService.getAllPosts().subscribe((data: Insta[]) => {
      this.instaPosts = data;
      console.log(this.instaPosts);
    });
    
    
  }

}
