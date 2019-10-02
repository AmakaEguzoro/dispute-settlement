import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from 'common/endpoint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyBankingService {

  constructor(public http:HttpClient) { }
 
  getAgencyBankingData(transaction:any):Observable<any>{
    return this.http.post(Endpoint.AGENCY_BANKING.url, transaction ).pipe(
      map((response: any) => {
          const transaction = response;
          return transaction;
      }
      ));
  }
}
