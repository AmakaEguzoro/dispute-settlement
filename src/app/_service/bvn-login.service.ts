
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'app/pages/status/bvn-status/bvn-login';

@Injectable({
  providedIn: 'root'
})

export class BvnLoginService {
  obj: User = {
    "email": "phyllis23@vonrueden.org",
    "password": "yourpassword"
  }

  private loginUrl = 'http://197.253.19.75:9090/auth/login';

  constructor(private http: HttpClient) { }

  loginPath(): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ITEX-Signature': '78025355d8b5c734547dcaccd32aec6833995e0ec71a5d11e6528367fcd4029d',
      'ITEX-Nonce': 'ITEXBVN90X4UIOPX987'
    })
    console.log("Bvn Login Service ......");
    return this.http.post<any>(this.loginUrl, {email: this.obj.email, password: this.obj.password}, { headers: headers })
      .pipe(
        map(data => {
          console.log("Bvn Response " + JSON.stringify(data));
          return data;
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
