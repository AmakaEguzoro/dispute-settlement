import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TodaySuccess, TodayTotal, TodayFailed, YesterdayTotal, YesterdaySuccess, YesterdayFailed, ThisWeekTotal, ThisWeekSuccess, ThisWeekFailed, LastWeekTotal, LastWeekSuccess, LastWeekFailed, ThisMonthTotal, ThisMonthSuccess, ThisMonthFailed, LastMonthTotal, LastMonthSuccess, LastMonthFailed, ThisYearTotal, ThisYearSuccess, ThisYearFailed, LastYearTotal, LastYearFailed, LastYearSuccess } from 'app/_models/summary';

@Injectable({
    providedIn: 'root'
})

export class SummaryService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/summary/';

    constructor(private httpClient: HttpClient) { }

    // Today Summary
    getTodayTotal(): Observable<TodayTotal> {
        return this.httpClient.get<TodayTotal>(this.baseUrl + `today/total`);
    }

    getTodaySuccess(): Observable<TodaySuccess> {
        return this.httpClient.get<TodaySuccess>(this.baseUrl + `today/successful`);
    }

    getTodayFailed(): Observable<TodayFailed> {
        return this.httpClient.get<TodayFailed>(this.baseUrl + `today/failed`);
    }

    // Yesterday Summary
    getYesterdayTotal(): Observable<YesterdayTotal> {
        return this.httpClient.get<YesterdayTotal>(this.baseUrl + `yesterday/total`);
    }

    getYesterdaySuccess(): Observable<YesterdaySuccess> {
        return this.httpClient.get<YesterdaySuccess>(this.baseUrl + `yesterday/successful`);
    }

    getYesterdayFailed(): Observable<YesterdayFailed> {
        return this.httpClient.get<YesterdayFailed>(this.baseUrl + `yesterday/failed`);
    }
    // this week
    getThisWeekTotal(): Observable<ThisWeekTotal> {
        return this.httpClient.get<ThisWeekTotal>(this.baseUrl + `weekly/total`);
    }

    getThisWeekSuccess(): Observable<ThisWeekSuccess> {
        return this.httpClient.get<ThisWeekSuccess>(this.baseUrl + `weekly/successful`);
    }

    getThisWeekFailed(): Observable<ThisWeekFailed> {
        return this.httpClient.get<ThisWeekFailed>(this.baseUrl + `weekly/failed`);
    }
    // last week
    getLastWeekTotal(): Observable<LastWeekTotal> {
        return this.httpClient.get<LastWeekTotal>(this.baseUrl + `last/weekly_total`);
    }

    getLastWeekSuccess(): Observable<LastWeekSuccess> {
        return this.httpClient.get<LastWeekSuccess>(this.baseUrl + `last/weekly_successful`);
    }

    getLastWeekFailed(): Observable<LastWeekFailed> {
        return this.httpClient.get<LastWeekFailed>(this.baseUrl + `last/weekly_failed`);
    }
    // this month
    getThisMonthTotal(): Observable<ThisMonthTotal> {
        return this.httpClient.get<ThisMonthTotal>(this.baseUrl + `monthly/total`);
    }

    getThisMonthSuccess(): Observable<ThisMonthSuccess> {
        return this.httpClient.get<ThisMonthSuccess>(this.baseUrl + `monthly/successful`);
    }

    getThisMonthFailed(): Observable<ThisMonthFailed> {
        return this.httpClient.get<ThisMonthFailed>(this.baseUrl + `monthly/failed`);
    }
    // last month
    getLastMonthTotal(): Observable<LastMonthTotal> {
        return this.httpClient.get<LastMonthTotal>(this.baseUrl + `last-month/total`);
    }

    getLastMonthSuccess(): Observable<LastMonthSuccess> {
        return this.httpClient.get<LastMonthSuccess>(this.baseUrl + `last-month/successful`);
    }

    getLastMonthFailed(): Observable<LastMonthFailed> {
        return this.httpClient.get<LastMonthFailed>(this.baseUrl + `last-month/failed`);
    }
    // this year
    getThisYearTotal(): Observable<ThisYearTotal> {
        return this.httpClient.get<ThisYearTotal>(this.baseUrl + `yearly/total`);
    }

    getThisYearSuccess(): Observable<ThisYearSuccess> {
        return this.httpClient.get<ThisYearSuccess>(this.baseUrl + `yearly/successful`);
    }

    getThisYearFailed(): Observable<ThisYearFailed> {
        return this.httpClient.get<ThisYearFailed>(this.baseUrl + `yearly/failed`);
    }
    // Last year
    getLastYearTotal(): Observable<LastYearTotal> {
        return this.httpClient.get<LastYearTotal>(this.baseUrl + `last-year/total`);
    }

    getLastYearSuccess(): Observable<LastYearSuccess> {
        return this.httpClient.get<LastYearSuccess>(this.baseUrl + `last-year/successful`);
    }

    getLastYearFailed(): Observable<LastYearFailed> {
        return this.httpClient.get<LastYearFailed>(this.baseUrl + `last-year/failed`);
    }
}