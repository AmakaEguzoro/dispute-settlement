import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink/dist/subsink';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModelComponent } from '../model/model.component';

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

  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  private subs = new SubSink();
  bsModalRef: BsModalRef;

  constructor(private transactionService: TransactionService,
     private route: ActivatedRoute, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.Transaction();
  }

  Transaction() {
    this.isData = true;
    this.loading = true;
    this.transaction = Object.assign( {}, {
      "dateRange": "", "terminalId": "",
      "walletId": "", "accountNumber": "", "paymentMethod": "", "cardRRN": "", "transactionReference": "",
      "phoneNumber": "", "sequenceNumber": "", "debitReference": "", "product": "", "transactionType": "",
      "transactionStatus": "", "transactionChannel": "", "searchField": "", "viewPage": ""
    });
    this.transactionService.getTransaction(this.transaction).subscribe((data) => {
      this.loading = false;
      this.data = data.data.transactions;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      this.lastPage = data.data.lastPage;   
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  }

 openModalWithComponent(modal) {
    this.data = modal;
    const initialState = {
      data: this.data,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(ModelComponent, {initialState});
  }
  
  pageChanged(event: any): void {
    this.loading = true;
    this.currentPage = event.page;
    this.Transaction();
    this.router.navigate(['/transaction/details'], { queryParams: { page:  this.currentPage } });
  
  }

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE TIME', 'DATE'];

    ngOnDestroy() {
      // this.subs.unsubscribe();
    }
}
