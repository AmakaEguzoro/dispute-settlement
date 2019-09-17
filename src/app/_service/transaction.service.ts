import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Transaction } from 'app/_models/transaction';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TransactionService {

    baseUrl = 'http://197.253.19.76:6200/api/v1/transaction/';

    constructor(private httpClient: HttpClient) { }

    getTransaction(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `details`, transaction ).pipe(
            map((response: any) => {
                const transaction = response;
                return transaction;
            }
            ));
    };

    getTransactionSummary(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `details/summary`, transaction ).pipe(
            map((response: any) => {
                const transactionSummary = response;
                return transactionSummary;
            }
            ));
    }

}