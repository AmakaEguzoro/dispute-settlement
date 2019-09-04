import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {
  isData: boolean;
  loading = true;
  data: any;
  transactionSummary: any;

  constructor(private transactionService: TransactionService, ) { }

  ngOnInit() {
    // this.TransactionSummary();
  }

  // TransactionSummary() {
  //   this.isData = true;
  //   this.loading = true;
  //   this.transactionSummary = Object.assign({}, {
  //     "dateRange": "", "terminalId": "",
  //     "walletId": "", "accountNumber": "", "paymentMethod": "", "cardRRN": "", "transactionReference": "",
  //     "phoneNumber": "", "sequenceNumber": "", "debitReference": "", "product": "", "transactionType": "",
  //     "transactionStatus": "", "transactionChannel": "", "searchField": "", "viewPage": ""
  //   });
  //   this.transactionService.getTransactionSummary(this.transactionSummary).subscribe((data) => {
  //     this.loading = false;
  //     this.data = data
  //     console.log(this.data, 'data from summary')
  //   }, error => {
  //     this.isData = false;
  //     this.loading = false;
  //     console.log('cant get transaction summary details', error);
  //   });
  // }

}
