import { ModalDirective } from "./../../../lib/ng-uikit-pro-standard/free/modals/modal.directive";
import { AgentserviceService } from "..//../_service/agentservice.service";
import { Component, OnInit, ViewChild } from "@angular/core";
// import { AuthService } from 'app/_auth/auth.service';
// import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
  ModalModule,
  WavesModule,
  InputsModule,
  ButtonsModule,
  ToastService,
} from "ng-uikit-pro-standard";

import { ExcelService } from "app/_service/excel.service";
import { IMyOptions } from "ng-uikit-pro-standard";
@Component({
  selector: "app-agentdashboard",
  templateUrl: "./agentdashboard.component.html",
  styleUrls: ["./agentdashboard.component.scss"],
})
export class AgentdashboardComponent implements OnInit {
  loading: boolean;
  isData: boolean;
  users: any;
  data: any;
  @ViewChild("validate") basicModal: ModalDirective;
  showing: any = "home";
  DateObj: any = new Date();
  dateRange = String(
    this.DateObj.getFullYear() +
      "/" +
      (this.DateObj.getMonth() + 1) +
      "/" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange}`;
  // bsModalRef: BsModalRef;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  searchString: string;
  totalItems = 10000;
  page = 1;

  limit = 50;
  prev_disable: boolean = true;
  pageRange: string;

  next_disable: boolean = false;
  // search;
  searchFieldSearch = "";
  searchForm: FormGroup;
  filterData: any;

  registerForm: FormGroup;
  summaryData: any;
  firstname: any;
  lastname: any;
  email: any;
  mobile: any;
  usertid: any;
  createdat: any;
  updatedat: any;
  rolename: any;
  permission: any;
  validated: any;
  document: any;
  updatedbio: any;
  agentData: any;
  validate: any;
  searchdata: any;
  searchData: any;
  exportjson: any;
  total: number;
  desc: any;
  asc: any;
  sort: string = "asc";
  startDate: any;
  endDate: any;
  range: string;
  start: any;
  end: any;
  constructor(
    // private modalService: BsModalService,
    private agentService: AgentserviceService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private excelService: ExcelService
  ) {
    this.searchForm = this.fb.group({
      startDate: ["", Validators.min],
      endDate: ["", Validators.min],
    });
  }

  ngOnInit() {
    this.AgentSummary();
  }

  headElements = [
    "S/N",
    "FIRSTNAME",
    "LASTNAME",
    "EMAIL",
    "PHONE NO",
    "AGENT TID",
    "CREATED AT",
    "UPDATED AT",
    "VALIDATED",
    "DOCUMENT",
    "UPDATED BIO",
    "ACTION",
  ];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };
  AgentSummary() {
    this.isData = true;
    this.loading = true;
    this.agentService.getAgentTable(this.limit, this.page, this.sort).subscribe(
      (data: any) => {
        this.loading = false;

        this.summaryData = data.data;
        this.total = Math.ceil(data.totalcount / this.limit);
        this.serial = 1 + (this.page - 1) * this.perPage;
        if (this.page == this.total) {
          this.next_disable = true;
        }
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent summary details", error);
      }
    );
  }

  pageChanged(event: any): void {
    // this.loading = true;
    this.page = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/onboarding/dashboard", {
      queryParams: { page: this.page },
    });
  }
  next() {
    this.page += 1;

    if (this.page >= this.total) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.AgentSummary();
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.AgentSummary();
  }

  showagent(id, show) {
    this.isData = true;
    this.loading = true;
    this.agentService.getAgentDetails(id).subscribe(
      (data: any) => {
        this.loading = false;
        this.agentData = data.data;
        this.showing = show;
        console.log(this.agentData, "timbet");
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent details", error);
      }
    );
  }

  validateagent(id) {
    console.log(id);
    this.isData = true;
    this.loading = true;
    this.agentService.validateAgent(id).subscribe(
      (data: any) => {
        this.loading = false;
        this.basicModal.hide();
        this.validate = data;
        this.toastService.success(data.message || "Agent Validated");
        this.AgentSummary();
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        this.basicModal.hide();
        this.toastService.error(
          "Please provide neccessary documents",
          "Validation Error"
        );
        console.log("cant validate agent", error);
        this.AgentSummary();
      }
    );
  }

  handleChange(data) {
    this.AgentSummary();
    this.showing = data;
  }

  exportAgent() {
    this.isData = true;
    this.loading = true;
    this.agentService.exportAgent().subscribe(
      (data: any) => {
        this.loading = false;
        this.exportjson = data.data.map((item) => {
          item.mobile = item.mobile[0];
          item.email = item.email[0];
          return item;
        });
        console.log(this.exportjson);
        console.log(data.data);

        this.excelService.exportAsExcelFile(
          this.exportjson,
          "Agent Onboarding" + this.dateRange
        );
        this.toastService.success("Table Exported Successfully");
      },

      (error) => {
        this.isData = false;
        this.loading = false;
        this.toastService.error("Please retry Export", "Export Error");
        console.log("cant export agents", error);
        this.ngOnInit();
      }
    );
    this.ngOnInit();
  }

  searchAgentID(id) {
    id = this.searchString;
    this.isData = true;
    this.loading = true;
    this.agentService.searchAgent(id).subscribe(
      (data: any) => {
        this.loading = false;
        this.summaryData = data.data;
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent summary details", error);
        this.AgentSummary();
      }
    );
  }

  sortAgent() {
    // console.log("sortfirst", this.sort);
    // if ((this.sort = "asc")) {
    //   this.sort = "desc";
    // }
    // this.sort = "asc";
    this.sort = this.sort == "asc" ? "desc" : "asc";
    console.log(this.sort, "sort");
    this.AgentSummary();
  }

  searchAgent() {
    this.startDate = this.searchForm.value.startDate;
    this.endDate = this.searchForm.value.endDate;
    console.log(this.startDate, this.endDate, "date");
    this.loading = true;
    this.agentService.rangeAgent(this.startDate, this.endDate).subscribe(
      (data: any) => {
        this.loading = false;
        this.summaryData = data.data;
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent summary details", error);
        this.AgentSummary();
      }
    );
  }
}
