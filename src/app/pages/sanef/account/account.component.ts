import { SanefService } from "./../../../_service/sanef.service";
import { Component, OnInit } from "@angular/core";

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

import { Router } from "@angular/router";
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
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { SocketService } from "app/_service/socket.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { IMyOptions } from "ng-uikit-pro-standard";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  isData: boolean;
  isLoading: boolean;
  showboundarylinks: true;
  summaryagent: [];
  // pagination
  searchString: string;
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
  searchForm: FormGroup;
  walletbalance: any;
  datservice: any;

  exportData: any;
  range: string;
  page = 1;
  accountNumber: any = "";
  phoneNumber: any = "";
  walletId: any = "";
  status: any = "";
  total: number;
  filter: any;
  filterValue: any;
  filterData: any;
  limit: number = 50;
  srange = 1;
  endRange: number;
  http: any;
  viewPage = 1;
  DateObj: any = new Date();
  dateRange = String(
    this.DateObj.getFullYear() +
      "-" +
      (this.DateObj.getMonth() + 1) +
      "-" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange} - ${this.dateRange}`;
  prev_disable: boolean = true;
  pageRange: string;
  startDate: any = "2020 - 03 - 01";
  endDate: any = this.dateRange;
  payload = {
    dateRange: "",
    walletId: "",
    accountNumber: "",
    phoneNumber: "",
    searchField: "",
    viewPage: "",
    download: false,
  };
  next_disable: boolean = false;
  summaryaccount: any;
  agentPayviceId: any = "";
  constructor(
    private sanefService: SanefService,
    private router: Router,
    private fb: FormBuilder,
    private excelService: ExcelService
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
    "Name",
    "Wallet ID",
    "Email",
    "PhoneNo",
    "AccountNo",
    "Status",
    "Type",
    "Bank",
    "Gender",
    "City",
  ];
  Refs = ["Wallet ID", "Account Number", "Phone Number", "Status"];

  TableSummary() {
    this.isData = true;
    this.isLoading = true;
    console.log(this.endDate, "endDate");
    this.sanefService
      .getAccounts(
        this.startDate,
        this.endDate,
        this.status,
        this.agentPayviceId,
        this.accountNumber,
        this.phoneNumber,
        this.viewPage
      )
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.summaryaccount = data.data;
          console.log(this.summaryaccount);
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
    this.viewPage = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/sanef/account", {
      queryParams: { page: this.viewPage },
    });
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
    if (this.viewPage == 1) {
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
  searchTrans() {
    this.startDate = this.searchForm.value.startDate;
    this.endDate = this.searchForm.value.endDate;
    this.getFilter();
    this.status = this.status ? this.status : "";
    this.agentPayviceId = this.agentPayviceId ? this.agentPayviceId : "";
    this.accountNumber = this.accountNumber ? this.accountNumber : "";
    this.phoneNumber = this.phoneNumber ? this.phoneNumber : "";
    this.viewPage = this.viewPage;
    this.TableSummary();
  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == "Account Number") {
      this.accountNumber = this.filterValue;
    } else if (this.filter == "Wallet ID") {
      this.agentPayviceId = this.filterValue;
    } else if (this.filter == "Phone Number") {
      this.phoneNumber = this.filterValue;
    } else if (this.filter == "Status") {
      this.status = this.filterValue;
    }
  }

  exportAsXLSX(): void {
    // this.start = this.searchForm.value.startDate;
    // this.end = this.searchForm.value.endDate;
    // this.range = `${this.start} - ${this.end}`;
    // this.filterData = {
    //   dateRange: this.range,
    //   walletId: this.walletId ? this.walletId : "",
    //   accountNumber: this.accountNumber ? this.accountNumber : "",
    //   phoneNumber: this.phoneNumber ? this.phoneNumber : "",
    //   searchField: "",
    //   viewPage: "",
    //   download: true,
    // };
    // if (this.userName() != "Providus") {
    //   this.isData = true;
    //   this.isLoading = true;
    //   this.sanefService.getAccounts(this.filterData).subscribe(
    //     (data) => {
    //       this.isLoading = false;
    //       this.exportData = data.data;
    //       this.excelService.exportAsExcelFile(
    //         this.exportData,
    //         "ITEX-SanefAccount" + this.range
    //       );
    //     },
    //     (error) => {
    //       this.isData = false;
    //       this.isLoading = false;
    //       console.log("cant get transaction details", error);
    //     }
    //   );
    // }
  }
}
