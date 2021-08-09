import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import * as cryptojs from "crypto-js";
import { RequestOptions } from "@angular/http";
@Injectable({
  providedIn: "root",
})
export class AgentserviceService {
  constructor(private httpClient: HttpClient) {}
  agentsummaryUrl = "https://payvice.itexapp.com/v1/users/agents";
  agentUrl = "https://payvice.itexapp.com/v1/users/agent";
  validateagentUrl = "https://payvice.itexapp.com/v1/agents/validateAgent";
  key = "3A56745C8CC617398AACAE7D66BACDE7";

  getAgentTable(limit = 50, page, sort) {
    return this.httpClient.get(
      `${this.agentsummaryUrl}?limit=${limit}&page=${page}&order=${sort}`
    );
  }

  getAgentDetails(id) {
    return this.httpClient.get(`${this.agentsummaryUrl}?walletid=${id}`);
  }

  validateAgent(id) {
    let headers = new HttpHeaders();
    function sha1Hmac(value, key) {
      return cryptojs
        .HmacSHA1(cryptojs.enc.Utf8.parse(value), cryptojs.enc.Utf8.parse(key))
        .toString();
    }
    headers = headers.set("Authorization", sha1Hmac(id, this.key));

    return this.httpClient.patch(
      `${this.validateagentUrl}/${id}`,
      {},
      { headers }
    );
  }

  searchAgent(id) {
    return this.httpClient.get(`${this.agentsummaryUrl}?search=${id}`);
  }

  rangeAgent(start, end) {
    return this.httpClient.get(
      `${this.agentsummaryUrl}?startdate=${start}&enddate=${end}`
    );
  }

  exportAgent(startDate, endDate) {
    return this.httpClient.get(
      `${this.agentsummaryUrl}?download=true&startdate=${startDate}&enddate=${endDate}`
    );
  }
}
