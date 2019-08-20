import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/';

    constructor(private httpClient: HttpClient) { }

    // today Products
    getTodayProducts(): Observable<any[]> {
        let getMTNVTUSuccess = this.httpClient.get(this.baseUrl + `products/day/MTNVTU/successful`);
        let getMTNVTUFailed = this.httpClient.get(this.baseUrl + `products/day/MTNVTU/failed`);

        let getMTNPINSuccess = this.httpClient.get(this.baseUrl + `products/day/MTNPIN/successful`);
        let getMTNPINFailed = this.httpClient.get(this.baseUrl + `products/day/MTNPIN/failed`);

        let getMTNDATASuccess = this.httpClient.get(this.baseUrl + `products/day/MTNDATA/successful`);
        let getMTNDATAFailed = this.httpClient.get(this.baseUrl + `products/day/MTNDATA/failed`);

        let getGLOVTUSuccess = this.httpClient.get(this.baseUrl + `products/day/GLOVTU/successful`);
        let getGLOVTUFailed = this.httpClient.get(this.baseUrl + `products/day/GLOVTU/failed`);

        let getGLOPINSuccess = this.httpClient.get(this.baseUrl + `products/day/GLOPIN/successful`);
        let getGLOPINFailed = this.httpClient.get(this.baseUrl + `products/day/GLOPIN/failed`);

        let getGLODATASuccess = this.httpClient.get(this.baseUrl + `products/day/GLODATA/successful`);
        let getGLODATAFailed = this.httpClient.get(this.baseUrl + `products/day/GLODATA/failed`);

        let getAIRTELVTUSuccess = this.httpClient.get(this.baseUrl + `products/day/AIRTELVTU/successful`);
        let getAIRTELVTUFailed = this.httpClient.get(this.baseUrl + `products/day/AIRTELVTU/failed`);

        let getAIRTELPINSuccess = this.httpClient.get(this.baseUrl + `products/day/AIRTELPIN/successful`);
        let getAIRTELPINFailed = this.httpClient.get(this.baseUrl + `products/day/AIRTELPIN/failed`);

        let getOTHERSSuccess = this.httpClient.get(this.baseUrl + `products/day/OTHERS/successful`);
        let getOTHERSFailed = this.httpClient.get(this.baseUrl + `products/day/OTHERS/failed`);

        return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
            getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
            getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed]);
    }

    
    // THIS WWEEK Products
    getThisWeekProducts(): Observable<any[]> {
        let getMTNVTUSuccess = this.httpClient.get(this.baseUrl + `products/week/MTNVTU/successful`);
        let getMTNVTUFailed = this.httpClient.get(this.baseUrl + `products/week/MTNVTU/failed`);

        let getMTNPINSuccess = this.httpClient.get(this.baseUrl + `products/week/MTNPIN/successful`);
        let getMTNPINFailed = this.httpClient.get(this.baseUrl + `products/week/MTNPIN/failed`);

        let getMTNDATASuccess = this.httpClient.get(this.baseUrl + `products/week/MTNDATA/successful`);
        let getMTNDATAFailed = this.httpClient.get(this.baseUrl + `products/week/MTNDATA/failed`);

        let getGLOVTUSuccess = this.httpClient.get(this.baseUrl + `products/week/GLOVTU/successful`);
        let getGLOVTUFailed = this.httpClient.get(this.baseUrl + `products/week/GLOVTU/failed`);

        let getGLOPINSuccess = this.httpClient.get(this.baseUrl + `products/week/GLOPIN/successful`);
        let getGLOPINFailed = this.httpClient.get(this.baseUrl + `products/week/GLOPIN/failed`);

        let getGLODATASuccess = this.httpClient.get(this.baseUrl + `products/week/GLODATA/successful`);
        let getGLODATAFailed = this.httpClient.get(this.baseUrl + `products/week/GLODATA/failed`);

        let getAIRTELVTUSuccess = this.httpClient.get(this.baseUrl + `products/week/AIRTELVTU/successful`);
        let getAIRTELVTUFailed = this.httpClient.get(this.baseUrl + `products/week/AIRTELVTU/failed`);

        let getAIRTELPINSuccess = this.httpClient.get(this.baseUrl + `products/week/AIRTELPIN/successful`);
        let getAIRTELPINFailed = this.httpClient.get(this.baseUrl + `products/week/AIRTELPIN/failed`);

        let getOTHERSSuccess = this.httpClient.get(this.baseUrl + `products/week/OTHERS/successful`);
        let getOTHERSFailed = this.httpClient.get(this.baseUrl + `products/week/OTHERS/failed`);

        return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
            getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
            getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed]);
    }

        // THIS month Products
        getThisMonthProducts(): Observable<any[]> {
            let getMTNVTUSuccess = this.httpClient.get(this.baseUrl + `products/month/MTNVTU/successful`);
            let getMTNVTUFailed = this.httpClient.get(this.baseUrl + `products/month/MTNVTU/failed`);
    
            let getMTNPINSuccess = this.httpClient.get(this.baseUrl + `products/month/MTNPIN/successful`);
            let getMTNPINFailed = this.httpClient.get(this.baseUrl + `products/month/MTNPIN/failed`);
    
            let getMTNDATASuccess = this.httpClient.get(this.baseUrl + `products/month/MTNDATA/successful`);
            let getMTNDATAFailed = this.httpClient.get(this.baseUrl + `products/month/MTNDATA/failed`);
    
            let getGLOVTUSuccess = this.httpClient.get(this.baseUrl + `products/month/GLOVTU/successful`);
            let getGLOVTUFailed = this.httpClient.get(this.baseUrl + `products/month/GLOVTU/failed`);
    
            let getGLOPINSuccess = this.httpClient.get(this.baseUrl + `products/month/GLOPIN/successful`);
            let getGLOPINFailed = this.httpClient.get(this.baseUrl + `products/month/GLOPIN/failed`);
    
            let getGLODATASuccess = this.httpClient.get(this.baseUrl + `products/month/GLODATA/successful`);
            let getGLODATAFailed = this.httpClient.get(this.baseUrl + `products/month/GLODATA/failed`);
    
            let getAIRTELVTUSuccess = this.httpClient.get(this.baseUrl + `products/month/AIRTELVTU/successful`);
            let getAIRTELVTUFailed = this.httpClient.get(this.baseUrl + `products/month/AIRTELVTU/failed`);
    
            let getAIRTELPINSuccess = this.httpClient.get(this.baseUrl + `products/month/AIRTELPIN/successful`);
            let getAIRTELPINFailed = this.httpClient.get(this.baseUrl + `products/month/AIRTELPIN/failed`);
    
            let getOTHERSSuccess = this.httpClient.get(this.baseUrl + `products/month/OTHERS/successful`);
            let getOTHERSFailed = this.httpClient.get(this.baseUrl + `products/month/OTHERS/failed`);
    
            return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
                getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
                getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed]);
        }
}