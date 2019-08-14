// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
// import { ChartService } from './chart.service';
// import { LastWeekChart } from 'app/_models/chart';
// import { map } from 'rxjs/operators';
// import 'automapper-ts';
// import { ChartDataService } from './chart.data.service';


// @Injectable({
//     providedIn: 'root'
// })

// export class ChartWebDataService implements ChartDataService {
//     baseUrl = 'http://197.253.19.76:6200/api/v1/';

//     constructor(private httpClient: HttpClient) { }

//     getLastWeekChart(): Observable<LastWeekChart[]> {
//         const requestUri = this.baseUrl + `last/weekly_total`;

//         return this.httpClient.get(requestUri)
//             .pipe(
//                 map(response => {
//                     automapper
//                         .createMap(LastWeekChart)
//                         .forMember('POS_AMOUNT', function (opts) { opts.mapFrom('POS_AMOUNT'); })
//                         .forMember('WEB_AMOUNT', function (opts) { opts.mapFrom('WEB_AMOUNT'); })
//                         .forMember('ANDROIDPOS_AMOUNT', function (opts) { opts.mapFrom('ANDROIDPOS_AMOUNT'); })
//                         .forMember('ANDROID_AMOUNT', function (opts) { opts.mapFrom('ANDROID_AMOUNT'); })
//                         .forMember('DEFAULT_AMOUNT', function (opts) { opts.mapFrom('DEFAULT_AMOUNT'); });
//                         let data: LastWeekChart[] = automapper.map( LastWeekChart, response);
//                     return data;
//                 })
//             )
//     }
// }