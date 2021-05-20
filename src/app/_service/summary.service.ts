import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class SummaryService {
    baseUrl = environment.api.baseUrl + '/summary/';
    baseUrl3 = environment.api.baseUrl;

    baseUrlV2 = environment.api.baseUrl + '/transaction/dashboard/';

    constructor(private httpClient: HttpClient) { }

// today Summary
    getToday(): Observable<any[]> {
        let getTodaySuccess = this.httpClient.get(this.baseUrlV2 + `day`);
        let getTodayFailed = this.httpClient.get(this.baseUrlV2 + `yesterday`);
        let getTwoDays = this.httpClient.get(this.baseUrlV2 + `last_two_days`)
        return forkJoin([getTodaySuccess, getTodayFailed,getTwoDays]);
    }


    // this week
    getThisWeek(): Observable<any[]> {
        let getThisWeekSuccess = this.httpClient.get(this.baseUrlV2 + `week`);
        let getThisWeekFailed = this.httpClient.get(this.baseUrlV2 + `last_week`);
        let getTwoWeeks = this.httpClient.get(this.baseUrlV2 + `last_two_weeks`)

        return forkJoin([getThisWeekSuccess, getThisWeekFailed,getTwoWeeks]);
    }

    // this month
    getThisMonth(): Observable<any[]> {
        let getThisMonthSuccess = this.httpClient.get(this.baseUrlV2 + `month`);
        let getThisMonthFailed = this.httpClient.get(this.baseUrlV2 + `last_month`);
        let getTwoMonths = this.httpClient.get(this.baseUrlV2 + `last_two_months`)

        return forkJoin([getThisMonthSuccess, getThisMonthFailed,getTwoMonths]);
    }

    getTodayTimeChart() {
        return this.httpClient.get(`${this.baseUrl3}/transaction/performance/today`).pipe(
            map((response: any) => {
                const transaction = response;
                return transaction;
            }
            ));
    } 
     getThisMonthTimeChart() {
        return this.httpClient.get(`${this.baseUrl3}/transaction/performance/this_year`).pipe(
            map((response: any) => {
                const transaction = response;
                return transaction;
            }
            ));
    }


}