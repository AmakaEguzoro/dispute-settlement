import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'app/service/transaction.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  // optionsSelect: Array<any>;
  disabled: boolean = true;

  searchForm: FormGroup;
  paymentMethod: any;
  vendor: any;
  vendorType: any;
  filter: any;
  filterValue: any;

  transactionReference: any;
  sequenceNumber: any
  debitReference: any;
  accountNumber: any;
  phoneNumber: any;
  terminalId: any;
  walletId: any;
  product: any;
  transactionChannel: any;
  transactionType: any;
  payload: any;
  start: any;
  end: any;
  range: any;
  detailsData: any;
  loading: any;
  isData: boolean;

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

  constructor(private fb: FormBuilder, private transService: TransactionService) {
    this.searchForm = fb.group({
      method: ['', Validators.min],
      startDate: ['', Validators.min],
      endDate: ['', Validators.min],
    });
  }
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy/mm/dd',
    minYear: 1900,
    

  };

  ngOnInit() {
    // this.getProduct(event)

  }
  deafaultDate: any = new Date().toISOString().split('T')[0]
  methods = ['card', 'cash',];
  status = ['Failed', 'Successful', 'Declined', 'Debited'];
  vendType = ['B2B', 'ITEX']
  Type = ['Postpaid', 'Prepaid', 'Smart Card', 'Token', 'Non Energy'];
  channels = ['POS', 'ANDROID', 'WEB', 'ANDROIDPOS', 'DEFAULT', 'OTHERS'];
  Ref = ['Terminal ID', 'Agent ID', 'Sequence Number',
    'Receipt Number', 'Debit Reference', 'Retrieval Ref Number',
    'Transaction Ref', 'Account number', 'Phone Number'];
  vendors = [
    'Vendors:', 'Itex', 'Gecharl Resources', 'PhilTech Solutions', 'Vella', 'GI Solutions',
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
    this.vendor = event.target.value;
  }
  getVendorType(event) {
    this.vendorType = event.target.value;
  }

  searchTrans() {
    // this.range = `${this.start[0]}/${this.start[1]}/${this.start[2]} - ${this.end[0]}/${this.end[1]}/${this.end[2]}`;
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;

    console.log('this date -', this.range);

    this.payload = {
      "dateRange": this.range,
      "terminalId": this.terminalId ? this.terminalId : '',
      "walletId": this.walletId ? this.walletId : '',
      "accountNumber": this.accountNumber ? this.accountNumber : '',
      "paymentMethod": this.paymentMethod ? this.paymentMethod : '',
      "cardRRN": "",
      "transactionReference": this.transactionReference ? this.transactionReference : '',
      "phoneNumber": this.phoneNumber ? this.phoneNumber : '',
      "sequenceNumber": this.sequenceNumber ? this.sequenceNumber : '',
      "debitReference": this.debitReference ? this.debitReference : '',
      "product": this.product ? this.product : '',
      "transactionType": this.transactionType ? this.transactionType : '',
      "transactionStatus": "",
      "transactionChannel": this.transactionChannel ? this.transactionChannel : '',
      "searchField": "",
      "viewPage": "",
    };

    console.log(this.payload);
    
    this.transService.getTransactionSummary(this.payload).subscribe((data) => {
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
    });;

    this.transService.getTransaction(this.payload).subscribe((data) => {
      this.loading = false;
      this.detailsData = data.data.transactions;
      console.log(this.detailsData, 'last page in transaction');

    }, error => {
      this.loading = false;
      console.log('cant get transaction details', error);
    });
   
  }

  getFilter(event) {
    this.filter = event.detail.value;
    this.filterValue = this.searchForm.value.filter
    if (this.filter == 'sequenceNumber') {
      this.sequenceNumber = this.filterValue;
      // console.log('yes seq = ', this.filterValue);
    } else if (this.filter == 'transactionReference') {
      this.transactionReference = this.filterValue;
    } else if (this.filter == 'debitReference') {
      this.debitReference = this.filterValue;
    } else if (this.filter == 'terminalId') {
      this.terminalId = this.filterValue;
    } else if (this.filter == 'walletId') {
      this.walletId = this.filterValue;
    } else if (this.filter == 'accountNumber') {
      this.accountNumber = this.filterValue;
    } else if (this.filter == 'phoneNumber') {
      this.phoneNumber = this.filterValue;
    }

  }

}
