import { Component, OnInit } from "@angular/core";
import { SanefService } from "../../../../_service/sanef.service";
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
@Component({
  selector: "app-settlement-modal",
  templateUrl: "./settlement-modal.component.html",
  styleUrls: ["./settlement-modal.component.scss"],
})
export class SettlementModalComponent implements OnInit {
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

  DateObj: any = new Date();
  dateRange =
    this.DateObj.getFullYear() +
    "-" +
    (this.DateObj.getMonth() + 1) +
    "-" +
    this.DateObj.getDate();
  newRange = `${this.dateRange} - ${this.dateRange}`;

  next_disable: boolean = false;
  summaryaccount: any;
  searchForm: FormGroup;
  type: any = "";

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

  ngOnInit() {}
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy-mm-dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };
}
