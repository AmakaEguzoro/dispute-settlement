import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { forkJoin } from "rxjs";
import { Transaction } from "app/_models/transaction";
import { map } from "rxjs/operators";
import { RemoveLock } from "app/_models/removeLocks";
import { WalletBalance } from "app/_models/user";

@Injectable({
  providedIn: "root"
})
export class TransactionglobalService {
  baseUrl = "http://197.253.19.76:6200/api/v1/vas/report/summary";
  agentsurl = "http://197.253.19.76:6200/api/v1/vas/report/agents";
  usersurl = "http://197.253.19.76:6200/api/v1/vas/report/users";
  transurl = "http://197.253.19.76:6200/api/v1/vas/report/trans/table";
  exporturl = "http://197.253.19.76:6200/api/v1/vas/report/export";

  summaryNipUrl = environment.api.baseUrl + "/vas/nip-report/summary";
  exportNipUrl = environment.api.baseUrl + "/vas/nip-report/export";

  summarySettlementNipUrl = environment.api.baseUrl + "/vas/nip-setl-report/summary";
  exportSettlementNipUrl = environment.api.baseUrl + "/vas/nip-setl-report/export";

  constructor(private httpClient: HttpClient) {}

  getTransactionSummary(transaction) {
    return this.httpClient.post(this.baseUrl, transaction).pipe(
      map((response: any) => {
        const transactionSummary = response;
        console.log("transactionsummary", transactionSummary);
        return transactionSummary;
      })
    );
  }

  getAgentTable(agentdata) {
    return this.httpClient.post(this.agentsurl, agentdata).pipe(
      map((response: any) => {
        const agentsummary = response;
        return agentsummary;
      })
    );
  }
  getUserTable(userdata) {
    return this.httpClient.post(this.usersurl, userdata).pipe(
      map((response: any) => {
        const usersummary = response;
        return usersummary;
      })
    );
  }
  getTransTable(transdata) {
    return this.httpClient.post(this.transurl, transdata).pipe(
      map((response: any) => {
        const transsummary = response;
        return transsummary;
      })
    );
  }
  exportTable(exportdata) {
    return this.httpClient.post(this.exporturl, exportdata).pipe(
      map((response: any) => {
        const exportTable = response;
        return exportTable;
      })
    );
  }

  exportTableNip(exportdata) {
    return this.httpClient.post(this.exportNipUrl, exportdata).pipe(
      map((response: any) => {
        const exportTable = response;
        console.log("export Nip Service ", exportTable);
        return exportTable;
      })
    );
  }

  getTransactionSummaryNip(transaction) {
    return this.httpClient.post(this.summaryNipUrl, transaction).pipe(
      map((response: any) => {
        const transactionSummary = response;
        console.log("transactionsummary", transactionSummary);
        return transactionSummary;
      })
    );
  }

  getTransactionSummarySettlementNip(transaction) {
    return this.httpClient.post(this.summarySettlementNipUrl, transaction).pipe(
      map((response: any) => {
        const transactionSummary = response;
        console.log("transactionsummary", transactionSummary);
        return transactionSummary;
      })
    );
  }

  exportSettlementTableNip(exportdata) {
    return this.httpClient.post(this.exportSettlementNipUrl, exportdata).pipe(
      map((response: any) => {
        const exportTable = response;
        console.log("export Nip Service ", exportTable);
        return exportTable;
      })
    );
  }
  
}
