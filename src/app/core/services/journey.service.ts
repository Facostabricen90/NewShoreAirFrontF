import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journey } from '../../interfaces/journey';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private journeySubject = new BehaviorSubject<Journey>({} as Journey);
  journey$ = this.journeySubject.asObservable();
  constructor(private http: HttpClient) { }

  getJourneyList(origin: any, destination: any): Observable<Journey> {
    return this.http.get<Journey>(`http://localhost:5038/${origin}/${destination}`).pipe(catchError((error: HttpErrorResponse) => {
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
