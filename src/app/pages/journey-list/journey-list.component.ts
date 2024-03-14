import { Component, Input, SimpleChanges } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JourneyService } from '../../core/services/journey.service';
import { Flight } from '../../interfaces/flight';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorMessageComponent,
    CommonModule,
    ErrorMessageComponent,
  ],
  templateUrl: './journey-list.component.html',
  styleUrl: './journey-list.component.css',
})
export class JourneyListComponent {
  @Input() OriginR: string = '';
  @Input() DestinationR: string = '';
  @Input() currencyR: string = '';

  public count : number = 1;
  public errorMessage!: string;
  public journeyResult$: Flight[] = [];
  public currencyResponse: string = '';
  totalPrice: number = 0;
  totalPriceFormatted: string = '';

  constructor(private journeyService: JourneyService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.count < 2) {
      this.count ++;
    }else{
      if (changes['OriginR'] || changes['DestinationR'] || changes['currencyR']) {
        this.datos();
      }
    }
  }

  datos() {
    this.journeyService.getJourneyList(this.OriginR, this.DestinationR).pipe(
      catchError((error: any) => {
        if (error.message && error.message.includes('500 Internal Server Error')) {
          this.errorMessage = '';
          return EMPTY;
        } else {
          this.errorMessage = 'Unable to find a flight to the specified route';
          return EMPTY;
        }
      })
    ).subscribe((data: Flight[]) => {
      this.journeyResult$ = data;
      if (data = []) {
        this.errorMessage = 'Unable to find a flight to the specified route';
      }else {
        console.log('Respuesta exitosa de la solicitud HTTP:', data);
      }
      console.log(this.journeyResult$);
      this.calcularTotalPrice();
    });
  }

  calcularTotalPrice() {
    this.totalPrice = this.journeyResult$.reduce((accumulator, currentFlight) => {
      let flightPrice: number = currentFlight.price;

      if (this.currencyR === 'CO') {
        flightPrice *= 5000;
      } else if (this.currencyR === 'EUR') {
        flightPrice *= 0.91;
      }

      return accumulator + flightPrice;
    }, 0);

    if (this.currencyR === 'CO') {
      this.totalPriceFormatted = '$' + this.totalPrice.toFixed(2);
    } else if (this.currencyR === 'EUR') {
      this.totalPriceFormatted = '€' + this.totalPrice.toFixed(2);
    } else {
      this.totalPriceFormatted = '$' + this.totalPrice.toFixed(2);
    }
  }

  getPrice(price: number): string {
    let convertedPrice: number = price;

    if (this.currencyR === 'CO') {
      convertedPrice *= 5000;
    } else if (this.currencyR === 'EUR') {
      convertedPrice *= 0.91;
    }

    const formattedPrice: string = convertedPrice.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (this.currencyR === 'CO') {
      return '$ ' + formattedPrice;
    } else if (this.currencyR === 'EUR') {
      return '€ ' + formattedPrice;
    } else {
      return '$ ' + formattedPrice;
    }
  }
}
