import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Register } from 'app/_models/settings';

@Injectable({
    providedIn: 'root'
})

export class SettingsService {

    // baseUrlTest = 'http://197.253.19.76:8018/api/v1/';

    baseUrlLive = 'http://197.253.19.76:8019/api/v1/';


    constructor(private httpClient: HttpClient) { }

    //App Config live
    getAppConfigLive(): Observable<any> {
        return this.httpClient.get(this.baseUrlLive + 'vas/system/app-settings')
            .pipe(map(response => {
                return response;
            }));
    }

    registerAppConfigLive(newUser: Register) {
        return this.httpClient.post(this.baseUrlLive + 'vas/system/app-settings', newUser);
    }

    deleteAppConfigLive(id) {
        return this.httpClient.delete(this.baseUrlLive + `vas/system/app-settings/delete/${id}`)
            .map(response => {
                return response;
            });
    }

    //App Config test
    // getAppConfigTest(): Observable<any> {
    //     return this.httpClient.get(this.baseUrlTest + 'vas/system/app-settings')
    //         .pipe(map(response => {
    //             return response;
    //         }));
    // }

    // registerAppConfigTest(newUser: Register) {
    //     return this.httpClient.post(this.baseUrlTest + 'vas/system/app-settings', newUser);
    // }

    // deleteAppConfigTest(id) {
    //     return this.httpClient.delete(this.baseUrlTest + `vas/system/app-settings/delete/${id}`)
    //         .map(response => {
    //             return response;
    //         });
    // }


}