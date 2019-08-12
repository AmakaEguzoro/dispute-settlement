import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LastWeekChart } from 'app/_models/chart';

@Injectable({
    providedIn: 'root'
})

export class ChartService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/channels/';

    constructor(private httpClient: HttpClient) { }

    getLastWeekChart(): Observable<LastWeekChart> {
        const data = this.httpClient.get<LastWeekChart>(this.baseUrl + `last/weekly_total`);
        return data;
    }
}