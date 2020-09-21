import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Transaction, TransactionLimit } from 'app/_models/transaction';
import { map } from 'rxjs/operators';
import { RemoveLock } from 'app/_models/removeLocks';
import { WalletBalance } from 'app/_models/user';

@Injectable({
    providedIn: 'root'
})

export class TransactionService {

    baseUrl = environment.api.baseUrl + '/transaction/';
    vasRequerybaseUrl = 'http://vas.itexapp.com/api/v1/vas/metadata/update/'

    constructor(private httpClient: HttpClient) { }

    getTransaction(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `details`, transaction).pipe(
            map((response: any) => {
                const transaction = response;
                return transaction;
            }
            ));
    };

    getTransactionSummary(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `details/summary`, transaction).pipe(
            map((response: any) => {
                const transactionSummary = response;
                return transactionSummary;
            }
            ));
    };

    getTransactionReversed(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `reversed`, transaction).pipe(
            map((response: any) => {
                const transactionReversed = response;
                return transactionReversed;
            }
            ));
    };

    getTransactionLocks(transaction: Transaction) {
        return this.httpClient.post(this.baseUrl + `locked`, transaction).pipe(
            map((response: any) => {
                const transactionLocks = response;
                return transactionLocks;
            }
            ));
    };

    removeTransactionLocks(removeLock: RemoveLock) {
        return this.httpClient.post(this.baseUrl + `lock/remove`, removeLock).pipe(
            map((response: any) => {                
                const removeTransactionLocks = response;
                return removeTransactionLocks;
            }
            ));
    }

    getWalletBalance(walletBalance: WalletBalance) {
        return this.httpClient.post(`http://vas.itexapp.com/vas/wallet-balance` , walletBalance).pipe(
          map((response: any) => {
              const walletBalance = response;
              return walletBalance;
          }
          ));
      }

    interfaceWithVasForRequery(reference){
        let response = this.httpClient.get(this.vasRequerybaseUrl + reference);
        return response;
    }

    getTransactionLimits(transactionLimit: TransactionLimit) {
        return this.httpClient.post(`http://vas.itexapp.com/api/v1/wallet/reset-limit`, transactionLimit).pipe(
            map((response: any) => {
                const transactionLimit = response;
                return transactionLimit;
            }
            ));
    };
   
}