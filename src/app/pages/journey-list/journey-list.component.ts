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
    });
  }

  getPrice(price: number): string {
    this.currencyResponse = '$' + price;
    if (this.currencyR === 'CO') {
      price *= 5000;
      this.currencyResponse = '$' + price;
    } else if (this.currencyR === 'EUR') {
      price *= 0.91;
      this.currencyResponse = '€' + price;
    }
    return this.currencyResponse;
  }
}
