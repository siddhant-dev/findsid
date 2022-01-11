import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/models/dev.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card_data!: Articles;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  openArticle(id: number) {
    this.route.navigateByUrl('/article/' + id);
  }

}
