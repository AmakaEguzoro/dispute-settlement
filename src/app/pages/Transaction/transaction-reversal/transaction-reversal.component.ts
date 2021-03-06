import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/_service/transaction.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ReversalModelComponent } from './reversal-model/reversal-model.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-transaction-reversal',
  templateUrl: './transaction-reversal.component.html',
  styleUrls: ['./transaction-reversal.component.scss']
})
export class TransactionReversalComponent implements OnInit {
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
    private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      method: ['', Validators.min],
      startDate: ['', Validators.min],
      endDate: ['', Validators.min],
      filterValue: ['',]
    });
  }

  ngOnInit() {
    this.TransactionReserval(this.payload);
  }

  TransactionReserval(payload) {
    this.isData = true;
    this.loading = true;
    // console.log("isfiltering? ", this.isFiltering);    
    this.transactionService.getTransactionReversed(payload).subscribe((data) => {
      this.loading = false;
      this.reversedData = data.data.transactions;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      this.lastPage = data.data.lastPage * this.perPage;
      this.failedReversalAmount = data.data.failedReversalAmount;
      this.reversedAmount = data.data.reversedAmount;
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction reversal', error);
    })
  };

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE TIME', 'DATE'];

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.TransactionReserval(this.payload);
    this.router.navigateByUrl('/transaction/reversal', { queryParams: { page: this.currentPage } });
  };

  openModal(modal) {
    this.reversedData.response = modal;
    const initialState = {
      data: this.reversedData.response,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(ReversalModelComponent, { initialState });

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

  stat = ['Reversed', 'Declined'];
  Refs = ['Terminal ID', 'Agent ID', 'Sequence Number', 'Transaction Ref'];
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
      "transactionStatus": this.transactionStatus ? this.transactionStatus : '',
      "viewPage": "",
      // "download":false
    };


    this.TransactionReserval(this.filterData);
    console.log(this.filterData);
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
