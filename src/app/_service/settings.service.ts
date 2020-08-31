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
    baseUrl = 'http://197.253.19.76:8018/api/v1/';

    constructor(private httpClient: HttpClient) { }

    getAppConfig(): Observable<any> {
        return this.httpClient.get(this.baseUrl + 'vas/system/app-settings')
        .pipe(map(response => {
            return response;
        }));
    }

    register(newUser: Register) {
        return this.httpClient.post(this.baseUrl + 'vas/system/app-settings', newUser);
      }

}