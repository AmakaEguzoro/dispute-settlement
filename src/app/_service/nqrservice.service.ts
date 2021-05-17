import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as cryptojs from "crypto-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
test_key = 'NGU1ODY3NTZjYmM3M2ViNGU5Nzk3ZjgzYTA4MWNiMWE0Y2JlNTg1OTY0MTFmM2Y1OTIyM2Q5NWRiNzQxNDNiMQ==';
live_key = 'ZmU1NzQ4MDdlNmM5YmU4ZDIyMWE1M2Y0MDc4MGU2MDg1N2I4Y2FjNmFkNTliNWUxMmI1OWQ1ZTJjZjAzMTA3MA=='




  VerifyAccount(id){
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key) 
    }
   let encrypt=btoa(`${this.nqrVerifyUrl}${id}`)
  
    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
     return this.httpClient.get(`${this.nqrVerifyUrl}${id}`);
  }

  createSubMerchant(data) {
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key)
     
    }
  
   
   let encrypt=btoa(this.nqrOnboardUrl)
  
    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
        return this.httpClient.post(this.nqrOnboardUrl,data).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }
    bulkcreateSubMerchant(data) {
      let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key)
     
    }
  
   
   let encrypt=btoa(this.bulknqrOnboardUrl)
  
    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());

   
        return this.httpClient.post(this.bulknqrOnboardUrl,data,
          { headers }).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }


   bulkcreateMerchant(data) {
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key)
     
    }
  
   
   let encrypt=btoa(this.merchantnqrOnboardUrl)
  
    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());

        return this.httpClient.post(this.merchantnqrOnboardUrl,data, { headers }).pipe(
            map((response: any) => {
                const res = response;
                return res;
            }
            ));
    }
   
  getHistory(perPage= 50, page) {
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key)
        
    }
  
    let encrypt=btoa(`${this.nqrHistoryUrl}?page=${page}&perPage=${perPage}`)


    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
    return this.httpClient.get(
      `${this.nqrHistoryUrl}?perPage=${perPage}&page=${page}`,{headers}
    );
  }
exportHistory(){
  let headers = new HttpHeaders();
  function sha1Hmac(value, key) {
    return cryptojs
      .HmacSHA256(value, key)
      
  }

  let encrypt=btoa(`${this.nqrHistoryUrl}?action=export`)


  headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
  return this.httpClient.get(
    `${this.nqrHistoryUrl}?action=export`,{headers}
  );
}

    getMerchantHistory(perPage= 50, page) {
     
      let headers = new HttpHeaders();
      function sha1Hmac(value, key) {
        return cryptojs
          .HmacSHA256(value, key)
          
      }
    
      let encrypt=btoa(`${this.merchantnqrHistoryUrl}?page=${page}&perPage=${perPage}`)
  
      headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
    return this.httpClient.get(
      `${this.merchantnqrHistoryUrl}?perPage=${perPage}&page=${page}`,
      { headers }
    );
  }

  exportMerchantHistory(){
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA256(value, key)
        
    }
  
    let encrypt=btoa(`${this.merchantnqrHistoryUrl}?action=export`)

    headers = headers.set("X-VAS-KEY",sha1Hmac(encrypt,this.live_key).toString());
  return this.httpClient.get(
    `${this.merchantnqrHistoryUrl}?action=export`,
    { headers }
  );
  }
}
