import { Component, OnInit, OnDestroy } from "@angular/core";
import { TransactionService } from "app/_service/transaction.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink/dist/subsink";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
// import { ModelComponent } from "./model/model.component";
import { SocketService } from "app/_service/socket.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { formatDate } from "@angular/common";
import { ToastService } from "ng-uikit-pro-standard";
import { NqrserviceService } from "../../../_service/nqrservice.service";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { IMyOptions } from "ng-uikit-pro-standard";
import { ExcelService } from "app/_service/excel.service";
import { AuthService } from "app/_auth/auth.service";
import * as fileSaver from "file-saver";
import { User } from "app/_models/user";
import { WebworkerService } from "app/web-worker/webworker.service";
import { EXCEL_EXPORT } from "app/web-worker/excel-export.script";

@Component({
  selector: "app-nqr-transaction",
  templateUrl: "./nqr-transaction.component.html",
  styleUrls: ["./nqr-transaction.component.scss"],
})
export class NqrTransactionComponent implements OnInit {
  isData: boolean;
  loading = true;
  data: any;
  transaction: any;
  detailsData: any;
  page = 1;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  prev_disable: boolean = true;
  pageRange: string;
  searchForm: FormGroup;
  next_disable: boolean = false;

  summaryData: any;
  total: any;
  date: string;
  sort = "transdate";
  dir = "desc";
  from: string = "";
  to: string = "";
  // modal
  bsModalRef: BsModalRef;
  private subs = new SubSink();
  socketData: any;
  disabled: true;
  query: string = "";
  // Summary

  transactionSummary: any;
  failedAmount: any;

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
      "-" +
      ("0" + (this.DateObj.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + this.DateObj.getDate()).slice(-2)
  );

  // private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // private EXCEL_EXTENSION = 'xlsx';

  constructor(
    private nqrService: NqrserviceService,
    private toast: ToastService,

    private router: Router,
    private modalService: BsModalService,
    private socket: SocketService,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private authService: AuthService,
    private webworker: WebworkerService
  ) {}

  ngOnInit() {
    this.Transaction((this.page = 1));
    // this.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.from = this.dateRange;
    this.to = this.dateRange;
    console.log(this.from, this.to, "data");
    // setTimeout(() => {
    //   this.getSocketData();
    // }, 0.05 * 60 * 1000);
  }

  Transaction(page, from = this.dateRange, to = this.dateRange, query = "") {
    this.isData = true;
    this.loading = true;
    this.nqrService
      .getTransaction(page, this.perPage, from, to, query)
      .subscribe(
        (data: any) => {
          this.loading = false;
          console.log(data);
          this.detailsData = data.data.list.data;
          this.lastPage = data.data.list.last_page;

          this.serial = 1 + (this.page - 1) * this.perPage;
        },
        (error) => {
          this.isData = false;
          this.loading = false;
          console.log("cant get transaction details", error);
        }
      );
  }

  headElements = [
    "S/N",
    "REFRENCE",
    "TERMINAL ID",
    "SUBMERCHANT NO",
    "MERCHANT NO",
    "TYPE",
    "SERVICE",
    "ORDER NO",
    "ORDER SN",
    "INITIAL AMOUNT",
    "CHARGE",
    " TOTAL AMOUNT",
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

  exportTable() {
    this.loading = true;
    this.nqrService.exportTransaction().subscribe(
      (data: any) => {
        this.loading = false;
        this.exportData = data.data.transactions;

        this.excelService.exportAsExcelFile(
          this.exportData,
          "ITEX-Merchant-Nqr-Transaction-Report"
        );
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        this.toast.error(
          error.error.message
            ? error.error.message
            : "Can't Download, Please Try Again"
        );
        console.log("cant get agent summary details", error);
      }
    );
  }
  next() {
    this.page += 1;
    if (this.page >= this.lastPage) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.Transaction(this.page);
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.Transaction(this.page);
  }
  pageChanged(event: any): void {
    // this.loading = true;
    this.page = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/nqr/onboard-history", {
      queryParams: { page: this.page },
    });
  }
  searchTrans() {
    console.log(this.query);
    this.Transaction((this.page = 1), this.from, this.to, this.query);
  }
}
