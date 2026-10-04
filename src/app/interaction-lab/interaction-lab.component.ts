import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VirtualScrollDemoComponent } from './virtual-scroll/virtual-scroll-demo.component';

@Component({
  selector: 'app-interaction-lab',
  standalone: true,
  imports: [VirtualScrollDemoComponent],
  templateUrl: './interaction-lab.component.html',
  styleUrls: ['./interaction-lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class InteractionLabComponent {
  @Input() embedded = false;
}
