import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SettingsService {
    baseUrl = 'http://197.253.19.76:8019/api/v1/';

    constructor(private httpClient: HttpClient) { }

    getAppConfig(): Observable<any> {
        return this.httpClient.get(this.baseUrl + `vas/system/app-settings`)
        .pipe(map(response => {
            return response;
        }));

    }

}