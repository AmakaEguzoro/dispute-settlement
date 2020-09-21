import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Register, RegisterB2B, UpdateB2B, RegisterData, RegisterWallet } from 'app/_models/settings';

@Injectable({
    providedIn: 'root'
})

export class SettingsService {

    baseUrlTest = 'http://197.253.19.76:8018/api/v1/';

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

    // App Config test
    getAppConfigTest(): Observable<any> {
        return this.httpClient.get(this.baseUrlTest + 'vas/system/app-settings')
            .pipe(map(response => {
                return response;
            }));
    }

    registerAppConfigTest(newUser: Register) {
        return this.httpClient.post(this.baseUrlTest + 'vas/system/app-settings', newUser);
    }

    deleteAppConfigTest(id) {
        return this.httpClient.delete(this.baseUrlTest + `vas/system/app-settings/delete/${id}`)
            .map(response => {
                return response;
            });
    }

    // B2B CONFIG LIVE
    getB2BConfigLive(): Observable<any> {
        return this.httpClient.get(this.baseUrlLive + 'vas/system/api-credentials')
            .pipe(map(response => {
                return response;
            }));
    }

    registerB2BConfigLive(newB2BUser: RegisterB2B) {
        return this.httpClient.post(this.baseUrlLive + 'vas/system/api-credentials/add', newB2BUser);
    }

    deleteB2BConfigLive(id) {
        return this.httpClient.delete(this.baseUrlLive + `vas/system/api-credentials/${id}`)
            .map(response => {
                return response;
            });
    }
    updateB2BConfigLive(id, updateB2B: UpdateB2B) {
        return this.httpClient
            .put(this.baseUrlLive + `vas/system/api-credentials/${id}`, updateB2B)
            .map(response => {
                return response;
            });
    }
    
    // B2B Config test
    getB2BConfigTest(): Observable<any> {
        return this.httpClient.get(this.baseUrlTest + 'vas/system/api-credentials')
            .pipe(map(response => {
                return response;
            }));
    }

    registerB2BConfigTest(newB2BUser: RegisterB2B) {
        return this.httpClient.post(this.baseUrlTest + 'vas/system/api-credentials/add', newB2BUser);
    }

    deleteB2BConfigTest(id) {
        return this.httpClient.delete(this.baseUrlTest + `vas/system/api-credentials/${id}`)
            .map(response => {
                return response;
            });
    }
    updateB2BConfigTest(id, updateB2B: UpdateB2B) {
        return this.httpClient
            .put(this.baseUrlTest + `vas/system/api-credentials/${id}`, updateB2B)
            .map(response => {
                return response;
            });
    }

    // Data CONFIG LIVE
    getDataConfigLive(): Observable<any> {
        return this.httpClient.get(this.baseUrlLive + 'vas/data/packages')
            .pipe(map(response => {
                return response;
            }));
    }

    registerDataConfigLive(newDataUser: RegisterData) {
        return this.httpClient.post(this.baseUrlLive + 'vas/data/packages', newDataUser);
    }

    deleteDataConfigLive(id) {
        return this.httpClient.delete(this.baseUrlLive + `vas/data/packages/${id}`)
            .map(response => {
                return response;
            });
    }
    updateDataConfigLive(id, updateData: RegisterData) {
        return this.httpClient
            .put(this.baseUrlLive + `vas/data/packages/${id}`, updateData)
            .map(response => {
                return response;
            });
    }
    
    // Data Config test
    getDataConfigTest(): Observable<any> {
        return this.httpClient.get(this.baseUrlTest + 'vas/data/packages')
            .pipe(map(response => {
                return response;
            }));
    }

    registerDataConfigTest(newDataUser: RegisterData) {
        return this.httpClient.post(this.baseUrlTest + 'vas/data/packages', newDataUser);
    }

    deleteDataConfigTest(id) {
        return this.httpClient.delete(this.baseUrlTest + `vas/data/packages/${id}`)
            .map(response => {
                return response;
            });
    }
    updateDataConfigTest(id, updateData: RegisterData) {
        return this.httpClient
            .put(this.baseUrlTest + `vas/data/packages/${id}`, updateData)
            .map(response => {
                return response;
            });
    }

    // wallet config live
    registerWalletConfigLive(newWalletUser: RegisterWallet) {
        return this.httpClient.post(this.baseUrlLive + 'vas/system/merchant-settings/create/account', newWalletUser);
    }

      // wallet config test
      registerWalletConfigTest(newWalletUser: RegisterWallet) {
        return this.httpClient.post(this.baseUrlTest + 'vas/system/merchant-settings/create/account', newWalletUser);
    }

}