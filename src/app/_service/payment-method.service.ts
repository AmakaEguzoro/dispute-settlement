import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PaymentMethodService{
     baseUrl = 'http://197.253.19.76:6200/api/v1/';

     constructor(private httpClient: HttpClient) { }

     // today payments-method
    getTodayPaymentMethod(): Observable<any[]> {
        let getCARDSuccess = this.httpClient.get(this.baseUrl + `payments/day/CARD/successful`);
        let getCARDFailed = this.httpClient.get(this.baseUrl + `payments/day/CARD/failed`);

        let getMCARDSuccess = this.httpClient.get(this.baseUrl + `payments/day/MCARD/successful`);
        let getMCARDFailed = this.httpClient.get(this.baseUrl + `payments/day/MCARD/failed`);

        let getCASHSuccess = this.httpClient.get(this.baseUrl + `payments/day/CASH/successful`);
        let getCASHFailed = this.httpClient.get(this.baseUrl + `payments/day/CASH/failed`);

        return forkJoin([getCARDSuccess, getCARDFailed, getMCARDSuccess, getMCARDFailed, getCASHSuccess,
            getCASHFailed]);
    }
      // this week payments-method
      getThisWeekPaymentMethod(): Observable<any[]> {
        let getCARDSuccess = this.httpClient.get(this.baseUrl + `payments/week/CARD/successful`);
        let getCARDFailed = this.httpClient.get(this.baseUrl + `payments/week/CARD/failed`);

        let getMCARDSuccess = this.httpClient.get(this.baseUrl + `payments/week/MCARD/successful`);
        let getMCARDFailed = this.httpClient.get(this.baseUrl + `payments/week/MCARD/failed`);

        let getCASHSuccess = this.httpClient.get(this.baseUrl + `payments/week/CASH/successful`);
        let getCASHFailed = this.httpClient.get(this.baseUrl + `payments/week/CASH/failed`);

        return forkJoin([getCARDSuccess, getCARDFailed, getMCARDSuccess, getMCARDFailed, getCASHSuccess,
            getCASHFailed]);
    }

      // this month payment-method
      getThisMonthPaymentMethod(): Observable<any[]> {
        let getCARDSuccess = this.httpClient.get(this.baseUrl + `payments/month/CARD/successful`);
        let getCARDFailed = this.httpClient.get(this.baseUrl + `payments/month/CARD/failed`);

        let getMCARDSuccess = this.httpClient.get(this.baseUrl + `payments/month/MCARD/successful`);
        let getMCARDFailed = this.httpClient.get(this.baseUrl + `payments/month/MCARD/failed`);

        let getCASHSuccess = this.httpClient.get(this.baseUrl + `payments/month/CASH/successful`);
        let getCASHFailed = this.httpClient.get(this.baseUrl + `payments/month/CASH/failed`);

        return forkJoin([getCARDSuccess, getCARDFailed, getMCARDSuccess, getMCARDFailed, getCASHSuccess,
            getCASHFailed]);
    }
}