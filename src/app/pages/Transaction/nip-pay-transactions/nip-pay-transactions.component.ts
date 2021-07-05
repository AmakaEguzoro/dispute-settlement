import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { TransactionService } from "app/_service/transaction.service";
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
import { ModelComponent } from "../transaction/model/model.component";

@Component({
  selector: 'app-nip-pay-transactions',
  templateUrl: './nip-pay-transactions.component.html',
  styleUrls: ['./nip-pay-transactions.component.scss']
})
export class NipPayTransactionsComponent implements OnInit {
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
  failedPercent: any; sucessPercent: any;
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
    accountNumber: "",
    clientReference: "",
    transactionReference: "",
    transactionStatus: "",
    viewPage: "",
    download: false,

  };
  modaldata: any;
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private modalService: BsModalService,
    private socket: SocketService,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private authService: AuthService,
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
    this.walletBalance();
    setTimeout(() => {
      this.getSocketData();
    }, 0.05 * 60 * 1000);
  }

  getSocketData() {
    this.socket.getMessage().subscribe((Socketdata: any) => {
      let currentRole = this.userRole();
      if (currentRole >= 2) {
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

  userRole() {
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
      accountNumber: this.accountNumber ? this.accountNumber : "",
      clientReference: this.clientReference ? this.clientReference : "",
      transactionReference: this.transactionReference ? this.transactionReference : "",
      transactionStatus: this.transactionStatus ? this.transactionStatus : "",
      viewPage: "",
      download: true,

    };

    if (this.userName() != "Providus") {
      this.isData = true;
      this.loading = true;
      this.transactionService.getTransaction(this.filterData).subscribe(
        (data) => {
          this.loading = false;
          this.exportData = data.transactions;
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
    this.transactionService.getNipPay(payload).subscribe(
      (data) => {
        this.loading = false;
        this.detailsData = data.transactions;

        this.failedAmount = data.failedAmount;
        this.failedCount = data.failedCount;

        this.successCount = data.successfulCount;
        this.successAmount = data.successfulAmount;

        this.pendingCount = data.pendingCount;
        this.pendingAmount = data.pendingAmount;

        this.totalAmount = data.successfulAmount + data.failedAmount + data.pendingAmount;
        this.totalCount = data.successfulCount + data.failedCount + data.pendingCount;

        this.serial = 1 + (this.currentPage - 1) * data.perPage;
        this.lastPage = data.lastPage * data.perPage;
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
  }

  headElements = [
    "S/N",
    "NAME",
    "ACCOUNT",
    "AMOUNT",
    "REFERENCE",
    "PRODUCT",
    "STATUS",
    "DATE",
  ];



  // filters
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };

  stat = ["Approved", "Declined", "Pending", "successful|nocredit"];
  Refs = [
    "Account",
    "Reference",
    "Status",
  ];


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
      accountNumber: this.accountNumber ? this.accountNumber : "",
      clientReference: this.clientReference ? this.clientReference : "",
      transactionReference: this.transactionReference ? this.transactionReference : "",
      transactionStatus: this.transactionStatus ? this.transactionStatus : "",
      viewPage: "",
      // download: true,
    };

    this.Transaction(this.filterData);
    // console.log('filter',this.filterData);

    this.socket.disconnectSocket();
  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == "Reference") {
      this.transactionReference = this.filterValue;
    } else if (this.filter == "Account") {
      this.accountNumber = this.filterValue;
    } else if (this.filter == "Status") {
      this.transactionStatus = this.filterValue;
    }
}

pageChanged(event: any): void {
  this.currentPage = event.page;
  this.searchTrans();
  this.router.navigateByUrl("/transaction/details", {
    queryParams: { page: this.currentPage },
  });
}
}
