import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { TransactionglobalService } from "..//..//..//..//_service/transactionglobal.service";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import { ExcelService } from "app/_service/excel.service";
@Component({
  selector: "app-table2",
  templateUrl: "./table2.component.html",
  styleUrls: ["./table2.component.scss"],
})
export class Table2Component implements OnInit {
  @Input() showing;
  @Input() filterData;
  @Output() displayhome = new EventEmitter();
  @ViewChild("table") table: ElementRef;
  isData: boolean;
  isLoading: boolean;
  prev_disable: boolean = true;
  page = 1;
  sortBalance: any;
  summaryagent: [];
  perPage = 50;
  currentPage = 1;
  lastPage: number = 10;
  serial: number;
  maxSize = 10;
  start: string;
  end: string;
  range: string;
  sort = "descending";
  payload: {
    startDate: any;
    endDate: any;
    channel: any;
    paymentType: any;
    sortBalance: string;
    limit: string;
    page: number;
  };
  exportDetails: {
    startDate: string;
    endDate: string;
    sortBalance: any;
    download: boolean;
  };
  exportData: any;

  constructor(
    private tableService: TransactionglobalService,
    private router: Router,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.TableSummary();
  }
  sorts = [
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
  ];

  headElements = [
    "S/N",
    "Agent Name/ID",
    "Wallet ID",
    "Wallet Balance",
    "Date Created",
    "Last Transaction Date",
  ];

  TableSummary() {
    this.payload = {
      startDate: this.filterData ? this.filterData.startDate : "",
      endDate: this.filterData ? this.filterData.endDate : "",
      channel: this.filterData ? this.filterData.channel : "",
      paymentType: this.filterData ? this.filterData.paymentType : "",
      limit: "50",
      sortBalance: this.sortBalance,
      page: this.page - 1,
    };
    this.isData = true;
    this.isLoading = true;
    this.tableService.getAgentTable(this.payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summaryagent = data;
        this.serial = 1 + (this.page - 1) * this.perPage;
      },
      (error) => {
        this.isData = false;
        this.isLoading = false;
        console.log("cant get agents details", error);
      }
    );
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
      this.tableService.getAgentTable(this.exportDetails).subscribe(
        (data) => {
          this.isLoading = false;
          this.exportData = data;
          this.excelService.exportAsExcelFile(
            this.exportData,
            "ITEX-AgentReport" + this.range
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
  getChannel(event) {
    this.sortBalance = event.target.value;

    this.TableSummary();
  }
  next() {
    this.page += 1;
    this.prev_disable = false;
    this.TableSummary();
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.TableSummary();
  }
}
