import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from 'common/endpoint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyBankingService {

  baseUrl = 'http://197.253.19.76:6200/api/v1/transaction/agents';

  constructor(public http:HttpClient) { }
 
  getAgencyBankingData(transaction:any):Observable<any>{
    return this.http.post(this.baseUrl, transaction ).pipe(
      map((response: any) => {
          const transaction = response;
          return transaction;
      }
      ));
  }
}
