import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PaymentMethodService {
  baseUrl = environment.api.baseUrl + '/transaction/top5/payment/';

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