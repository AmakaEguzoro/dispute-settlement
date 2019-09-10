import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink/dist/subsink';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModelComponent } from '../model/model.component';
import { SocketService } from 'app/service/socket.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {

  isData: boolean;
  loading = true;
  data: any;
  transaction: any;
  detailsData: any;

  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;

  // date range
  DateObj = new Date();
  dateRange: any;
  newRange: any;

  // modal
  bsModalRef: BsModalRef;
  private subs = new SubSink();
  socketData: any;

  // Summary
  summaryData: any;
  transactionSummary: any;
  failedAmount: any;
  failedCount: any;
  successCount: any;
  successAmount: any;
  totalAmount: any;
  totalCount: any;

  constructor(private transactionService: TransactionService,
    private router: Router, private modalService: BsModalService,
    private socket: SocketService) { }

  ngOnInit() {
    this.Transaction();
    this.TransactionSummary();
    // this.subs.add(

    // )

    setTimeout(() => {
    this.getSocketData();
    }, 3000);

  }

  getSocketData() {
    this.socket.getMessage().subscribe((Socketdata: any) => {
      console.log("this is socket data", Socketdata.data)      
      this.detailsData.unshift(Socketdata.data);
       
      this.totalAmount = this.summaryData.totalAmount;
      this.totalCount = this.summaryData.transactionCount;
      console.log("total summary count", this.totalCount);
    });
  }

  Transaction() {
    this.isData = true;
    this.loading = true;
    this.transaction = Object.assign({}, {
      "dateRange": "", "terminalId": "",
      "walletId": "", "accountNumber": "", "paymentMethod": "", "cardRRN": "", "transactionReference": "",
      "phoneNumber": "", "sequenceNumber": "", "debitReference": "", "product": "", "transactionType": "",
      "transactionStatus": "", "transactionChannel": "", "searchField": "", "viewPage": ""
    });
    this.transactionService.getTransaction(this.transaction).subscribe((data) => {
      this.loading = false;
      console.log('transaction details -', data);
      this.detailsData = data.data.transactions;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      this.lastPage = data.data.lastPage;
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  };


  openModal(modal) {
    this.data.response = modal;
    const initialState = {
      data: this.data.response,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(ModelComponent, { initialState, class: 'modal-lg' });

  };

  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.Transaction();
    this.router.navigate(['/transaction/details'], { queryParams: { page: this.currentPage } });
  };

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE TIME', 'DATE'];


  TransactionSummary() {
    this.dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
    this.newRange = `${this.dateRange} - ${this.dateRange}`;
    this.isData = true;
    this.loading = true;
    this.transactionSummary = Object.assign({}, {
      "dateRange": this.newRange, "terminalId": "",
      "walletId": "", "accountNumber": "", "paymentMethod": "", "cardRRN": "", "transactionReference": "",
      "phoneNumber": "", "sequenceNumber": "", "debitReference": "", "product": "", "transactionType": "",
      "transactionStatus": "", "transactionChannel": "", "searchField": "", "viewPage": ""
    });
    this.transactionService.getTransactionSummary(this.transactionSummary).subscribe((data) => {
      this.loading = false;
      this.summaryData = data.data;
      this.failedAmount = this.summaryData.failedAmount;
      this.failedCount = this.summaryData.failedCount;

      this.successCount = this.summaryData.successfulCount;
      this.successAmount = this.summaryData.successfulAmount;
      
      this.totalAmount = this.summaryData.totalAmount;
      this.totalCount = this.summaryData.transactionCount;
      console.log(this.totalAmount, 'total amount');
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction summary details', error);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
