import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { JourneyListComponent } from '../../journey-list/journey-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SearchComponent, JourneyListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  originInput: string = '';
  destinationInput: string = '';
  currencyR: string = '';

  onSearchSubmitted(event: any) {
    this.originInput = event.originInput;
    this.destinationInput = event.destinationInput;
    this.currencyR = event.currencyR;
    console.log(event.originInput, event.destinationInput, event.currencyR);
  }

}
