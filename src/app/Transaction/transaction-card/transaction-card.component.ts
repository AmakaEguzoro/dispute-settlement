import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { formatDate } from '@angular/common';

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
  date: string;

  // date range
DateObj = new Date();
dateRange: any;
newRange: any;

  constructor(private transactionService: TransactionService, ) { }

  ngOnInit() {
    this.TransactionSummary();
  }

  TransactionSummary() {
    this.dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
    this.newRange = `${this.dateRange} - ${this.dateRange}`;
    this.isData = true;
    this.loading = true;
    this.transactionSummary = Object.assign({}, {
      "dateRange":  this.newRange, "terminalId": "",
      "walletId": "", "accountNumber": "", "paymentMethod": "", "cardRRN": "", "transactionReference": "",
      "phoneNumber": "", "sequenceNumber": "", "debitReference": "", "product": "", "transactionType": "",
      "transactionStatus": "", "transactionChannel": "", "searchField": "", "viewPage": ""
    });
    this.transactionService.getTransactionSummary(this.transactionSummary).subscribe((data) => {
      this.loading = false;
      console.log('transaction summary -', data);
      this.data = data.data;
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction summary details', error);
    });
  }

}
