import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { Transaction } from 'app/_models/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isData: boolean;
  loading = true;
  data: any;
  transaction: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.isData = true;
    this.loading = true;
    this.transaction = Object.assign( { "dateRange": "2019/08/15 - 2019/08/15", "terminalId": "",
     "walletId":"", "accountNumber": "", "paymentMethod": "", "cardRRN":"", "transactionReference":"",
      "phoneNumber":"", "sequenceNumber":"", "debitReference":"", "product":"", "transactionType":"", 
      "transactionStatus":"", "transactionChannel":"=", "searchField":"", "viewPage":1 });
    console.log('transaction query is : ' + this.transaction);
    this.transactionService.getTransaction(this.transaction).subscribe((data) => {
      this.loading = false;
      this.data = data.data.transactions;
       console.log('transaction data', this.data);
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  }

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE TIME', 'DATE'];
}
