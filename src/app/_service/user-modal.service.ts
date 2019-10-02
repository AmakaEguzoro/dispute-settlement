import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserModalService {
 
  private baseUrl = "http://197.253.19.76:6200/api/v1/users/fetch";

  constructor(private http: HttpClient) { }

  submitModal(editable: any): Observable<string> {
    return this.http.post<any>(this.baseUrl, editable)
      .pipe(
        map(data => {
          console.log("modal response " + JSON.stringify(data));
          return data;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
