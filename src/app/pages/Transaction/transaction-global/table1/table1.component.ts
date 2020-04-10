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
    page: number;
  };
  constructor(
    private tableService: TransactionglobalService,
    private router: Router
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

  headElements = [
    "SN",
    "Username",
    "User Type",
    "Wallet ID",
    "Online",
    "Wallet Balance",
    "Date Created",
  ];

  TableSummary() {
    this.payload = {
      startDate: "",
      endDate: "",
      channel: "",
      paymentType: "",
      limit: "50",
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

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, "users.xlsx");
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
