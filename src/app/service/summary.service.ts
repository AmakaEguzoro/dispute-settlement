import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TodaySuccess, TodayTotal, TodayFailed, YesterdayTotal, YesterdaySuccess, YesterdayFailed } from 'app/_models/summary';

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

// Today Summary
    getTodayTotal(): Observable<TodayTotal> {
        return this.httpClient.get<TodayTotal>(this.baseUrl + `today/total` , httpOptions );
    }

    getTodaySuccess(): Observable<TodaySuccess> {
        return this.httpClient.get<TodaySuccess>(this.baseUrl + `today/successful` , httpOptions );
    }
    
    getTodayFailed(): Observable<TodayFailed> {
        return this.httpClient.get<TodayFailed>(this.baseUrl + `today/failed` , httpOptions );
    }

    // Yesterday Summary
    getYesterdayTotal(): Observable<YesterdayTotal> {
        return this.httpClient.get<YesterdayTotal>(this.baseUrl + `yesterday/total` , httpOptions );
    }

    getYesterdaySuccess(): Observable<YesterdaySuccess> {
        return this.httpClient.get<YesterdaySuccess>(this.baseUrl + `yesterday/successful` , httpOptions );
    }
    
    getYesterdayFailed(): Observable<YesterdayFailed> {
        return this.httpClient.get<YesterdayFailed>(this.baseUrl + `yesterday/failed` , httpOptions );
    }
}