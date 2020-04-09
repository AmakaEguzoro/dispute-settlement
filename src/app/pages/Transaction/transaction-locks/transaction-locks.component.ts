import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TransactionService } from "app/_service/transaction.service";
import { Router } from "@angular/router";
import { IMyOptions, ToastService } from "ng-uikit-pro-standard";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { SocketService } from "app/_service/socket.service";
@Component({
  selector: "app-transaction-locks",
  templateUrl: "./transaction-locks.component.html",
  styleUrls: ["./transaction-locks.component.scss"],
})
export class TransactionLocksComponent implements OnInit {
  isData: boolean;
  loading = true;
  locksData: any;
  data: any;
  tranLockAmount: any;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  // filters
  searchForm: FormGroup;
  filter: any;
  filterValue: any;
  transactionReference: any;
  walletId: any;
  filterData: any;
  start: any;
  end: any;
  range: any;
  modalRef: BsModalRef;

  DateObj: any = new Date();
  dateRange = String(
    this.DateObj.getFullYear() +
      "/" +
      (this.DateObj.getMonth() + 1) +
      "/" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    dateRange: this.newRange,
    walletId: "",
    transactionReference: "",
    viewPage: "",
    // "download": false,
  };

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastService: ToastService
  ) {
    this.searchForm = this.fb.group({
      method: ["", Validators.min],
      startDate: ["", Validators.min],
      endDate: ["", Validators.min],
      filterValue: [""],
    });
  }

  ngOnInit() {
    this.TransactionLocks(this.payload);
  }

  TransactionLocks(payload) {
    this.isData = true;
    this.loading = true;
    this.transactionService.getTransactionLocks(payload).subscribe(
      (data) => {
        this.loading = false;
        this.locksData = data.transactions;
        this.serial = 1 + (this.currentPage - 1) * this.perPage;
        this.lastPage = data.lastPage * this.perPage;
        this.tranLockAmount = data.tranLockAmount;
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get transaction locks", error);
      }
    );
  }

  removeTransactionLocks(item) {
    this.loading = true;
    let load = {
      wallet: item.wallet,
      reference: item.reference,
      amount: item.amount,
    };
    this.transactionService.removeTransactionLocks(load).subscribe(
      (data) => {
        this.loading = false;
        this.toastService.success(data.message);
      },
      (error) => {
        this.loading = false;
        this.toastService.error(error);
        console.log("cant remove transaction locks", error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  decline(): void {
    this.modalRef.hide();
  }

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.TransactionLocks(this.payload);
    this.router.navigateByUrl("/transaction/locks", {
      queryParams: { page: this.currentPage },
    });
  }

  // filters
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy/mm/dd",
    startDate: this.dateRange,
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
    // disableUntil:
    //   { year: this.DateObj.getFullYear(), month: this.DateObj.getMonth(), day: this.DateObj.getDate() }
  };

  Refs = ["Agent ID", "Transaction Ref"];

  getRef(event) {
    this.filter = event.target.value;
  }

  searchTrans() {
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.getFilter();
    this.filterData = {
      dateRange: this.range,
      walletId: this.walletId ? this.walletId : "",
      transactionReference: this.transactionReference
        ? this.transactionReference
        : "",
      viewPage: "",
      // "download": false
    };
    console.log(this.filterData);
    this.TransactionLocks(this.filterData);
  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == "Agent ID") {
      this.walletId = this.filterValue;
    } else if (this.filter == "Transaction Ref") {
      this.transactionReference = this.filterValue;
    }
  }
}
