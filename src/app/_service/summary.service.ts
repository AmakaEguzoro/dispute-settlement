import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SummaryService {
    baseUrl = environment.api.baseUrl + '/summary/';

    baseUrlV2 = environment.api.baseUrl + '/transaction/dashboard/';

    constructor(private httpClient: HttpClient) { }

// today Summary
    getToday(): Observable<any[]> {
        let getTodaySuccess = this.httpClient.get(this.baseUrlV2 + `day`);
        let getTodayFailed = this.httpClient.get(this.baseUrlV2 + `yesterday`);
        return forkJoin([getTodaySuccess, getTodayFailed]);
    }


    // this week
    getThisWeek(): Observable<any[]> {
        let getThisWeekSuccess = this.httpClient.get(this.baseUrlV2 + `week`);
        let getThisWeekFailed = this.httpClient.get(this.baseUrlV2 + `last_week`);
        return forkJoin([getThisWeekSuccess, getThisWeekFailed]);
    }

    // this month
    getThisMonth(): Observable<any[]> {
        let getThisMonthSuccess = this.httpClient.get(this.baseUrlV2 + `month`);
        let getThisMonthFailed = this.httpClient.get(this.baseUrlV2 + `last_month`);
        return forkJoin([getThisMonthSuccess, getThisMonthFailed]);
    }

}