import { Component, Input } from '@angular/core';
import { Flight } from '../../interfaces/flight';

@Component({
  selector: 'app-journey-item',
  standalone: true,
  imports: [],
  templateUrl: './journey-item.component.html',
  styleUrl: './journey-item.component.css'
})
export class JourneyItemComponent {
  //@Input() journeyInfo!: Journey;
  @Input() journeyInfo!: Flight;
}
