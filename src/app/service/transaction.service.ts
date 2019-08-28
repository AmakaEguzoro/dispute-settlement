import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TransactionService {

    baseUrl = 'http://197.253.19.76:6200/api/v1/transaction/details';

    constructor(private httpClient: HttpClient) { }

    getTransaction(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl);
    }

}