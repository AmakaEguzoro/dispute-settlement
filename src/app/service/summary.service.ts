import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TodaySuccess, TodayTotal, TodayFailed } from 'app/_models/summary';

const httpOptions = {
     headers: new HttpHeaders({
        'Content-Type': 'application/json'
     })
}

@Injectable({
    providedIn: 'root'
})

export class SummaryService { 
    baseUrl = 'http://197.253.19.76:6200/api/v1/summary/';

    constructor(private httpClient: HttpClient) { }

    getTodayTotal(): Observable<TodayTotal> {
        return this.httpClient.get<TodayTotal>(this.baseUrl + `today/today` , httpOptions );
    }

    getTodaySuccess(): Observable<TodaySuccess> {
        return this.httpClient.get<TodaySuccess>(this.baseUrl + `today/successful` , httpOptions );
    }
    
    getTodayFailed(): Observable<TodayFailed> {
        return this.httpClient.get<TodayFailed>(this.baseUrl + `today/failed` , httpOptions );
    }
}