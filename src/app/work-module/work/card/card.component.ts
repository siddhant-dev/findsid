import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card.model';
import { classifyWebLink, LinkDestination } from '../../../shared/links/link-policy';

let nextCardId = 0;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
})
export class CardComponent implements OnChanges {
  @Input({ required: true }) card_data!: Card;
  readonly titleId = `blueprint-card-title-${++nextCardId}`;
  destination: LinkDestination | null = null;
  internalRoute?: string;

  ngOnChanges(): void {
    if (!this.card_data.title.trim()) throw new Error('Card title must be nonblank');
    this.destination = classifyWebLink(this.card_data.destination);
    if (this.destination && !this.destination.external) {
      const url = new URL(this.destination.href);
      this.internalRoute = url.pathname + url.search + url.hash;
    } else {
      this.internalRoute = undefined;
    }
  }
}
