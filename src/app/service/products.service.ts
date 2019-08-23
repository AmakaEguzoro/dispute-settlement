import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    baseUrl = 'http://197.253.19.76:6200/api/v1/';

    payload = [];
    product: any;
    constructor(private httpClient: HttpClient) { }

    // today Products

    // getProduct(){
    //     this.product = ["WITHDRAWAL", "etisalatvtu", "RCN_FUND_TRANSFER", "MTNVTU", "MTNPIN",
        
    //     "MTNDATA", "GLOVTU", "GLOPIN","GLODATA", "AIRTELVTU", "AIRTELPIN", "OTHERS", "Multichoice", "IKEDC",
        
    //     "EEDC", 'PHEDC', 'TRANSFER', "EKEDC", 'kedco', 'STARTIMES', 'IBEDC', 'AEDC',
    //     ];

    //     let  arr = [];  // creates a new array .. much preferred method too.
    //     for (var i = 0; i < this.product.length; i++) {
    //         arr[i] = this.httpClient.get(`${this.baseUrl} products/day/${this.product}/successful`);;
    //     }
        
    //      console.log(arr);
    //     return forkJoin(arr);

    // }
        
        
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

        let getWITHDRAWALSuccess = this.httpClient.get(this.baseUrl + `channels/day/WITHDRAWAL/successful`);
        let getWITHDRAWALFailed = this.httpClient.get(this.baseUrl + `channels/day/WITHDRAWAL/failed`);

        let getETISALATVTUSuccess = this.httpClient.get(this.baseUrl + `channels/day/ETISALATVTU/successful`);
        let getETISALATVTUFailed = this.httpClient.get(this.baseUrl + `channels/day/ETISALATVTU/failed`);

        let getRCN_FUND_TRANSFERSuccess = this.httpClient.get(this.baseUrl + `channels/day/RCN_FUND_TRANSFER/successful`);
        let getRCN_FUND_TRANSFERFailed = this.httpClient.get(this.baseUrl + `channels/day/RCN_FUND_TRANSFER/failed`);

        let getMultichoiceSuccess = this.httpClient.get(this.baseUrl + `channels/day/Multichoice/successful`);
        let getMultichoiceFailed = this.httpClient.get(this.baseUrl + `channels/day/Multichoice/failed`);

        let getIKEDCSuccess = this.httpClient.get(this.baseUrl + `channels/day/IKEDC/successful`);
        let getIKEDCFailed = this.httpClient.get(this.baseUrl + `channels/day/IKEDC/failed`);

        let getEEDCSuccess = this.httpClient.get(this.baseUrl + `channels/day/EEDC/successful`);
        let getEEDCFailed = this.httpClient.get(this.baseUrl + `channels/day/EEDC/failed`);

        let getPHEDCSuccess = this.httpClient.get(this.baseUrl + `payments/day/PHEDC/successful`);
        let getPHEDCFailed = this.httpClient.get(this.baseUrl + `payments/day/PHEDC/failed`);

        let getTRANSFERSuccess = this.httpClient.get(this.baseUrl + `payments/day/TRANSFER/successful`);
        let getTRANSFERFailed = this.httpClient.get(this.baseUrl + `payments/day/TRANSFER/failed`);

        let getEKEDCSuccess = this.httpClient.get(this.baseUrl + `payments/day/EKEDC/successful`);
        let getEKEDCFailed = this.httpClient.get(this.baseUrl + `payments/day/EKEDC/failed`);

        let getkedcoSuccess = this.httpClient.get(this.baseUrl + `channels/day/kedco/successful`);
        let getkedcoFailed = this.httpClient.get(this.baseUrl + `channels/day/kedco/failed`);

        let getSTARTIMESSuccess = this.httpClient.get(this.baseUrl + `channels/day/STARTIMES/successful`);
        let getSTARTIMESFailed = this.httpClient.get(this.baseUrl + `channels/day/STARTIMES/failed`);

        let getIBEDCSuccess = this.httpClient.get(this.baseUrl + `channels/day/IBEDC/successful`);
        let getIBEDCFailed = this.httpClient.get(this.baseUrl + `channels/day/IBEDC/failed`);

        let getAEDCSuccess = this.httpClient.get(this.baseUrl + `channels/day/AEDC/successful`);
        let getAEDCFailed = this.httpClient.get(this.baseUrl + `channels/day/AEDC/failed`);


        return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
            getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
            getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed,
            getWITHDRAWALSuccess, getWITHDRAWALFailed, getETISALATVTUSuccess, getETISALATVTUFailed, getRCN_FUND_TRANSFERSuccess,
            getRCN_FUND_TRANSFERFailed, getMultichoiceSuccess, getMultichoiceFailed, getIKEDCSuccess, getIKEDCFailed, getEEDCSuccess,
            getEEDCFailed, getPHEDCSuccess, getPHEDCFailed, getTRANSFERSuccess, getTRANSFERFailed, getEKEDCSuccess,
            getEKEDCFailed, getkedcoSuccess, getkedcoFailed, getSTARTIMESSuccess, getSTARTIMESFailed, getIBEDCSuccess,
            getIBEDCFailed, getAEDCSuccess, getAEDCFailed
        ]);
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

        let getWITHDRAWALSuccess = this.httpClient.get(this.baseUrl + `channels/week/WITHDRAWAL/successful`);
        let getWITHDRAWALFailed = this.httpClient.get(this.baseUrl + `channels/week/WITHDRAWAL/failed`);

        let getETISALATVTUSuccess = this.httpClient.get(this.baseUrl + `channels/week/ETISALATVTU/successful`);
        let getETISALATVTUFailed = this.httpClient.get(this.baseUrl + `channels/week/ETISALATVTU/failed`);

        let getRCN_FUND_TRANSFERSuccess = this.httpClient.get(this.baseUrl + `channels/week/RCN_FUND_TRANSFER/successful`);
        let getRCN_FUND_TRANSFERFailed = this.httpClient.get(this.baseUrl + `channels/week/RCN_FUND_TRANSFER/failed`);

        let getMultichoiceSuccess = this.httpClient.get(this.baseUrl + `channels/week/Multichoice/successful`);
        let getMultichoiceFailed = this.httpClient.get(this.baseUrl + `channels/week/Multichoice/failed`);

        let getIKEDCSuccess = this.httpClient.get(this.baseUrl + `channels/week/IKEDC/successful`);
        let getIKEDCFailed = this.httpClient.get(this.baseUrl + `channels/week/IKEDC/failed`);

        let getEEDCSuccess = this.httpClient.get(this.baseUrl + `channels/week/EEDC/successful`);
        let getEEDCFailed = this.httpClient.get(this.baseUrl + `channels/week/EEDC/failed`);

        let getPHEDCSuccess = this.httpClient.get(this.baseUrl + `payments/week/PHEDC/successful`);
        let getPHEDCFailed = this.httpClient.get(this.baseUrl + `payments/week/PHEDC/failed`);

        let getTRANSFERSuccess = this.httpClient.get(this.baseUrl + `payments/week/TRANSFER/successful`);
        let getTRANSFERFailed = this.httpClient.get(this.baseUrl + `payments/week/TRANSFER/failed`);

        let getEKEDCSuccess = this.httpClient.get(this.baseUrl + `payments/week/EKEDC/successful`);
        let getEKEDCFailed = this.httpClient.get(this.baseUrl + `payments/week/EKEDC/failed`);

        let getkedcoSuccess = this.httpClient.get(this.baseUrl + `channels/week/kedco/successful`);
        let getkedcoFailed = this.httpClient.get(this.baseUrl + `channels/week/kedco/failed`);

        let getSTARTIMESSuccess = this.httpClient.get(this.baseUrl + `channels/week/STARTIMES/successful`);
        let getSTARTIMESFailed = this.httpClient.get(this.baseUrl + `channels/week/STARTIMES/failed`);

        let getIBEDCSuccess = this.httpClient.get(this.baseUrl + `channels/week/IBEDC/successful`);
        let getIBEDCFailed = this.httpClient.get(this.baseUrl + `channels/week/IBEDC/failed`);

        let getAEDCSuccess = this.httpClient.get(this.baseUrl + `channels/week/AEDC/successful`);
        let getAEDCFailed = this.httpClient.get(this.baseUrl + `channels/week/AEDC/failed`);


        return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
            getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
            getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed,getWITHDRAWALSuccess, getWITHDRAWALFailed, getETISALATVTUSuccess, getETISALATVTUFailed, getRCN_FUND_TRANSFERSuccess,
            getRCN_FUND_TRANSFERFailed, getMultichoiceSuccess, getMultichoiceFailed, getIKEDCSuccess, getIKEDCFailed, getEEDCSuccess,
            getEEDCFailed, getPHEDCSuccess, getPHEDCFailed, getTRANSFERSuccess, getTRANSFERFailed, getEKEDCSuccess,
            getEKEDCFailed, getkedcoSuccess, getkedcoFailed, getSTARTIMESSuccess, getSTARTIMESFailed, getIBEDCSuccess,
            getIBEDCFailed, getAEDCSuccess, getAEDCFailed]);
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

        let getWITHDRAWALSuccess = this.httpClient.get(this.baseUrl + `channels/month/WITHDRAWAL/successful`);
        let getWITHDRAWALFailed = this.httpClient.get(this.baseUrl + `channels/month/WITHDRAWAL/failed`);

        let getETISALATVTUSuccess = this.httpClient.get(this.baseUrl + `channels/month/ETISALATVTU/successful`);
        let getETISALATVTUFailed = this.httpClient.get(this.baseUrl + `channels/month/ETISALATVTU/failed`);

        let getRCN_FUND_TRANSFERSuccess = this.httpClient.get(this.baseUrl + `channels/month/RCN_FUND_TRANSFER/successful`);
        let getRCN_FUND_TRANSFERFailed = this.httpClient.get(this.baseUrl + `channels/month/RCN_FUND_TRANSFER/failed`);

        let getMultichoiceSuccess = this.httpClient.get(this.baseUrl + `channels/month/Multichoice/successful`);
        let getMultichoiceFailed = this.httpClient.get(this.baseUrl + `channels/month/Multichoice/failed`);

        let getIKEDCSuccess = this.httpClient.get(this.baseUrl + `channels/month/IKEDC/successful`);
        let getIKEDCFailed = this.httpClient.get(this.baseUrl + `channels/month/IKEDC/failed`);

        let getEEDCSuccess = this.httpClient.get(this.baseUrl + `channels/month/EEDC/successful`);
        let getEEDCFailed = this.httpClient.get(this.baseUrl + `channels/month/EEDC/failed`);

        let getPHEDCSuccess = this.httpClient.get(this.baseUrl + `payments/month/PHEDC/successful`);
        let getPHEDCFailed = this.httpClient.get(this.baseUrl + `payments/month/PHEDC/failed`);

        let getTRANSFERSuccess = this.httpClient.get(this.baseUrl + `payments/month/TRANSFER/successful`);
        let getTRANSFERFailed = this.httpClient.get(this.baseUrl + `payments/month/TRANSFER/failed`);

        let getEKEDCSuccess = this.httpClient.get(this.baseUrl + `payments/month/EKEDC/successful`);
        let getEKEDCFailed = this.httpClient.get(this.baseUrl + `payments/month/EKEDC/failed`);

        let getkedcoSuccess = this.httpClient.get(this.baseUrl + `channels/month/kedco/successful`);
        let getkedcoFailed = this.httpClient.get(this.baseUrl + `channels/month/kedco/failed`);

        let getSTARTIMESSuccess = this.httpClient.get(this.baseUrl + `channels/month/STARTIMES/successful`);
        let getSTARTIMESFailed = this.httpClient.get(this.baseUrl + `channels/month/STARTIMES/failed`);

        let getIBEDCSuccess = this.httpClient.get(this.baseUrl + `channels/month/IBEDC/successful`);
        let getIBEDCFailed = this.httpClient.get(this.baseUrl + `channels/month/IBEDC/failed`);

        let getAEDCSuccess = this.httpClient.get(this.baseUrl + `channels/month/AEDC/successful`);
        let getAEDCFailed = this.httpClient.get(this.baseUrl + `channels/month/AEDC/failed`);



        return forkJoin([getMTNVTUSuccess, getMTNVTUFailed, getMTNPINSuccess, getMTNPINFailed, getMTNDATASuccess,
            getMTNDATAFailed, getGLOVTUSuccess, getGLOVTUFailed, getGLOPINSuccess, getGLOPINFailed, getGLODATASuccess,
            getGLODATAFailed, getAIRTELVTUSuccess, getAIRTELVTUFailed, getAIRTELPINSuccess, getAIRTELPINFailed, getOTHERSSuccess, getOTHERSFailed,getWITHDRAWALSuccess, getWITHDRAWALFailed, getETISALATVTUSuccess, getETISALATVTUFailed, getRCN_FUND_TRANSFERSuccess,
            getRCN_FUND_TRANSFERFailed, getMultichoiceSuccess, getMultichoiceFailed, getIKEDCSuccess, getIKEDCFailed, getEEDCSuccess,
            getEEDCFailed,getPHEDCSuccess, getPHEDCFailed, getTRANSFERSuccess, getTRANSFERFailed, getEKEDCSuccess,
            getEKEDCFailed, getkedcoSuccess, getkedcoFailed, getSTARTIMESSuccess, getSTARTIMESFailed, getIBEDCSuccess,
            getIBEDCFailed, getAEDCSuccess, getAEDCFailed]);
    }
}