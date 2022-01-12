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
  providedIn: "root",
})
export class SanefService {
  accountUrl = "http://197.253.19.78:5013/accounts";
  transUrl = "http://197.253.19.78:5013/transactions";
  disputeUrl = "http://197.253.19.78:9913/disputes/GetDisputeTrans";
  constructor(private httpClient: HttpClient) {}

  getAccounts(
    startDate,
    endDate,
    status,
    walletId,
    accountNumber,
    phoneNumber,
    viewPage
  ) {
    return this.httpClient.get(
      `${this.accountUrl}?startDate=${startDate}&endDate=${endDate}&status=${status}&walletId=${walletId}&accountNumber=${accountNumber}&phoneNumber=${phoneNumber}&viewPage=${viewPage}`
    );
  }
  getTransactions(
    startDate,
    endDate,
    agentPayviceId,
    accountNumber,
    phoneNumber,
    status,
    product,
    transactionReference,
    transactionType,
    cashCode,
    viewPage
  ) {
    return this.httpClient.get(
      `${this.transUrl}?startDate=${startDate}&endDate=${endDate}&walletId=${agentPayviceId}&accountNumber=${accountNumber}&phoneNumber=${phoneNumber}&status=${status}&product=${product}&transactionReference=${transactionReference}&transactionType=${transactionType}&cashCode=${cashCode}&viewPage=${viewPage}`
    );
  }

  getDisputeTrans(
    referenceNo,
    amount,
    status,
    terminalId,
    bank,
    authId,
    stan,
    startDate
  ) {
    return this.httpClient.get(
      `${this.disputeUrl}?startDate=${startDate}&referenceNo=${referenceNo}&amount=${amount}&terminalId=${terminalId}&status=${status}&bank=${bank}&authId=${authId}&stan=${stan}`
    );
  }
}
