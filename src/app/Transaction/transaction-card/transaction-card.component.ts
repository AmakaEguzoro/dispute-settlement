import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';
import { formatDate } from '@angular/common';
import { SocketService } from 'app/service/socket.service';

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

socketData: any;
failedAmount: any;
failedCount: any;
successCount: any;
successAmount: any;
totalAmount: any;
totalCount: any;

  constructor(private transactionService: TransactionService,  
    private socket: SocketService ) { }

  ngOnInit() {
    this.TransactionSummary();
    setTimeout(() => {
      this.getSocketData();
    }, 3000);

  }

   getSocketData() {
    this.socket.getMessage().subscribe((Socketdata : any) => {
      // console.log("this is socket data", Socketdata.data)
      if (Socketdata.data.status == "failed") {
        this.failedAmount += Socketdata.data.nairaAmount;
        this.totalAmount += Socketdata.data.nairaAmount;
        this.totalCount = this.totalCount + 1;
        this.failedCount = this.successCount + 1;
        console.log(this.failedCount, ' data failed amount');
      } else if (Socketdata.data.status == "successful") {
        this.totalAmount += Socketdata.data.nairaAmount;
        this.successAmount += Socketdata.data.nairaAmount;
        this.totalCount = this.totalCount + 1;
        this.successCount = this.successCount + 1;
        console.log(this.successCount, ' data sucess amount');
      }
      // console.log(`transactions ${this.trans.length}`);
      // this.data.sort((a,b)=>{a.})
    });
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
      this.data = data.data;
      this.failedAmount = this.data.failedAmount;
      this.failedCount = this.data.failedCount;
      console.log(this.failedAmount, 'failed amount');
      this.successCount = this.data.successfulCount;
      this.successAmount = this.data.successfulAmount;
      console.log(this.successAmount, 'sucess amount');
      this.totalAmount = this.data.totalAmount;
      this.totalCount = this.data.transactionCount;
      console.log(this.totalAmount, 'total amount');
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction summary details', error);
    });
  }

}
