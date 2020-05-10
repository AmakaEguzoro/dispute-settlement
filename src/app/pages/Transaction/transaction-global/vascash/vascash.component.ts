import { ModalDirective } from "./../../../../../lib/ng-uikit-pro-standard/free/modals/modal.directive";
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

@Component({
  selector: "app-vascash",
  templateUrl: "./vascash.component.html",
  styleUrls: ["./vascash.component.scss"],
})
export class VascashComponent implements OnInit {
  @Input() showing;
  @Input() vascashtotal: number;
  @Input() filterData;
  @Output() displayhome = new EventEmitter();
  @ViewChild("table") table: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild("row") row: ElementRef;
  @ViewChild("basicModal") basicModal: ModalDirective;
  isData: boolean;
  isLoading: boolean;
  searchText: string = "";
  previous: string;
  showboundarylinks: true;
  summaryagent: [];
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;

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
  srange = 1;
  endRange: number;
  prev_disable: boolean = true;
  next_disable: boolean = false;
  limit: number = 50;
  http: any;
  exportDetails: {
    startDate: any;
    endDate: any;
    channel: any;
    paymentType: any;
    pageRange: any;

    download: boolean;
  };
  pageRange: string;
  total: number;
  constructor(
    private tableService: TransactionglobalService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private excelService: ExcelService
  ) {}
  maxVisibleItems: number = 5;
  ngOnInit() {
    this.filterData = this.filterData;
    this.total = Math.ceil(this.vascashtotal / this.limit);
    this.endRange = this.total;
    this.TableSummary();
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
      paymentType: "cash",
      page: this.page - 1,
      limit: this.limit,
      download: false,
    };
    this.isData = true;
    this.isLoading = true;
    this.tableService.exportTable(payload).subscribe(
      (data) => {
        this.isLoading = false;
        this.summarytrans = data;

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
    this.currentPage = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/transaction/global", {
      queryParams: { page: this.currentPage },
    });
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
    this.pageRange = `${this.srange}-${this.endRange}`;
    console.log(this.pageRange);
    this.exportDetails = {
      startDate: this.filterData ? this.filterData.startDate : "",
      endDate: this.filterData ? this.filterData.endDate : "",
      channel: this.filterData ? this.filterData.channel : "",
      paymentType: "cash",
      pageRange: this.pageRange,
      download: true,
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
            "ITEX-VasCashReport" + this.range
          );
        },
        (error) => {
          this.isData = false;
          this.isLoading = false;
          console.log("cant get transaction details", error);
        }
      );
    }
    this.basicModal.hide();
  }
  userName() {
    const username = localStorage.getItem("loggedUser");
    return username;
  }
  next() {
    this.page += 1;
    if (this.page >= this.total) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.TableSummary();
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.TableSummary();
  }

  stepUp() {
    this.srange = this.srange + 1;
  }
  stepDown() {
    if (this.srange != 1) {
      this.srange = this.srange - 1;
    }
  }
  endUp() {
    this.endRange = this.endRange + 1;
  }
  endDown() {
    if (this.endRange != 1) {
      this.endRange = this.endRange - 1;
    }
  }
}
