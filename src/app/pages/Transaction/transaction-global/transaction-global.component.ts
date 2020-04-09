import { interval } from "rxjs/";
import { TransactionglobalService } from "./../../../_service/transactionglobal.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink/dist/subsink";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { SocketService } from "app/_service/socket.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { IMyOptions } from "ng-uikit-pro-standard";
import { ExcelService } from "app/_service/excel.service";
import { AuthService } from "app/_auth/auth.service";
import { User } from "app/_models/user";
import { WebworkerService } from "app/web-worker/webworker.service";
import { EXCEL_EXPORT } from "app/web-worker/excel-export.script";

import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-transaction-global",
  templateUrl: "./transaction-global.component.html",
  styleUrls: ["./transaction-global.component.scss"],
})
export class TransactionGlobalComponent implements OnInit {
  isData: boolean;
  showing: any = "home";
  data: any;
  transaction: any;
  detailsData: any;

  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;

  // modal
  bsModalRef: BsModalRef;
  private subs = new SubSink();
  socketData: any;
  disabled: true;

  // Summary
  summaryData: any;
  transactionSummary: any;
  failedAmount: any;
  cashin: any;
  cashout: any;
  vascard: any;
  vascash: any;
  totalAmount: any;
  totalCount: any;
  isLoading = false;
  usersCount: any;
  terminalCount: any;
  startDate: any;
  endDate: any;
  searchForm: FormGroup;
  paymentMethod: any;
  vendor: any;
  vendorType: any;
  globaltrans: any;

  filter: any;
  filterValue: any;
  channel: any;
  paymentChannel: any;
  paymentType: any;
  filterData: any;
  start: any;
  end: any;
  range: any;
  userBalance: any;
  exportData: any;
  DateObj: any = new Date();
  dateRange = String(
    this.DateObj.getFullYear() +
      "/" +
      (this.DateObj.getMonth() + 1) +
      "/" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    startDate: "",
    endDate: "",
    channel: "",
    paymentType: "",
  };
  mtn: any;
  totalairtime: any;
  smile: any;
  totalutilities: any;
  totalcable: any;
  airtel: any;
  glo: any;
  eko_electric: any;
  ikeja_electric: any;
  ibadan_electric: any;
  enugu_electric: any;
  ph_electric: any;
  abuja_electric: any;
  multichoice: any;
  startimes: any;
  waec: any;
  genesis: any;
  mobile9: any;
  kano_electric: any;
  others: any;
  total_users: any;
  total_agents: any;
  total_wallet_balance: any;
  reload: any;
  isInterval: boolean;
  cashin_total: any;
  cashout_total: any;
  vascard_total: any;
  vascash_total: any;

  constructor(
    private transactionService: TransactionglobalService,
    private router: Router,
    private modalService: BsModalService,
    private socket: SocketService,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private authService: AuthService,
    private webworker: WebworkerService
  ) {
    this.searchForm = this.fb.group({
      startDate: ["", Validators.min],
      endDate: ["", Validators.min],
      channel: ["", Validators.min],
      paymentType: ["", Validators.min],
    });
  }

  ngOnInit() {
    this.TransactionSummary(this.payload);
  }

  stat = ["USSD", "POS", "MOBILE", "WEB"];
  Refs = ["CARD", "CASH", "QR CODE", "MPOS", "BANK"];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };

  TransactionSummary(payload) {
    this.isData = true;
    this.isLoading = true;
    this.transactionService.getTransactionSummary(payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summaryData = data;
        this.cashin = this.summaryData.cash_in;
        this.cashin_total = this.summaryData.cash_in_total;
        this.cashout = this.summaryData.cash_out;
        this.cashout_total = this.summaryData.cash_out_total;
        this.vascard = this.summaryData.vas_card;
        this.vascard_total = this.summaryData.vas_card_total;
        this.vascash = this.summaryData.vas_cash;
        this.vascash_total = this.summaryData.vas_cash_total;
        this.mtn = this.summaryData.mtn;
        this.glo = this.summaryData.glo;
        this.mobile9 = this.summaryData["9mobile"];
        this.totalairtime = this.summaryData.airtime_and_data;
        this.smile = this.summaryData.smile_internet;
        this.totalutilities = this.summaryData.utilities;
        this.totalcable = this.summaryData.cable_tv;
        this.airtel = this.summaryData.airtel;
        this.ikeja_electric = this.summaryData.ikeja_electric;
        this.eko_electric = this.summaryData.eko_electric;
        this.ibadan_electric = this.summaryData.ibadan_electric;
        this.enugu_electric = this.summaryData.enugu_electric;
        this.ph_electric = this.summaryData.ph_electric;
        this.abuja_electric = this.summaryData.abuja_electric;
        this.kano_electric = this.summaryData.kano_electric;
        this.multichoice = this.summaryData.multichoice;
        this.others = this.summaryData.others;
        this.startimes = this.summaryData.startimes;
        this.waec = this.summaryData.waec;
        this.genesis = this.summaryData.genesis;
        this.total_users = this.summaryData.total_users;
        this.total_agents = this.summaryData.total_agents;
        this.total_wallet_balance = this.summaryData.total_wallet_balance;
        this.globaltrans = this.summaryData.global_transactions;

        console.log(this.summaryData, "summaryData");
      },
      (error) => {
        this.isData = false;
        this.isLoading = false;
        console.log("cant get transaction summary details", error);
      }
    );
  }
  getChannel(event) {
    this.channel = event.target.value;
  }

  getType(event) {
    this.paymentType = event.target.value;
  }

  searchTrans() {
    this.startDate = this.searchForm.value.startDate;

    this.endDate = this.searchForm.value.endDate;

    this.range = `${this.start} - ${this.end}`;

    this.filterData = {
      startDate: this.startDate ? this.startDate : "",
      endDate: this.endDate ? this.endDate : "",
      paymentType: this.paymentType ? this.paymentType : "",
      channel: this.channel ? this.channel : "",
    };
    console.log(this.filterData);

    this.TransactionSummary(this.filterData);
  }

  displaytable(data) {
    this.showing = data;
  }
  displaytable2(data) {
    this.showing = data;
  }
  displaytable3(data) {
    this.showing = data;
  }

  // intercall() {
  //   if (this.reload != null) {
  //     this.reload.unsubscribe();
  //     this.reload = null;
  //   }
  //   this.reload = interval(2000).subscribe(() => {
  //     this.isInterval = true;
  //     this.ngOnInit;
  //   });
  // }
  handleChange(data) {
    this.showing = data;
  }
}
