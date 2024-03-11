import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journey } from '../../interfaces/journey';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Flight } from '../../interfaces/flight';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private journeySubject = new BehaviorSubject<Journey>({} as Journey);
  journey$ = this.journeySubject.asObservable();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getJourneyList(origin: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/${origin}/${destination}`).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = "";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage);
    }));
  }
}
