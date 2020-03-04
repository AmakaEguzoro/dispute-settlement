import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorAnalysisService {

  baseUrl = 'http://197.253.19.76:6200/api/v1/transactions/error-analysis';
  constructor(public http:HttpClient) { }

  getErrorAnalysis(payload:any):Observable<any>{
    return this.http.post(this.baseUrl, payload ).pipe(
      map((response: any) => {
          return response;
      }
      ));
  }
}
