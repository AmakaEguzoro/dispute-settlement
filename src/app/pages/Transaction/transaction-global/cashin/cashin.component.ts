import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { TransactionglobalService } from "..//..//..//..//_service/transactionglobal.service";
import { Router } from "@angular/router";
import { ExcelService } from "app/_service/excel.service";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from "ng-uikit-pro-standard";
import * as XLSX from "xlsx";
import { interval } from "rxjs/";
@Component({
  selector: "app-cashin",
  templateUrl: "./cashin.component.html",
  styleUrls: ["./cashin.component.scss"],
})
export class CashinComponent implements OnInit {
  @Input() showing;
  @Input() filterData;
  @Output() displayhome = new EventEmitter();
  @ViewChild("table") table: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild("row") row: ElementRef;
  isData: boolean;
  isLoading: boolean;
  searchText: string = "";
  previous: [];
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
  summarytrans: any;
  start: any;
  end: any;
  dateRange: any;
  walletbalance: any;
  datservice: any;
  filter: { this: any; download: boolean };
  exportData: any;
  range: string;
  page = 1;

  http: any;
  exportDetails: {
    startDate: any;
    endDate: any;
    channel: any;
    paymentType: any;
    product: string;
    download: boolean;
  };

  prev_disable: boolean = true;
  constructor(
    private tableService: TransactionglobalService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private excelService: ExcelService
  ) {}
  maxVisibleItems: number = 5;
  ngOnInit() {
    this.filterData = this.filterData;
    this.TableSummary();
    // this.intercall();
  }

  headElements = [
    "S/N",
    "Reference",
    "Product",
    "Transaction Amount",
    "Terminal",
    "Payment Method",
    "Channel",
    "Status",
    "Date",
  ];

  TableSummary() {
    const payload = {
      startDate: this.filterData ? this.filterData.startDate : "",
      endDate: this.filterData ? this.filterData.endDate : "",
      channel: this.filterData ? this.filterData.channel : "",
      paymentType: this.filterData ? this.filterData.paymentType : "",
      product: "transfer",
      download: false,
      page: this.page - 1,
      limit: "50",
    };
    console.log(this.page, "bet");
    this.isData = true;
    this.isLoading = true;
    this.tableService.exportTable(payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summarytrans = data;
        console.log(payload);
        this.serial = 1 + (this.page - 1) * this.perPage;
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

    this.router.navigateByUrl("/transaction/global", {
      queryParams: { page: this.page },
    });
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

  // exportAsXLSX(): void {
  //   this.start = this.filterData.startDate;
  //   this.end = this.filterData.endDate;
  //   this.range = `${this.start} - ${this.end}`;
  //   console.log(this.filterData, "export");
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
  //     this.table.nativeElement
  //   );
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   /* save to file */
  //   XLSX.writeFile(wb, "transactions.xlsx");
  // }

  exportAssXLSX(): void {
    (this.start = this.filterData ? this.filterData.startDate : ""),
      (this.end = this.filterData ? this.filterData.endDate : ""),
      (this.range = `${this.start} - ${this.end}`);
    this.exportDetails = {
      startDate: this.filterData ? this.filterData.startDate : "",
      endDate: this.filterData ? this.filterData.endDate : "",
      channel: this.filterData ? this.filterData.channel : "",
      paymentType: this.filterData ? this.filterData.paymentType : "",
      product: "transfer",
      download: false,
    };

    if (this.userName() != "Providus") {
      this.isData = true;
      this.isLoading = true;
      this.tableService.exportTable(this.exportDetails).subscribe(
        (data) => {
          this.isLoading = false;
          this.exportData = data;
          this.excelService.exportAsExcelFile(
            this.exportData,
            "ITEX-CashInReport" + this.range
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

  intercall() {
    setInterval(() => {
      this.TableSummary();
    }, 20000);
  }
}
