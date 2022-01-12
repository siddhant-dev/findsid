import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { Articles } from 'src/app/models/dev.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card_data!: Card;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigate() {

    if(this.card_data.typeOf === 'article'){
      this.route.navigateByUrl('work/articles/' + this.card_data.id);
    }
      
  }

}
