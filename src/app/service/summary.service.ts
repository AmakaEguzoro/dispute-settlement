import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TodaySuccess, TodayTotal, TodayFailed, YesterdayTotal, YesterdaySuccess, YesterdayFailed, ThisWeekTotal, ThisWeekSuccess, ThisWeekFailed, LastWeekTotal, LastWeekSuccess, LastWeekFailed, ThisMonthTotal, ThisMonthSuccess, ThisMonthFailed, LastMonthTotal, LastMonthSuccess, LastMonthFailed, ThisYearTotal, ThisYearSuccess, ThisYearFailed, LastYearTotal, LastYearFailed, LastYearSuccess } from 'app/_models/summary';

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
        return this.httpClient.get<TodayTotal>(this.baseUrl + `today/total`, httpOptions);
    }

    getTodaySuccess(): Observable<TodaySuccess> {
        return this.httpClient.get<TodaySuccess>(this.baseUrl + `today/successful`, httpOptions);
    }

    getTodayFailed(): Observable<TodayFailed> {
        return this.httpClient.get<TodayFailed>(this.baseUrl + `today/failed`, httpOptions);
    }

    // Yesterday Summary
    getYesterdayTotal(): Observable<YesterdayTotal> {
        return this.httpClient.get<YesterdayTotal>(this.baseUrl + `yesterday/total`, httpOptions);
    }

    getYesterdaySuccess(): Observable<YesterdaySuccess> {
        return this.httpClient.get<YesterdaySuccess>(this.baseUrl + `yesterday/successful`, httpOptions);
    }

    getYesterdayFailed(): Observable<YesterdayFailed> {
        return this.httpClient.get<YesterdayFailed>(this.baseUrl + `yesterday/failed`, httpOptions);
    }
    // this week
    getThisWeekTotal(): Observable<ThisWeekTotal> {
        return this.httpClient.get<ThisWeekTotal>(this.baseUrl + `yesterday/total`, httpOptions);
    }

    getThisWeekSuccess(): Observable<ThisWeekSuccess> {
        return this.httpClient.get<ThisWeekSuccess>(this.baseUrl + `weekly/successful`, httpOptions);
    }

    getThisWeekFailed(): Observable<ThisWeekFailed> {
        return this.httpClient.get<ThisWeekFailed>(this.baseUrl + `weekly/failed`, httpOptions);
    }
    // last week
    getLastWeekTotal(): Observable<LastWeekTotal> {
        return this.httpClient.get<LastWeekTotal>(this.baseUrl + `yesterday/total`, httpOptions);
    }

    getLastWeekSuccess(): Observable<LastWeekSuccess> {
        return this.httpClient.get<LastWeekSuccess>(this.baseUrl + `last/weekly_successful`, httpOptions);
    }

    getLastWeekFailed(): Observable<LastWeekFailed> {
        return this.httpClient.get<LastWeekFailed>(this.baseUrl + `last/weekly_failed`, httpOptions);
    }
    // this month
    getThisMonthTotal(): Observable<ThisMonthTotal> {
        return this.httpClient.get<ThisMonthTotal>(this.baseUrl + `monthly/total`, httpOptions);
    }

    getThisMonthSuccess(): Observable<ThisMonthSuccess> {
        return this.httpClient.get<ThisMonthSuccess>(this.baseUrl + `monthly/successful`, httpOptions);
    }

    getThisMonthFailed(): Observable<ThisMonthFailed> {
        return this.httpClient.get<ThisMonthFailed>(this.baseUrl + `monthly/failed`, httpOptions);
    }
    // last month
    getLastMonthTotal(): Observable<LastMonthTotal> {
        return this.httpClient.get<LastMonthTotal>(this.baseUrl + `last-month/total`, httpOptions);
    }

    getLastMonthSuccess(): Observable<LastMonthSuccess> {
        return this.httpClient.get<LastMonthSuccess>(this.baseUrl + `last-month/successful`, httpOptions);
    }

    getLastMonthFailed(): Observable<LastMonthFailed> {
        return this.httpClient.get<LastMonthFailed>(this.baseUrl + `last-month/failed`, httpOptions);
    }
    // this year
    getThisYearTotal(): Observable<ThisYearTotal> {
        return this.httpClient.get<ThisYearTotal>(this.baseUrl + `yearly/total`, httpOptions);
    }

    getThisYearSuccess(): Observable<ThisYearSuccess> {
        return this.httpClient.get<ThisYearSuccess>(this.baseUrl + `yearly/successful`, httpOptions);
    }

    getThisYearFailed(): Observable<ThisYearFailed> {
        return this.httpClient.get<ThisYearFailed>(this.baseUrl + `yearly/failed`, httpOptions);
    }
    // Last year
    getLastYearTotal(): Observable<LastYearTotal> {
        return this.httpClient.get<LastYearTotal>(this.baseUrl + `last-year/total`, httpOptions);
    }

    getLastYearSuccess(): Observable<LastYearSuccess> {
        return this.httpClient.get<LastYearSuccess>(this.baseUrl + `last-year/successful`, httpOptions);
    }

    getLastYearFailed(): Observable<LastYearFailed> {
        return this.httpClient.get<LastYearFailed>(this.baseUrl + `last-year/failed`, httpOptions);
    }
}