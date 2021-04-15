import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NqrserviceService {

  constructor(private httpClient: HttpClient) {}
  nqrOnboardUrl = "http://197.253.19.76:8019/api/v1/vas/nqr/onboard/create";
    nqrHistoryUrl = "http://197.253.19.76:8019/api/v1/vas/nqr/agent/list";
nqrVerifyUrl ="http://197.253.19.76:8019/api/v1/vas/nqr/onboard/validate/"
bulknqrOnboardUrl = "http://197.253.19.76:8019/api/v1/vas/nqr/onboard/create/bulk";
merchantnqrOnboardUrl = "http://197.253.19.76:8019/api/v1/vas/nqr/ptsp/onboard";
merchantnqrHistoryUrl = "http://197.253.19.76:8019/api/v1/vas/nqr/ptsp/list";

  VerifyAccount(id){
     return this.httpClient.get(`${this.nqrVerifyUrl}${id}`);
  }

  createSubMerchant(data) {
        return this.httpClient.post(this.nqrOnboardUrl,data).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }
    bulkcreateSubMerchant(data) {
        return this.httpClient.post(this.bulknqrOnboardUrl,data).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }
   bulkcreateMerchant(data) {
        return this.httpClient.post(this.merchantnqrOnboardUrl,data).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }
   
  getHistory(perPage= 50, page) {
    return this.httpClient.get(
      `${this.nqrHistoryUrl}?perPage=${perPage}&page=${page}`
    );
  }
    getMerchantHistory(perPage= 50, page) {
    return this.httpClient.get(
      `${this.merchantnqrHistoryUrl}?perPage=${perPage}&page=${page}`
    );
  }
}
