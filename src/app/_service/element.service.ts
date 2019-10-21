import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Element } from '../pages/status/service-status/element';
import { ElementError } from 'app/pages/status/service-status/elementError';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
 
  private multiUrl = 'http://vas.itexapp.com/service/status/multichoice';
  private eedcUrl = 'http://197.253.19.75:8029/service/status/eedc';
  private phedUrl = 'http://197.253.19.75:8029/service/status/phed';
  private transUrl = 'http://197.253.19.75:8029/service/status/transfer';
  private ekedcUrl = 'http://197.253.19.75:8029/service/status/ekedc';
  private ikedcUrl = 'http://197.253.19.75:8029/service/status/ikedc';
  private starUrl = 'http://197.253.19.75:8029/service/status/startimes';
  private ibedcUrl = 'http://197.253.19.75:8029/service/status/ibedc';
  private aedcUrl = 'http://197.253.19.75:8029/service/status/aedc';
  private smileUrl = 'http://197.253.19.75:8029/service/status/smile';
  private mtnUrl = 'http://197.253.19.75:8029/service/status/mtn';
  private gloUrl = 'http://197.253.19.75:8029/service/status/glo';
  private airtelUrl = 'http://197.253.19.75:8029/service/status/airtel';
  private etisalatUrl = 'http://197.253.19.75:8029/service/status/etisalat';


  constructor(private http: HttpClient) { }

  getElements(): Observable<any[] | ElementError> {

    let multichoice = this.http.get<Element[]>(this.multiUrl);
    let eedc = this.http.get<Element[]>(this.eedcUrl);
    let phed = this.http.get<Element[]>(this.phedUrl);
    let transfer = this.http.get<Element[]>(this.transUrl);
    let ekedc = this.http.get<Element[]>(this.ekedcUrl);
    let ikedc = this.http.get<Element[]>(this.ikedcUrl);
    let startimes = this.http.get<Element[]>(this.starUrl);
    let ibedc = this.http.get<Element[]>(this.ibedcUrl);
    let aedc = this.http.get<Element[]>(this.aedcUrl);
    let smile = this.http.get<Element[]>(this.smileUrl);
    let mtn = this.http.get<Element[]>(this.mtnUrl);
    let glo = this.http.get<Element[]>(this.gloUrl);
    let airtel = this.http.get<Element[]>(this.airtelUrl);
    let etisalat = this.http.get<Element[]>(this.etisalatUrl);


    return forkJoin([multichoice, eedc, phed, transfer, mtn, glo, airtel, ekedc, ikedc, startimes, ibedc, aedc, smile, etisalat]).pipe(catchError(err => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<ElementError>{
    let dataError = new ElementError();
    dataError.errornumber  = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);   
  }

//  private handleError(err: HttpErrorResponse) {
//    let errorMessage = '';
//    if (err.error instanceof ErrorEvent) {
//      errorMessage = `An error occurred: ${err.error.message}`;
//    } else {
//      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
//    }
//    console.error(errorMessage);
//    return throwError(errorMessage);
//  }

}
