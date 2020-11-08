import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ErrorAnalysisService {

  baseUrl = environment.api.baseUrl + '/transaction/error-analysis'

  constructor(public http:HttpClient) { }

  getErrorAnalysis(payload:any):Observable<any>{
    return this.http.post(this.baseUrl, payload ).pipe(
      map((response: any) => {
          return response;
      }
      ));
  }
}
