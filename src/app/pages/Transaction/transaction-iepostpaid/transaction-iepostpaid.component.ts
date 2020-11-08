import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/_service/transaction.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { ExcelService } from "app/_service/excel.service";


@Component({
  selector: 'app-transaction-iepostpaid',
  templateUrl: './transaction-iepostpaid.component.html',
  styleUrls: ['./transaction-iepostpaid.component.scss']
})
export class TransactionIepostpaidComponent implements OnInit {
  isData: boolean;
  loading = true;
  reversedData: any;
  data: any;
  reversedAmount: any;
  failedReversalAmount: any;
  bsModalRef: BsModalRef;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  // filters
  searchForm: FormGroup;
  transactionStatus: any;
  filter: any;
  filterValue: any;
  transactionReference: any;
  sequenceNumber: any
  terminalId: any;
  walletId: any;
  filterData: any;
  start: any;
  end: any;
  product: any;
  range: any;
  failedAmount: any;
  processedAmount: any;
  pendingAmount:any;
  processedCount: any;
  pendingCount: any;
  failedCount: any;
  ieData: any;
  exportData: any;

  DateObj: any = new Date();
  dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    "dateRange": this.newRange,
    "terminalId": "",
    "walletId": "",
    "paymentMethod": "",
    "transactionReference": "",
    "sequenceNumber": "",
    "product": "",
    "transactionType": "",
    "transactionStatus": "",
    "viewPage": "",
  //  "download":false
  };

  constructor(private transactionService: TransactionService, 
    private modalService: BsModalService,
    private excelService: ExcelService,
    private router: Router, private fb: FormBuilder, ) {
    this.searchForm = this.fb.group({
      method: ['', Validators.min],
      startDate: ['', Validators.min],
      endDate: ['', Validators.min],
      filterValue: ['',]
    });
  }

  ngOnInit() {
    this.TransactionIEP(this.payload);
  }

  TransactionIEP(payload) {
    this.isData = true;
    this.loading = true;
    // console.log("isfiltering? ", this.isFiltering);    
    this.transactionService.getTransactionIEpostpaid(payload).subscribe((data) => {
      this.loading = false;
      console.log(data);
      this.ieData = data.transactions;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      this.lastPage = data.lastPage * this.perPage;
      this.failedAmount = data.failedAmount;
      this.processedAmount = data.processedAmount;
      this.pendingAmount = data.pendingAmount;
      this.processedCount = data.processedCount;
      this.pendingCount = data.pendingCount;
      this.failedCount = data.failedCount;

    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction', error);
    })
  };

  headElements = ['S/N', 'PRODUCT', 'AGENT ID', 'CUSTOMER NO', 'CHANNEL',
    'AMOUNT', 'STATUS', 'REFERENCE', 'DATE'];

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.TransactionIEP(this.payload);
    this.router.navigateByUrl('/transaction/iepostpaid', { queryParams: { page: this.currentPage } });
  };

  
  // filters
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy/mm/dd',
    startDate: this.dateRange,
    ariaLabelOpenCalendar: 'Open Calendar',
    closeAfterSelect: true,
    minYear: 1900,
    // disableUntil: this.dateRange;
    //   { year: this.DateObj.getFullYear(), month: this.DateObj.getMonth(), day: this.DateObj.getDate() }
  };

  stat = ['Processed', 'Pending', 'Failed'];
  Refs = ['Agent ID', 'Transaction Ref'];
  products = [
    'IKEDC', 'IBEDC','EKEDC','EEDC', 'PHED', 'AEDC','KEDCO',
     'TRANSFER', 'WITHDRAWAL',  'MULTICHOICE', 
    'MTNVTU', 'MTNDATA', 'AIRTELDATA', 'AIRTELVTU','GLOVTU', 'GLODATA', 
    'ETISALATVTU','ETISALATDATA', 'RCN_FUND',  'STARTIMES', 'GEHS', 'SMILE'];

  getProduct(event) {
    this.product = event.target.value;
    console.log('product value', this.product);
  }
  getStatus(event) {
    this.transactionStatus = event.target.value;
  }
  getRef(event) {
    this.filter = event.target.value;
  }

  searchTrans() {
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.getFilter();
    this.filterData = {
      "dateRange": this.range,
      "terminalId": this.terminalId ? this.terminalId : '',
      "walletId": this.walletId ? this.walletId : '',
      "transactionReference": this.transactionReference ? this.transactionReference : '',
      "sequenceNumber": this.sequenceNumber ? this.sequenceNumber : '',
      "paymentMethod": "",
      "product": this.product ? this.product : '',
      "transactionType": "",
      "transactionStatus": this.transactionStatus ? this.transactionStatus.toLowerCase() : '',
      "viewPage": "",
      // "download":false
    };


    this.TransactionIEP(this.filterData);
    console.log(this.filterData);
  }

  exportAsXLSX(): void {
   
    console.log("postpaid transaction download");
    this.loading = true;
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.getFilter();
    this.filterData = {
      "dateRange": this.range,
      "terminalId": this.terminalId ? this.terminalId : '',
      "walletId": this.walletId ? this.walletId : '',
      "transactionReference": this.transactionReference ? this.transactionReference : '',
      "sequenceNumber": this.sequenceNumber ? this.sequenceNumber : '',
      "paymentMethod": "",
      "product": this.product ? this.product : '',
      "transactionType": "",
      "transactionStatus": this.transactionStatus ? this.transactionStatus.toLowerCase() : '',
      "viewPage": "",
      "download": true
    };

    this.transactionService.getTransactionIEpostpaid(this.filterData).subscribe(
      (data) => {
        this.loading = false;
        this.exportData = data;
        console.log(data);
        this.excelService.exportAsExcelFile(
          this.exportData,
          "ITEX-IEPostpaidTnxs" + this.range
        );
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get transaction locks", error);
      }
    );

  }

  getFilter() {
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == 'Sequence Number') {
      this.sequenceNumber = this.filterValue;
      console.log('sequence', this.sequenceNumber);
      
    } else if (this.filter == 'Transaction Ref') {
      this.transactionReference = this.filterValue;
      console.log('tran ID', this.transactionReference);
      
    } else if (this.filter == 'Terminal ID') {
      this.terminalId = this.filterValue;
    } else if (this.filter == 'Agent ID') {
      this.walletId = this.filterValue;
    }
  }

}
