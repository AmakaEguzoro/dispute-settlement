import { Component, OnInit, OnDestroy } from "@angular/core";
import { CgatetransactionService } from "app/_service/cgatetransaction.service";
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

@Component({
  selector: "app-cgate",
  templateUrl: "./cgate.component.html",
  styleUrls: ["./cgate.component.scss"]
})
export class CgateComponent implements OnInit {
  isData: boolean;
  loading = true;
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
  failedCount: any;
  successCount: any;
  successAmount: any;
  totalAmount: any;
  totalCount: any;
  isLoading = true;
  usersCount: any;
  terminalCount: any;
  // filters
  searchForm: FormGroup;
  paymentMethod: any;
  vendor: any;
  vendorType: any;
  vendType: any;
  transactionStatus: any;
  filter: any;
  filterValue: any;
  transactionReference: any;
  sequenceNumber: any;
  debitReference: any;
  accountNumber: any;
  phoneNumber: any;
  terminalId: any;
  walletId: any;
  cardRRN: any;
  product: any;
  transactionChannel: any;
  transactionType: any;
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
    dateRange: this.newRange,
    terminalId: "",
    walletId: "",
    accountNumber: "",
    paymentMethod: "",
    cardRRN: "",
    transactionReference: "",
    phoneNumber: "",
    sequenceNumber: "",
    debitReference: "",
    product: "",
    transactionType: "",
    transactionStatus: "",
    transactionChannel: "",
    searchField: "",
    viewPage: "",
    vendType: "",
    vendor: "",
    download: false
  };

  // private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // private EXCEL_EXTENSION = 'xlsx';

  constructor(
    private transactionService: CgatetransactionService,
    private router: Router,
    private modalService: BsModalService,
    private socket: SocketService,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private authService: AuthService,
    private webworker: WebworkerService
  ) {
    this.searchForm = this.fb.group({
      method: ["", Validators.min],
      startDate: ["", Validators.min],
      endDate: ["", Validators.min],
      filterValue: [""]
    });
  }

  ngOnInit() {
    this.Transaction(this.payload);
    this.TransactionSummary(this.payload);
  }

  userWallet() {
    return this.authService.currentUserWallet();
  }

  exportAsXLSX(): void {
    //this.socket.disconnectSocket();
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.filterData = {
      dateRange: this.range,
      terminalId: this.terminalId ? this.terminalId : "",
      walletId: this.walletId ? this.walletId : "",
      accountNumber: this.accountNumber ? this.accountNumber : "",
      paymentMethod: this.paymentMethod ? this.paymentMethod : "",
      cardRRN: this.cardRRN ? this.cardRRN : "",
      transactionReference: this.transactionReference
        ? this.transactionReference
        : "",
      phoneNumber: this.phoneNumber ? this.phoneNumber : "",
      sequenceNumber: this.sequenceNumber ? this.sequenceNumber : "",
      debitReference: this.debitReference ? this.debitReference : "",
      product: this.product ? this.product : "",
      transactionType: this.transactionType ? this.transactionType : "",
      transactionStatus: this.transactionStatus ? this.transactionStatus : "",
      transactionChannel: this.transactionChannel
        ? this.transactionChannel
        : "",
      searchField: "",
      viewPage: "",
      vendType: this.vendType ? this.vendType : "",
      vendor: this.vendor ? this.vendor : "",
      download: true
    };

    this.isData = true;
    this.loading = true;
    this.transactionService.getTransaction(this.filterData).subscribe(
      data => {
        this.loading = false;
        this.exportData = data.data.transactions;
        this.excelService.exportAsExcelFile(this.exportData, "ITEX-TranReport");
      },
      error => {
        this.isData = false;
        this.loading = false;
        console.log("cant get transaction details", error);
      }
    );
  }

  Transaction(payload) {
    this.isData = true;
    this.loading = true;
    this.transactionService.getTransaction(payload).subscribe(
      data => {
        this.loading = false;
        this.detailsData = data.data.transactions;
        console.log(this.detailsData);

        this.serial = 1 + (this.currentPage - 1) * this.perPage;
        this.lastPage = data.data.lastPage * this.perPage;
        console.log("Last Page logged", this.lastPage);
      },
      error => {
        this.isData = false;
        this.loading = false;
        console.log("cant get transaction details", error);
      }
    );
  }

  // openModal(modal) {
  //   this.detailsData.response = modal;
  //   const initialState = {
  //     data: this.detailsData.response,
  //     ignoreBackdropClick: true,
  //   };
  //   this.bsModalRef = this.modalService.show(ModelComponent, { initialState, class: 'modal-lg' });
  //   //
  // };

  headElements = [
    "S/N",
    "MERCHANT CODE",
    "REFERENCE",
    "PHONENUMBER",
    "TERMINAL",
    "AMOUNT",
    "STATUS",
    "MESSAGE",
    "LIFE-CYCLE",
    "DATE"
  ];

  TransactionSummary(payload) {
    this.isData = true;
    this.isLoading = true;
    this.transactionService.getTransactionSummary(payload).subscribe(
      data => {
        this.isLoading = false;
        this.summaryData = data.data;
        this.failedAmount = this.summaryData.failedAmount;
        this.failedCount = this.summaryData.failedCount;

        this.successCount = this.summaryData.successfulCount;
        this.successAmount = this.summaryData.successfulAmount;

        this.totalAmount = this.summaryData.totalAmount;
        this.totalCount = this.summaryData.transactionCount;
        this.usersCount = this.summaryData.usersCount;
        this.terminalCount = this.summaryData.terminalCount;
      },
      error => {
        this.isData = false;
        this.isLoading = false;
        console.log("cant get transaction summary details", error);
      }
    );
  }

  // filters
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900
    // disableUntil:
    //   { year: this.DateObj.getFullYear(), month: this.DateObj.getMonth(), day: this.DateObj.getDate() }
  };

  stat = ["Approved", "Declined", "Pending"];
  Refs = ["Terminal ID", "Transaction Ref", "Phone Number"];

  getPaymentMethod(event) {
    this.paymentMethod = event.target.value;
  }
  getChannel(event) {
    this.transactionChannel = event.target.value;
  }
  getProduct(event) {
    this.product = event.target.value;
  }
  getType(event) {
    this.transactionType = event.target.value;
  }
  getVendor(event) {
    this.vendor = event.target.value;
  }
  getVendorType(event) {
    this.vendorType = event.target.value;
  }
  getStatus(event) {
    this.transactionStatus = event.target.value;
  }
  getRef(event) {
    this.filter = event.target.value;
  }
  searchTrans() {
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.getFilter();
    this.filterData = {
      dateRange: this.range,
      terminalId: this.terminalId ? this.terminalId : "",
      walletId: this.walletId ? this.walletId : "",
      accountNumber: this.accountNumber ? this.accountNumber : "",
      paymentMethod: this.paymentMethod ? this.paymentMethod : "",
      cardRRN: this.cardRRN ? this.cardRRN : "",
      transactionReference: this.transactionReference
        ? this.transactionReference
        : "",
      phoneNumber: this.phoneNumber ? this.phoneNumber : "",
      sequenceNumber: this.sequenceNumber ? this.sequenceNumber : "",
      debitReference: this.debitReference ? this.debitReference : "",
      product: this.product ? this.product : "",
      transactionType: this.transactionType ? this.transactionType : "",
      transactionStatus: this.transactionStatus ? this.transactionStatus : "",
      transactionChannel: this.transactionChannel
        ? this.transactionChannel
        : "",
      searchField: "",
      viewPage: "",
      vendType: this.vendType ? this.vendType : "",
      vendor: this.vendor ? this.vendor : ""
    };

    this.Transaction(this.filterData);
    this.TransactionSummary(this.filterData);
    // console.log(this.filterData);

    //this.socket.disconnectSocket();
  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == "Sequence Number") {
      this.sequenceNumber = this.filterValue;
    } else if (this.filter == "Transaction Ref") {
      this.transactionReference = this.filterValue;
    } else if (this.filter == "Debit Reference") {
      this.debitReference = this.filterValue;
    } else if (this.filter == "Terminal ID") {
      this.terminalId = this.filterValue;
    } else if (this.filter == "Agent ID") {
      this.walletId = this.filterValue;
    } else if (this.filter == "Account number") {
      this.accountNumber = this.filterValue;
    } else if (this.filter == "Phone Number") {
      this.phoneNumber = this.filterValue;
    } else if (this.filter == "cardRRN") {
      this.cardRRN = this.filterValue;
    }
  }

  pageChanged(event: any): void {
    // this.loading = true;
    this.currentPage = event.page;
    console.log("current page", this.currentPage);

    this.searchTrans();
    // this.Transaction(this.payload);
    // this.Transaction(this.filterData);

    this.router.navigateByUrl("/cgate/transactions", {
      queryParams: { page: this.currentPage }
    });
  }
}
