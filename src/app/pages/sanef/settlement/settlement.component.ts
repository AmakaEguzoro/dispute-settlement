import { Component, OnInit } from "@angular/core";
import { SanefService } from "./../../../_service/sanef.service";
import {
  Input,
  ElementRef,
  HostListener,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Router } from "@angular/router";
// import { SanefModelComponent } from "./model/model.component";
import { ExcelService } from "app/_service/excel.service";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
  ModalModule,
  WavesModule,
  InputsModule,
  ButtonsModule,
} from "ng-uikit-pro-standard";
import { SubSink } from "subsink/dist/subsink";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { IMyOptions } from "ng-uikit-pro-standard";
import { SettlementModalComponent } from "./settlement-modal/settlement-modal.component";
@Component({
  selector: "app-settlement",
  templateUrl: "./settlement.component.html",
  styleUrls: ["./settlement.component.scss"],
})
export class SettlementComponent implements OnInit {
  isData: boolean;
  isLoading: boolean;
  showboundarylinks: true;
  summaryagent: [];
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  reload: any;
  isInterval: boolean;
  summaryTrans: any;
  start: any;
  end: any;
  // modal
  bsModalRef: BsModalRef;
  private subs = new SubSink();
  socketData: any;
  disabled: true;
  customerName: string = "";
  customerAccountNumber: string = "";
  trackingId: string = "";
  disputeStatus: string = "";
  agentCode: string = "";
  bank: string = "";
  agentPayviceId: string = "";
  requestId: string = "";
  transactionDate: string = "";
  // amount: any;
  datservice: any;
  viewPage = 1;
  exportData: any;
  range: string;
  page = 1;
  total: number;
  limit: number = 50;
  srange = 1;
  endRange: number;
  http: any;
  filterValue: any;
  filterData: any;
  filter: any;
  prev_disable: boolean = true;
  pageRange: string;
  accountNumber: any = "";
  referenceNo: any = "";
  walletId: any = "";

  DateObj: any = new Date();
  dateRange =
    this.DateObj.getFullYear() +
    "-" +
    (this.DateObj.getMonth() + 1) +
    "-" +
    this.DateObj.getDate();
  newRange = `${this.dateRange} - ${this.dateRange}`;

  payload = {
    dateRange: this.newRange,
    customerName: "",
    customerAccountNumber: "",
    trackingId: "",
    amount: "",
    disputeStatus: "",
    agentCode: "",
    bank: "",
    agentPayviceId: "",
    transactionReference: "",
    requestId: "",
    transactionDate: "",
  };

  next_disable: boolean = false;
  summaryaccount: any;
  searchForm: FormGroup;
  type: any = "";
  transactionReference: any = "";
  transactionType: any = "";
  status: any = "";
  amount: any = "";
  startDate: any = "2020-03-01";
  endDate: any = this.dateRange;
  constructor(
    private sanefService: SanefService,
    private router: Router,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private modalService: BsModalService
  ) {
    this.searchForm = this.fb.group({
      startDate: ["", Validators.min],
      endDate: ["", Validators.min],
      filterValue: [""],
    });
  }

  ngOnInit() {
    this.TableSummary();
  }
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy-mm-dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };

  headElements = [
    "S/N",
    "CUSTOMER NAME",
    "CUSTOMER ACCOUNT NO",
    "TRACKING ID",
    "AMOUNT",
    "DISPUTE STATUS",
    "AGENT CODE",
    "BANK",
    "PAYVICE ID",
    "TRANSACTION REFERENCE",
    "REQUEST ID",
    "TRANSACTION DATE",
  ];
  Refs = [
    "Account Number",
    "Customer Name",
    "Bank",
    "Payvice Id",
    "Agent Code",
    "Dispute Status",
    "Amount",
  ];

  TableSummary() {
    this.isData = true;
    this.isLoading = true;
    console.log(this.endDate, "endDate");

    this.sanefService
      .getDisputeTrans(
        this.customerName,
        this.customerAccountNumber,
        this.trackingId,
        this.amount,
        this.disputeStatus,
        this.agentCode,
        this.bank,
        this.agentPayviceId,
        this.transactionReference,
        this.requestId,
        this.transactionDate
      )
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.summaryTrans = data;
          console.log(this.summaryTrans, "summarytrans");
          this.total = Math.ceil(data.totalItems / this.limit);
          this.serial = 1 + (this.viewPage - 1) * this.perPage;
        },
        (error) => {
          this.isData = false;
          this.isLoading = false;
          console.log("cant get transaction details", error);
        }
      );
  }

  pageChanged(event: any): void {
    // this.loading = true;
    this.page = event.page;
    console.log("current page", this.currentPage);

    this.searchDispute();

    this.router.navigateByUrl(
      "http://197.253.19.78:9913/disputes/GetDisputeTrans",
      {
        queryParams: { page: this.page },
      }
    );
  }
  next() {
    this.viewPage += 1;
    if (this.viewPage >= this.total) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.TableSummary();
  }

  prev() {
    this.viewPage -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.TableSummary();
  }

  userName() {
    const username = localStorage.getItem("loggedUser");
    return username;
  }

  intercall() {
    setInterval(() => {
      this.TableSummary();
    }, 20000);
  }

  getRef(event) {
    this.filter = event.target.value;
  }
  searchDispute() {
    this.startDate = this.searchForm.value.startDate;
    this.endDate = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.getFilter();
    this.customerName = this.customerName ? this.customerName : "";
    this.customerAccountNumber = this.customerAccountNumber
      ? this.customerAccountNumber
      : "";
    this.agentPayviceId = this.agentPayviceId ? this.agentPayviceId : "";
    this.agentCode = this.agentCode ? this.agentCode : "";
    this.disputeStatus = this.disputeStatus ? this.disputeStatus : "";
    this.amount = this.amount ? this.amount : "";
    this.bank = this.bank ? this.bank : "";
    this.viewPage = this.viewPage;
    this.TableSummary();
  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == "Account Number") {
      this.customerAccountNumber = this.filterValue;
    } else if (this.filter == "Payvice ID") {
      this.agentPayviceId = this.filterValue;
    } else if (this.filter == "Customer Name") {
      this.customerName = this.filterValue;
    } else if (this.filter == "TransactionReference") {
      this.transactionReference = this.filterValue;
    } else if (this.filter == "Bank") {
      this.bank = this.filterValue;
    } else if (this.filter == "Dispute Status") {
      this.disputeStatus = this.filterValue;
    } else if (this.filter == "amount") {
      this.amount = this.filterValue;
    }
  }

  // exportAsXLSX(): void {
  //   this.start = this.searchForm.value.startDate;
  //   this.end = this.searchForm.value.endDate;
  //   this.range = `${this.start} - ${this.end}`;
  //   this.filterData = {
  //     dateRange: this.range,
  //     walletId: this.walletId ? this.walletId : "",
  //     accountNumber: this.accountNumber ? this.accountNumber : "",
  //     phoneNumber: this.phoneNumber ? this.phoneNumber : "",
  //     searchField: "",
  //     viewPage: "",
  //     download: true,
  //   };
  //   if (this.userName() != "Providus") {
  //     this.isData = true;
  //     this.isLoading = true;
  //     this.sanefService.getTransactions().subscribe(
  //       (data:any) => {
  //         this.isLoading = false;
  //         this.exportData = data;
  //         this.excelService.exportAsExcelFile(
  //           this.exportData,
  //           "ITEX-SanefTrans" + this.range
  //         );
  //       },
  //       (error) => {
  //         this.isData = false;
  //         this.isLoading = false;
  //         console.log("cant get transaction details", error);
  //       }
  //     );
  //   }
  // }

  openModal(modal) {
    this.summaryTrans.response = modal;
    const initialState = {
      data: this.summaryTrans.response,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(SettlementModalComponent, {
      initialState,
      class: "modal-lg",
    });
  }
}
