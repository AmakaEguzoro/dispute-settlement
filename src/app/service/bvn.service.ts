import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BvnLoginService } from 'app/service/bvn-login.service'

@Injectable({
  providedIn: 'root'
})
export class BvnService {

  bvn_login: any;
  bvnParams: any;
  Token: string;
  private baseUrl = 'http://197.253.19.75:9090/bvn/other-parties-single';

  constructor(private http: HttpClient) {
    this.createForm(this.bvnParams, this.Token);
   }

  createForm(bvn: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': token });
    return this.http.post<any>(this.baseUrl, bvn, { headers: headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      )
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

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
      
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

//}
