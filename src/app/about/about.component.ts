import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class AboutComponent {
  @Input() embedded = false;
}
