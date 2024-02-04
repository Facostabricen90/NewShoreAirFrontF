import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, input } from '@angular/core';
import { JourneyItemComponent } from '../../components/journey-item/journey-item.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { JourneyService } from '../../core/services/journey.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [AsyncPipe, JourneyItemComponent, ErrorMessageComponent, CommonModule, ErrorMessageComponent],
  templateUrl: './journey-list.component.html',
  styleUrl: './journey-list.component.css'
})
export class JourneyListComponent {

  @Input() OriginR: any | null;
  @Input() DestinationR: any | null;
  @Input() currencyR: any | null;
  public errorMessage!: string;

  public journeyResult$!: any;

  constructor(private service: JourneyService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['OriginR'] || changes['DestinationR'] || changes['currencyR']) {
      this.datos();
    }
  }
  datos() {
   this.journeyResult$ = this.service.getJourneyList(this.OriginR, this.DestinationR).pipe(catchError((error: string) =>{
    if (error == "Error code: 500, message: Http failure response for http://localhost:5038/null/null: 500 Internal Server Error" || error == "Failed to load resource: the server responded with a status of 500 (Internal Server Error)") {
      this.errorMessage = "";
      return EMPTY;
    } else {
      this.errorMessage = "Unable to find a flight to the specified route";
      return EMPTY;
    }
  }));
  }

  stringifyObj(obj: any): string {
    let json = JSON.stringify(obj);
    console.log(obj);
    return json;
  }

  getOrigin(item: any): any {
    return item.origin;
  }

  getDestination(item: any): any {
    return item.destination;
  }

  getFlights(item: any): any {
    return item.flights;
  }

  getTransport(item: any): any {
    return item.transport;
  }

  getTransportNumber(item: any): any {
    return item.flightNumber;
  }

  getTransportCarrier(item: any): any {
    return item.flightCarrier;
  }

  getPrice(item: any): any {
    if (this.currencyR == "CO") {
      return "$ " + (item.price * 5000);
    }else if (this.currencyR == "USD"){
      return "$ " + item.price;
    } else {
      return "€ " + (item.price * 0.91);
    }
  }
}
