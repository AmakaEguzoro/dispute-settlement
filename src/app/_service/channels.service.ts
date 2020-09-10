import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {
    baseUrl = environment.api.baseUrl + '/transaction/top5/channel/';

    constructor(private httpClient: HttpClient) { }

    // today channel
    getChannel(date): Observable<any> {

        return this.httpClient.get(this.baseUrl + `${date}`).pipe(map(response => {
            return  response;
        }));
    }

}