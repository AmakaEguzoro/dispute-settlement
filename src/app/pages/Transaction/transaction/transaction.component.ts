import { Component, OnInit, OnDestroy } from "@angular/core";
import { TransactionService } from "app/_service/transaction.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink/dist/subsink";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ModelComponent } from "./model/model.component";
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
import * as fileSaver from "file-saver";
import { User } from "app/_models/user";
import { WebworkerService } from "app/web-worker/webworker.service";
import { EXCEL_EXPORT } from "app/web-worker/excel-export.script";
@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  // Details
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
  // filters
  searchForm: FormGroup;
  paymentMethod: any;
  vendor: any;
  provider: any;
  virtualTID: any;
  clientReference: any;
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
  pendingCount: any;
  pendingAmount: any;
  amount: any;
  cardPAN: any;
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
    transferProvider: "",
    virtualTID: "",
    clientReference: "",
    download: false,
  };

  // private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // private EXCEL_EXTENSION = 'xlsx';

  constructor(
    private transactionService: TransactionService,
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
      filterValue: [""],
    });
  }

  ngOnInit() {
    this.Transaction(this.payload);
    this.TransactionSummary(this.payload);
    this.walletBalance();
    setTimeout(() => {
      this.getSocketData();
    }, 0.05 * 60 * 1000);
  }

  getSocketData() {
    this.socket.getMessage().subscribe((Socketdata: any) => {
      let currentRole = this.userRole();
      if (currentRole >= 2) {
        console.log(Socketdata.data);
        this.detailsData.pop();
        this.detailsData.unshift(Socketdata.data);
        if (
          Socketdata.data.status == "failed" ||
          Socketdata.data.status == "declined"
        ) {
          this.failedAmount += parseInt(Socketdata.data.nairaAmount);
          this.failedCount = parseInt(this.failedCount) + 1;
          this.totalAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalCount += 1;
        } else if (Socketdata.data.status == "successful") {
          this.successCount += 1;
          this.successAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalCount += 1;
        }
      }
    });
  }

  userWallet() {
    return this.authService.currentUserWallet();
  }

  userRole(){
    return this.authService.currentUserRole();
  }

  userName() {
    const username = localStorage.getItem("loggedUser");
    return username;
  }

  walletBalance() {
    const username = localStorage.getItem("loggedEmail");
    const wallet = this.userWallet();
    let balance = {
      username: username,
      wallet: wallet,
    };
    this.transactionService.getWalletBalance(balance).subscribe(
      (data) => {
        this.userBalance = data;
      },
      (error) => {
        this.userBalance = null;
      }
    );
  }
  exportAsXLSX(): void {
    this.socket.disconnectSocket();
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
      transferProvider: this.provider ? this.provider : "",
      virtualTID: this.virtualTID ? this.virtualTID : "",
      clientReference: this.clientReference ? this.clientReference : "",
      download: true,
    };

    if (this.userName() != "Providus") {
      this.isData = true;
      this.loading = true;
      this.transactionService.getTransaction(this.filterData).subscribe(
        (data) => {
          this.loading = false;
          this.exportData = data.data.transactions;
          this.excelService.exportAsExcelFile(
            this.exportData,
            "ITEX-TranReport" + this.range
          );
        },
        (error) => {
          this.isData = false;
          this.loading = false;
          console.log("cant get transaction details", error);
        }
      );
    }
  }

  Transaction(payload) {
    this.isData = true;
    this.loading = true;
    this.transactionService.getTransaction(payload).subscribe(
      (data) => {
        this.loading = false;
        this.detailsData = data.data.transactions;
        console.log(this.detailsData);

        this.serial = 1 + (this.currentPage - 1) * this.perPage;
        this.lastPage = data.data.lastPage * this.perPage;
        console.log("Last Page logged", this.lastPage);
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get transaction details", error);
      }
    );
  }

  openModal(modal) {
    this.detailsData.response = modal;
    const initialState = {
      data: this.detailsData.response,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(ModelComponent, {
      initialState,
      class: "modal-lg",
    });
    //
  }

  headElements = [
    "S/N",
    "PRODUCT",
    "SEQUENCE",
    "AGENT ID",
    "TERMINAL",
    "V-TID",
    "ISSUER",
    "CHANNEL",
    "AMOUNT",
    "STATUS",
    "RESPONSE TIME",
    "DATE",
  ];

  TransactionSummary(payload) {
    this.isData = true;
    this.isLoading = true;
    this.transactionService.getTransactionSummary(payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summaryData = data.data;
        this.failedAmount = this.summaryData.failedAmount;
        this.failedCount = this.summaryData.failedCount;

        this.successCount = this.summaryData.successfulCount;
        this.successAmount = this.summaryData.successfulAmount;

        this.pendingCount = this.summaryData.initializedCount;
        this.pendingAmount = this.summaryData.initializedAmount;

        this.totalAmount = this.summaryData.totalAmount;
        this.totalCount = this.summaryData.transactionCount;
        this.usersCount = this.summaryData.usersCount;
      },
      (error) => {
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
    minYear: 1900,
    // disableUntil:
    //   { year: this.DateObj.getFullYear(), month: this.DateObj.getMonth(), day: this.DateObj.getDate() }
  };

  methods = ["Card", "Cash", "Mcash", "Cgate"];
  stat = ["Approved", "Declined", "Pending", "successful|nocredit"];
  vendTypes = ["B2B", "ITEX"];
  types = ["Postpaid", "Prepaid", "Smartcard"];
  channels = ["LINUXPOS", "MOBILE", "WEB", "ANDROIDPOS", "B2B", "USSD", "MPOS"];
  Refs = [
    "Amount",
    "Terminal ID",
    "Agent ID",
    "Sequence Number",
    "Transaction Ref",
    "Client Reference",
    "Account/Meter Number",
    "Phone Number",
    "cardRRN",
    "Virtual TID",
    "Card PAN"
  ];
  vendors = [
    "Itex",
    "Gecharl Resources",
    "PhilTech Solutions",
    "Vella",
    "GI Solutions",
    "Karosealliance",
    "Payant",
    "Now Now",
    "Mars Konnect",
    "FCube",
    "Zenith Vas",
    "XchangeBox",
    "Daphty",
    "GreyStone",
    "Call Phone",
  ];
  cashinService = ["ITEX_NIP", "GTB_NIP", "FIDELITY", "GTB-GAPS", "ETRANZACT"];
  products = [
    "IKEDC",
    "IBEDC",
    "EKEDC",
    "EEDC",
    "PHEDC",
    "AEDC",
    "KEDCO",
    "TRANSFER",
    "WITHDRAWAL",
    "MULTICHOICE",
    "MTNVTU",
    "MTNDATA",
    "MTNVTUSONITE",
    "MTNDATASONITE",
    "AIRTELDATA",
    "AIRTELVTU",
    "GLOVTU",
    "GLODATA",
    "ETISALATVTU",
    "ETISALATDATA",
    "RCN_FUND",
    "STARTIMES",
    "GEHS",
    "OLHS",
    "SMILE",
    "LCC",
  ];

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
  getProvider(event) {
    this.provider = event.target.value;
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
      paymentMethod: this.paymentMethod ? this.paymentMethod.toLowerCase() : "",
      cardRRN: this.cardRRN ? this.cardRRN : "",
      transactionReference: this.transactionReference
        ? this.transactionReference
        : "",
      phoneNumber: this.phoneNumber ? this.phoneNumber : "",
      sequenceNumber: this.sequenceNumber ? this.sequenceNumber : "",
      debitReference: this.debitReference ? this.debitReference : "",
      product: this.product ? this.product : "",
      transactionType: this.transactionType ? this.transactionType.toLowerCase() : "",
      transactionStatus: this.transactionStatus ? this.transactionStatus : "",
      transactionChannel: this.transactionChannel
        ? this.transactionChannel
        : "",
      searchField: "",
      viewPage: this.currentPage ? this.currentPage : "",
      vendType: this.vendType ? this.vendType : "",
      virtualTID: this.virtualTID ? this.virtualTID : "",
      clientReference: this.clientReference ? this.clientReference : "",
      vendor: this.vendor ? this.vendor : "",
      amount: this.amount ? this.amount : "",
      cardPAN: this.cardPAN ? this.cardPAN : "",

      transferProvider: this.provider ? this.provider : "",
    };

    this.Transaction(this.filterData);
    this.TransactionSummary(this.filterData);
    // console.log('filter',this.filterData);

    this.socket.disconnectSocket();
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
    } else if (this.filter == "Account/Meter Number") {
      this.accountNumber = this.filterValue;
    } else if (this.filter == "Phone Number") {
      this.phoneNumber = this.filterValue;
    } else if (this.filter == "cardRRN") {
      this.cardRRN = this.filterValue;
    } else if (this.filter == "Virtual TID") {
      this.virtualTID = this.filterValue;
    } else if (this.filter == "Client Reference") {
      this.clientReference = this.filterValue;
    } else if (this.filter == "Amount") {
      this.amount = this.filterValue;
    } else if (this.filter == "Card PAN") {
      this.cardPAN = this.filterValue;
    }
  }

  pageChanged(event: any): void {
    // this.loading = true;
    this.currentPage = event.page;
    console.log("current page", this.currentPage);

    this.searchTrans();
    // this.Transaction(this.payload);
    // this.Transaction(this.filterData);

    this.router.navigateByUrl("/transaction/details", {
      queryParams: { page: this.currentPage },
    });
  }
}
