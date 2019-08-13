import { Component, OnInit } from '@angular/core';
import { LastMonthSuccess, LastMonthFailed, LastMonthTotal } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';
// import {chain, math} from 'mathjs';
import * as math from 'mathjs';

@Component({
  selector: 'app-last-month-card',
  templateUrl: './last-month-card.component.html',
  styleUrls: ['./last-month-card.component.scss']
})
export class LastMonthCardComponent implements OnInit {
  lastMonthSuccess: LastMonthSuccess;
  lastMonthFailed: LastMonthFailed;
  lastMonthTotal: LastMonthTotal;
  loading = false;
  totalCount: any
  
//   thisMonthSuccess:any;
// tot:any;
  constructor(private summaryService: SummaryService) { 
    this.getLastMonthTotal();
    this.getLastMonthSuccessfull();
    this.getLastMonthFailed();
  }

  ngOnInit() {
    this.summaryService.getThisMonthSuccess().subscribe(data =>{
    const thisMonthSuccess  = data.data;
    this.totalCount = math.chain( thisMonthSuccess.count).add(this.lastMonthSuccess.data.count);
    const successPercent = math.chain(this.lastMonthSuccess.data.count).divide(this.totalCount);
    // .divide(this.totalCount)
    // .multiply(100).done()
      console.log(this.totalCount, 'skkc')
      // lastMonthSuccess?.data.count /lastm?.data.count+lastMonthSuccess?.data.count * 100
    })
  }

  getLastMonthTotal() {
    this.loading = true;
    this.summaryService.getLastMonthTotal().subscribe((lastMonthTotal: LastMonthTotal) => {
      this.loading = false;
      this.lastMonthTotal = lastMonthTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthTotal');
    })
  }

  getLastMonthSuccessfull() {
     this.loading = true;
    this.summaryService.getLastMonthSuccess().subscribe((lastMonthSuccess: LastMonthSuccess) => {
      this.loading = false;
      this.lastMonthSuccess = lastMonthSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthSuccess');
    })
  }

  getLastMonthFailed() {
    this.loading = true;
    this.summaryService.getLastMonthFailed().subscribe((lastMonthFailed: LastMonthFailed) => {
      this.loading = false;
      this.lastMonthFailed = lastMonthFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthFailed');
    })
  }

}
