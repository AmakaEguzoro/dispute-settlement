import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'app/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isData: boolean;
  loading = true;
  data: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.isData = true;
    this.loading = true;
    this.transactionService.getTransaction().subscribe(data => {
      this.loading = false;
      this.data = data.data.data;
      console.log('transaction data', (this.data));
    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  }
  // elements: any = [
  //   { sn: 1, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 2, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 3, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 4, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'ANDRIOD-POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 5, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 6, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 7, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 8, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  //    { sn: 9, product: 'IKEJA ELECTRICITY', sequence: '3678922', agentSn: '44890n2e', terminal: '274910101', channel: 'POS',
  //    amount: '22k', status:'successful', responseT: '0s', date: '2/08/2009' },
  // ];

  headElements = ['S/N', 'PRODUCT', 'SEQUENCE', 'AGENT ID', 'TERMINAL', 'CHANNEL',
    'AMOUNT', 'STATUS', 'RESPONSE T', 'DATE'];
}
