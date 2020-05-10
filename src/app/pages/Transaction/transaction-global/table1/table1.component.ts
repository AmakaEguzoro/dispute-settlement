import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  HostListener,
  AfterViewInit,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { TransactionglobalService } from "..//..//..//..//_service/transactionglobal.service";
import { Router } from "@angular/router";
import { ExcelService } from "app/_service/excel.service";
import { IMyOptions } from "ng-uikit-pro-standard";
import * as XLSX from "xlsx";
@Component({
  selector: "app-table1",
  templateUrl: "./table1.component.html",
  styleUrls: ["./table1.component.scss"],
})
export class Table1Component implements OnInit {
  @Input() showing;
  @Output() displayhome = new EventEmitter();
  @ViewChild("table") table: ElementRef;
  start: string;
  end: string;
  range: string;
  payload: {
    startDate: string;
    endDate: string;
    channel: string;
    paymentType: string;
    limit: string;
    sortBalance: string;
    page: number;
  };
  exportDetails: {
    startDate: string;
    endDate: string;
    sortBalance: string;
    download: boolean;
  };
  exportData: any;
  sortBalance: any;
  sorrtBalance: any;
  constructor(
    private tableService: TransactionglobalService,
    private router: Router,
    private excelService: ExcelService
  ) {}
  isData: boolean;
  isLoading: boolean;
  summaryuser: [];

  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  prev_disable: boolean = true;
  page = 1;
  ngOnInit() {
    this.TableSummary();
  }
  sorts = [
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
  ];
  sort = "descending";
  headElements = [
    "SN",
    "Username",
    "User Type",
    "Wallet ID",
    "Online",
    "Wallet Balance",
    "Date Created",
  ];
  getChannel(event) {
    this.sortBalance = event.target.value;

    this.TableSummary();
  }

  TableSummary() {
    this.payload = {
      startDate: "",
      endDate: "",
      channel: "",
      paymentType: "",
      limit: "50",
      sortBalance: this.sortBalance,
      page: this.page - 1,
    };
    this.isData = true;
    this.isLoading = true;
    this.tableService.getUserTable(this.payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summaryuser = data;
        console.log(this.summaryuser);
        this.serial = 1 + (this.page - 1) * this.perPage;
      },
      (error) => {
        this.isData = false;
        this.isLoading = false;
        console.log("cant get users details", error);
      }
    );
  }

  pageChanged(event: any): void {
    // this.loading = true;
    this.currentPage = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/transaction/global", {
      queryParams: { page: this.currentPage },
    });
  }

  exportAsXLSX(): void {
    this.start = this.payload.startDate;
    this.end = this.payload.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.exportDetails = {
      startDate: this.start ? this.start : "",
      endDate: this.end ? this.end : "",
      sortBalance: this.sortBalance ? this.sortBalance : "",
      download: true,
    };

    if (this.userName() != "Providus") {
      this.isData = true;
      this.isLoading = true;
      this.tableService.getUserTable(this.exportDetails).subscribe(
        (data) => {
          this.isLoading = false;
          this.exportData = data;
          this.excelService.exportAsExcelFile(
            this.exportData,
            "ITEX-UserReport" + this.range
          );
        },
        (error) => {
          this.isData = false;
          this.isLoading = false;
          console.log("cant get transaction details", error);
        }
      );
    }
  }

  userName() {
    const username = localStorage.getItem("loggedUser");
    return username;
  }

  next() {
    this.page += 1;
    this.prev_disable = false;
    this.TableSummary();
    console.log(this.payload);
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.TableSummary();
  }
}
