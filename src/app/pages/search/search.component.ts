import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JourneyListComponent } from "../journey-list/journey-list.component";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [JourneyListComponent, ReactiveFormsModule, RouterLink, FormsModule]
})
export class SearchComponent {

  @Output() searchSubmitted = new EventEmitter<any>();

  originR: string = '';
  destinationR: string = '';
  currencyR: string = '';

  origin = ''
  destination = ''
  currency = ''

  submitForm() {
    if (this.origin && this.destination && this.currency) {
      const originInput = this.origin;
      const destinationInput = this.destination;
      const currencyR = this.currency;
      console.log(originInput, destinationInput, currencyR);

      this.searchSubmitted.emit({
        originInput: originInput,
        destinationInput: destinationInput,
        currencyR: currencyR
      });
    }
  }



}
