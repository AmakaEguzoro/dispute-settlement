import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/';

    constructor(private httpClient: HttpClient) { }

    // today channel
    getTodayChannel(): Observable<any[]> {
        let getPosSuccess = this.httpClient.get(this.baseUrl + `channels/day/POS/successful`);
        let getPosFailed = this.httpClient.get(this.baseUrl + `channels/day/POS/failed`);

        let getWebSuccess = this.httpClient.get(this.baseUrl + `channels/day/WEB/successful`);
        let getWebFailed = this.httpClient.get(this.baseUrl + `channels/day/WEB/failed`);

        let getAndroidSuccess = this.httpClient.get(this.baseUrl + `channels/day/ANDROID/successful`);
        let getAndroidFailed = this.httpClient.get(this.baseUrl + `channels/day/ANDROID/failed`);

        let getAndroidPosSuccess = this.httpClient.get(this.baseUrl + `channels/day/ANDROIDPOS/successful`);
        let getAndroidPosFailed = this.httpClient.get(this.baseUrl + `channels/day/ANDROIDPOS/failed`);

        let getAtmSuccess = this.httpClient.get(this.baseUrl + `channels/day/ATM/successful`);
        let getAtmFailed = this.httpClient.get(this.baseUrl + `channels/day/ATM/failed`);

        let getDefaultSuccess = this.httpClient.get(this.baseUrl + `channels/day/DEFAULT/successful`);
        let getDefaultFailed = this.httpClient.get(this.baseUrl + `channels/day/DEFAULT/failed`);

        let getOthersSuccess = this.httpClient.get(this.baseUrl + `channels/day/OTHERS/successful`);
        let getOthersFailed = this.httpClient.get(this.baseUrl + `channels/day/OTHERS/failed`);

        return forkJoin([getPosSuccess, getPosFailed, getWebSuccess, getWebFailed, getAndroidSuccess,
            getAndroidFailed, getAndroidPosSuccess, getAndroidPosFailed, getAtmSuccess, getAtmFailed, getDefaultSuccess,
            getDefaultFailed, getOthersSuccess, getOthersFailed]);
    }

    // this week channel
    getThisWeekChannel(): Observable<any[]> {
        let getPosSuccess = this.httpClient.get(this.baseUrl + `channels/week/POS/successful`);
        let getPosFailed = this.httpClient.get(this.baseUrl + `channels/week/POS/failed`);

        let getWebSuccess = this.httpClient.get(this.baseUrl + `channels/week/WEB/successful`);
        let getWebFailed = this.httpClient.get(this.baseUrl + `channels/week/WEB/failed`);

        let getAndroidSuccess = this.httpClient.get(this.baseUrl + `channels/week/ANDROID/successful`);
        let getAndroidFailed = this.httpClient.get(this.baseUrl + `channels/week/ANDROID/failed`);

        let getAndroidPosSuccess = this.httpClient.get(this.baseUrl + `channels/week/ANDROIDPOS/successful`);
        let getAndroidPosFailed = this.httpClient.get(this.baseUrl + `channels/week/ANDROIDPOS/failed`);

        let getAtmSuccess = this.httpClient.get(this.baseUrl + `channels/week/ATM/successful`);
        let getAtmFailed = this.httpClient.get(this.baseUrl + `channels/week/ATM/failed`);

        let getDefaultSuccess = this.httpClient.get(this.baseUrl + `channels/week/DEFAULT/successful`);
        let getDefaultFailed = this.httpClient.get(this.baseUrl + `channels/week/DEFAULT/failed`);

        let getOthersSuccess = this.httpClient.get(this.baseUrl + `channels/week/OTHERS/successful`);
        let getOthersFailed = this.httpClient.get(this.baseUrl + `channels/week/OTHERS/failed`);

        return forkJoin([getPosSuccess, getPosFailed, getWebSuccess, getWebFailed, getAndroidSuccess,
            getAndroidFailed, getAndroidPosSuccess, getAndroidPosFailed, getAtmSuccess, getAtmFailed, getDefaultSuccess,
            getDefaultFailed, getOthersSuccess, getOthersFailed]);
    }

   // this month channel
   getThisMonthChannel(): Observable<any[]> {
    let getPosSuccess = this.httpClient.get(this.baseUrl + `channels/month/POS/successful`);
    let getPosFailed = this.httpClient.get(this.baseUrl + `channels/month/POS/failed`);

    let getWebSuccess = this.httpClient.get(this.baseUrl + `channels/month/WEB/successful`);
    let getWebFailed = this.httpClient.get(this.baseUrl + `channels/month/WEB/failed`);

    let getAndroidSuccess = this.httpClient.get(this.baseUrl + `channels/month/ANDROID/successful`);
    let getAndroidFailed = this.httpClient.get(this.baseUrl + `channels/month/ANDROID/failed`);

    let getAndroidPosSuccess = this.httpClient.get(this.baseUrl + `channels/month/ANDROIDPOS/successful`);
    let getAndroidPosFailed = this.httpClient.get(this.baseUrl + `channels/month/ANDROIDPOS/failed`);

    let getAtmSuccess = this.httpClient.get(this.baseUrl + `channels/month/ATM/successful`);
    let getAtmFailed = this.httpClient.get(this.baseUrl + `channels/month/ATM/failed`);

    let getDefaultSuccess = this.httpClient.get(this.baseUrl + `channels/month/DEFAULT/successful`);
    let getDefaultFailed = this.httpClient.get(this.baseUrl + `channels/month/DEFAULT/failed`);

    let getOthersSuccess = this.httpClient.get(this.baseUrl + `channels/month/OTHERS/successful`);
    let getOthersFailed = this.httpClient.get(this.baseUrl + `channels/month/OTHERS/failed`);

    return forkJoin([getPosSuccess, getPosFailed, getWebSuccess, getWebFailed, getAndroidSuccess,
        getAndroidFailed, getAndroidPosSuccess, getAndroidPosFailed, getAtmSuccess, getAtmFailed, getDefaultSuccess,
        getDefaultFailed, getOthersSuccess, getOthersFailed]);
}

}