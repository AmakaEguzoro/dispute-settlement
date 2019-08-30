import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ModelBvn } from 'app/shared/bvn-status/bvn';
import { BvnLoginService } from 'app/service/bvn-login.service'
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BvnService {

  bvn_login: any;
  private baseUrl = 'http://197.253.19.75:9090/bvn/other-parties-single';

  constructor(private http: HttpClient, private bvnLogin: BvnLoginService) { }


  createForm(bvn: FormGroup): Observable<ModelBvn> {

    this.bvn_login = this.bvnLogin.loginPath();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': this.bvn_login });
    return this.http.post<ModelBvn>(this.baseUrl, bvn, { headers: headers })
      .pipe(
        map(data => data),
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
