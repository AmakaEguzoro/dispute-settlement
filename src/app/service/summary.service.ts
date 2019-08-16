import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SummaryService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/summary/';

    constructor(private httpClient: HttpClient) { }

// today Summary
    getToday(): Observable<any[]> {
        let getTodaySuccess = this.httpClient.get(this.baseUrl + `day/successful`);
        let getTodayFailed = this.httpClient.get(this.baseUrl + `day/failed`);
        return forkJoin([getTodaySuccess, getTodayFailed]);
    }

    // Yesterday Summary
    getYesterday(): Observable<any[]> {
        let getYesterdaySuccess = this.httpClient.get(this.baseUrl + `yesterday/successful`);
        let getYesterdayFailed = this.httpClient.get(this.baseUrl + `yesterday/failed`);
        return forkJoin([getYesterdaySuccess, getYesterdayFailed]);
    }

    // this week
    getThisWeek(): Observable<any[]> {
        let getThisWeekSuccess = this.httpClient.get(this.baseUrl + `week/successful`);
        let getThisWeekFailed = this.httpClient.get(this.baseUrl + `week/failed`);
        return forkJoin([getThisWeekSuccess, getThisWeekFailed]);
    }

    // last week
    getLastWeek(): Observable<any[]> {
        let getLastWeekSuccess = this.httpClient.get(this.baseUrl + `last_week/successful`);
        let getLastWeekFailed = this.httpClient.get(this.baseUrl + `last_week/failed`);
        return forkJoin([getLastWeekSuccess, getLastWeekFailed]);
    }

    // this month
    getThisMonth(): Observable<any[]> {
        let getThisMonthSuccess = this.httpClient.get(this.baseUrl + `month/successful`);
        let getThisMonthFailed = this.httpClient.get(this.baseUrl + `month/failed`);
        return forkJoin([getThisMonthSuccess, getThisMonthFailed]);
    }

    // last month
    getLastMonth(): Observable<any[]> {
        let getLastMonthSuccess = this.httpClient.get(this.baseUrl + `last_month/successful`);
        let getLastMonthFailed = this.httpClient.get(this.baseUrl + `last_month/failed`);
        return forkJoin([getLastMonthSuccess, getLastMonthFailed]);
    }
}