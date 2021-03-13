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
nqrVerifyUrl ="http://197.253.19.76:8019/api/v1/vas/nqr/onboard/validate/"

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
   
}
