import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EXPERIENCES } from './experiences.data';

@Component({
  selector: 'app-experiences',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent {
  @Input() embedded = false;
  readonly experiences = EXPERIENCES;
}
