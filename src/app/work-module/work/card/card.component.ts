import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/card.model';
import { FeatherIconsModule } from '../../../feather-icons/feather-icons.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [FeatherIconsModule],
})
export class CardComponent implements OnInit {
  @Input() card_data!: Card;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  navigate() {
    if (this.card_data.typeOf === 'article') {
      this.route.navigateByUrl('work/articles/' + this.card_data.id);
    } else if (this.card_data.typeOf === 'app') {
      window.open(this.card_data.url, '_blank');
    }
  }
}
