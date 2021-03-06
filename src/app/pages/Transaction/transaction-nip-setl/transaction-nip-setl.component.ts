import { interval } from "rxjs/";
import { TransactionglobalService } from "../../../_service/transactionglobal.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink/dist/subsink";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { SocketService } from "app/_service/socket.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { IMyOptions } from "ng-uikit-pro-standard";
import { ExcelService } from "app/_service/excel.service";
import { AuthService } from "app/_auth/auth.service";
import { User } from "app/_models/user";
import { WebworkerService } from "app/web-worker/webworker.service";
import { EXCEL_EXPORT } from "app/web-worker/excel-export.script";

import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-transaction-nip-setl",
  templateUrl: "./transaction-nip-setl.component.html",
  styleUrls: ["./transaction-nip-setl.component.scss"]
})
export class TransactionNipSetlComponent implements OnInit {
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
  isExportLoading = false;
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
      "-" +
      (this.DateObj.getMonth() + 1) +
      "-" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    date: "",
    channel: "",
    paymentMethod: ""
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
  sessionOneAmount: any;
  sessionOneCount: any;
  sessionTwoAmount: any;
  sessionTwoCount: any;
  sessionThreeAmount: any;
  sessionThreeCount: any;
  sessionFourAmount: any;
  sessionFourCount: any;
  total_transactions: any;
  total_transactions_count: any;
  Session: any;

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
      paymentType: ["", Validators.min]
    });
  }

  ngOnInit() {
    this.TransactionSummaryNip(this.payload);
  }

  Channels = ["USSD", "POS", "MOBILE", "WEB"];
  Methods = ["CARD", "CASH", "QR CODE", "MPOS", "BANK"];
  Status = ["Successful", "Failed", "Reversed", "Pending"];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900
  };

  TransactionSummaryNip(payload) {
    this.isData = true;
    this.isLoading = true;
    this.transactionService.getTransactionSummarySettlementNip(payload).subscribe(
      data => {
        this.isLoading = false;
        this.summaryData = data;
        this.total_transactions = this.summaryData.total_transactions;
        this.total_transactions_count = this.summaryData.total_transactions_count;

        console.log(this.summaryData, "summaryData");
      },
      error => {
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

    this.filterData = {
      date: this.startDate ? this.startDate : "",
      paymentMethod: this.paymentMethod ? this.paymentMethod : "",
      channel: this.channel ? this.channel : ""
    };
    console.log(this.filterData);

    this.TransactionSummaryNip(this.filterData);
  }

  exportToExcel(session) {
    this.startDate = this.searchForm.value.startDate;

    const payload = {
      date: this.startDate ? this.startDate : "",
      paymentMethod: this.paymentMethod ? this.paymentMethod : "",
      channel: this.channel ? this.channel : "",
      download: true,
      session: session
    };

    console.log(payload);

    this.isData = true;
    this.isExportLoading = true;
    this.Session = session;

    if (this.userName() != "Providus") {
      this.isData = true;
      this.isExportLoading = true;
      this.transactionService.exportSettlementTableNip(payload).subscribe(
        data => {
          this.isExportLoading = false;
          this.exportData = data;
          this.excelService.exportAsExcelFile(
            this.exportData,
            "ITEX-NIP-Settlement-Cycle-Report" + this.dateRange
          );
        },
        error => {
          this.isData = false;
          this.isExportLoading = false;
          console.log("cant get transaction details", error);
        }
      );
    }
  }

  userName() {
    const username = localStorage.getItem("loggedUser");
    return username;
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

  // intercall() {this.dateRange ? this.dateRange : "",
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
