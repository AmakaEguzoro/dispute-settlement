import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PaymentMethodService {
  baseUrl = ' http://197.253.19.76:6200/api/v1/transaction/top5/payment/';

  constructor(private httpClient: HttpClient) { }

  // today payments-method
  getPaymentMethod(date): Observable<any> {
    return this.httpClient.get(this.baseUrl + `${date}`).pipe(
      map(response => { 
       return response;
      })
    );
  }

}