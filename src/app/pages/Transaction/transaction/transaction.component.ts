import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'app/_service/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink/dist/subsink';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModelComponent } from '../model/model.component';
import { SocketService } from 'app/_service/socket.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IMyOptions } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  // Details
  isData: boolean;
  loading = true;
  isFiltering = false;
  data: any;
  transaction: any;
  detailsData: any;

  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;

  // modal
  bsModalRef: BsModalRef;
  private subs = new SubSink();
  socketData: any;
  disabled: true;

  // Summary
  summaryData: any;
  transactionSummary: any;
  failedAmount: any;
  failedCount: any;
  successCount: any;
  successAmount: any;
  totalAmount: any;
  totalCount: any;
  isLoading = true;
  usersCount: any;

  // filters
  searchForm: FormGroup;
  paymentMethod: any;
  vendor: any;
  vendorType: any;
  transactionStatus: any;
  filter: any;
  filterValue: any;
  transactionReference: any;
  sequenceNumber: any
  debitReference: any;
  accountNumber: any;
  phoneNumber: any;
  terminalId: any;
  walletId: any;
  cardRRN: any;
  product: any;
  transactionChannel: any;
  transactionType: any;
  filterData: any;
  start: any;
  end: any;
  range: any;
  DateObj: any = new Date();
  dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    "dateRange": this.newRange,
    "terminalId": "",
    "walletId": "",
    "accountNumber": "",
    "paymentMethod": "",
    "cardRRN": "",
    "transactionReference": "",
    "phoneNumber": "",
    "sequenceNumber": "",
    "debitReference": "",
    "product": "",
    "transactionType": "",
    "transactionStatus": "",
    "transactionChannel": "",
    "searchField": "",
    "viewPage": "",
  };


  constructor(private transactionService: TransactionService,
    private router: Router, private modalService: BsModalService,
    private socket: SocketService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      method: ['', Validators.min],
      startDate: ['', Validators.min],
      endDate: ['', Validators.min],
      filterValue: ['',]
    });
  }

  ngOnInit() {
    this.Transaction(this.payload);
    this.TransactionSummary(this.payload);
    setTimeout(() => {
      this.getSocketData();
    }, 1 * 10 * 1000);
  }

  getSocketData() {
    // console.log("isfiltering socket? ", this.isFiltering);
    if (this.isFiltering == false) {
      this.socket.getMessage().subscribe((Socketdata: any) => {
        this.detailsData.pop();
        this.detailsData.unshift(Socketdata.data);
        console.log('get socket data-', Socketdata.data.status)
        if (Socketdata.data.status == "failed" || Socketdata.data.status == "declined") {
          this.failedAmount += parseInt(Socketdata.data.nairaAmount);
          this.failedCount = parseInt( this.failedCount)+1;
          this.totalAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalCount += 1;
        } else if (Socketdata.data.status == "successful") {
          this.successCount += 1;
          this.successAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalAmount += parseInt(Socketdata.data.nairaAmount);
          this.totalCount += 1;
        }
      });
    }
  }

  Transaction(payload) {
    this.isData = true;
    this.loading = true;
    // console.log("isfiltering? ", this.isFiltering);    
    this.transactionService.getTransaction(payload).subscribe((data) => {
      this.loading = false;
      this.detailsData = data.data.transactions;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      this.lastPage = data.data.lastPage;
      console.log(this.detailsData, 'last page in transaction');

    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  };


  openModal(modal) {
    this.detailsData.response = modal;
    const initialState = {
      data: this.detailsData.response,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(ModelComponent, { initialState });

  };

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.Transaction(this.payload);
    this.router.navigate(['/transaction/details'], { queryParams: { page: this.currentPage } });
  };

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE TIME', 'DATE'];

  TransactionSummary(payload) {
    this.isData = true;
    this.isLoading = true;
    this.transactionService.getTransactionSummary(payload).subscribe((data) => {
      this.isLoading = false;
      this.summaryData = data.data;
      this.failedAmount = this.summaryData.failedAmount;
      this.failedCount = this.summaryData.failedCount;

      this.successCount = this.summaryData.successfulCount;
      this.successAmount = this.summaryData.successfulAmount;

      this.totalAmount = this.summaryData.totalAmount;
      this.totalCount = this.summaryData.transactionCount;
      this.usersCount = this.summaryData.usersCount;
    }, error => {
      this.isData = false;
      this.isLoading = false;
      console.log('cant get transaction summary details', error);
    });
  }

  // filters
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy/mm/dd',
    startDate: this.dateRange,
    ariaLabelOpenCalendar: 'Open Calendar',
    closeAfterSelect: true,
    disableUntil:
      { year: this.DateObj.getFullYear(), month: this.DateObj.getMonth(), day: this.DateObj.getDate() }
  };

  deafaultDate: any = new Date().toISOString().split('T')[0]
  methods = ['Card', 'Cash', 'Mcash'];
  stat = ['Approved', 'Declined', 'Pending'];
  vendTypes = ['B2B', 'ITEX']
  type = ['Postpaid', 'Prepaid', 'smartcard', 'Token', 'Non Energy', 'NIL'];
  channels = ['POS', 'ANDROID', 'WEB', 'ANDROIDPOS', 'DEFAULT', 'OTHERS'];
  Refs = ['Terminal ID', 'Agent ID', 'Sequence Number', 'Debit Reference',
    'Transaction Ref', 'Account number', 'Phone Number', 'cardRRN'];
  vendors = ['Itex', 'Gecharl Resources', 'PhilTech Solutions', 'Vella', 'GI Solutions',
    'Karosealliance', 'Payant', 'Now Now', 'Mars Konnect', 'FCube', 'Zenith Vas', 'XchangeBox',
    'Daphty', 'GreyStone', 'Call Phone'
  ];
  products = [
    'IKEDC', 'TRANSFER', 'WITHDRAWAL', 'EKEDC', 'MULTICHOICE', 'EEDC', 'PHED', 'AEDC',
    'MTN-VTU', 'IBEDC', 'MTN-DATA', 'GLO-VTU', 'AIRTEL-VTU', 'AIRTEL-PIN', 'GLO-DATA', 'RCN_FUND',
    'ETISALAT-VTU', 'KEDCO', 'STARTIMES', 'GERRAD HOSPITAL'];

  getPaymentMethod(event) {
    this.paymentMethod = event.target.value;
  }
  getChannel(event) {
    this.transactionChannel = event.target.value;
  }
  getProduct(event) {
    this.product = event.target.value;
  }
  getType(event) {
    this.transactionType = event.target.value;
  }
  getVendor(event) {
    console.log(event.target.value);
    this.vendor = event.target.value;
  }
  getVendorType(event) {
    this.vendorType = event.target.value;
  }
  getStatus(event) {
    this.transactionStatus = event.target.value;
  }
  getRef(event) {
    this.filter = event.target.value;
  }
  searchTrans() {
    this.isFiltering = true;
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
    this.filterData = {
      "dateRange": this.range,
      "terminalId": this.terminalId ? this.terminalId : '',
      "walletId": this.walletId ? this.walletId : '',
      "accountNumber": this.accountNumber ? this.accountNumber : '',
      "paymentMethod": this.paymentMethod ? this.paymentMethod : '',
      "cardRRN": this.cardRRN ? this.cardRRN : '',
      "transactionReference": this.transactionReference ? this.transactionReference : '',
      "phoneNumber": this.phoneNumber ? this.phoneNumber : '',
      "sequenceNumber": this.sequenceNumber ? this.sequenceNumber : '',
      "debitReference": this.debitReference ? this.debitReference : '',
      "product": this.product ? this.product : '',
      "transactionType": this.transactionType ? this.transactionType : '',
      "transactionStatus": this.transactionStatus ? this.transactionStatus : '',
      "transactionChannel": this.transactionChannel ? this.transactionChannel : '',
      "searchField": "",
      "viewPage": "",
    };

    console.log(this.filterData);
    this.Transaction(this.filterData);
    this.TransactionSummary(this.filterData);
  }

  getFilter(event) {
    this.isFiltering = true;
    this.filterValue = this.searchForm.value.filterValue;
    if (this.filter == 'Sequence Number') {
      this.sequenceNumber = this.filterValue;
    } else if (this.filter == 'Transaction Ref') {
      this.transactionReference = this.filterValue;
    } else if (this.filter == 'Debit Reference') {
      this.debitReference = this.filterValue;
    } else if (this.filter == 'Terminal ID') {
      this.terminalId = this.filterValue;
    } else if (this.filter == 'Agent ID') {
      this.walletId = this.filterValue;
    } else if (this.filter == 'Account number') {
      this.accountNumber = this.filterValue;
    } else if (this.filter == 'Phone Number') {
      this.phoneNumber = this.filterValue;
    } else if (this.filter == 'cardRRN') {
      this.cardRRN = this.filterValue;
    }
  }

}