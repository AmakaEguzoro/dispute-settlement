import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class McashService {

  mcashForm__new: any;

  private base_Url = 'http://mcash.itexpay.com/mcash/terminal/map';

  constructor(private http: HttpClient) {
    //////
  }

  createFormMcash(mcashny): Observable<any> {
    this.mcashForm__new = {
      "merchantCode": mcashny.merchantCode ,
      "terminalId": mcashny.terminalId,
      "merchantName": mcashny.merchantName,
      "terminalBank": mcashny.terminalBank, 
      "status": "active",
    }

    return this.http.post<any>(this.base_Url, this.mcashForm__new)
      .pipe(
        map(data => {
         // console.log("Mcash Response " + this.mcashForm__new);
          return data;
        }),
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
