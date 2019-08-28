import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ElementError } from 'app/shared/components/service-status/elementError';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  private Url = 'http://vas.itexapp.com/service/status/switch';

  constructor(private http: HttpClient) { }

  switchAction(payload): Observable<any> {
    return this.http.post(this.Url, payload, {
      headers: {
        'Content-Type': 'Application/json'
      }

    }).pipe(catchError(err => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<ElementError> {
    let dataError = new ElementError();
    dataError.errornumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }



}