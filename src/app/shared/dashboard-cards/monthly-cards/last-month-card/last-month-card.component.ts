import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
// import {chain, math} from 'mathjs';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';

@Component({
  selector: 'app-last-month-card',
  templateUrl: './last-month-card.component.html',
  styleUrls: ['./last-month-card.component.scss']
})
export class LastMonthCardComponent implements OnInit {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  lastMonthSuccess: any;
  lastMonthFailed: any;

  successPercent: any;
  failedPercent: any;
  private subs = new SubSink();
  isData: boolean;

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        await this.summaryService.getLastMonth().subscribe(responseList => {
          this.loading = false;
          this.lastMonthSuccess = responseList[0];
          this.successCount = this.lastMonthSuccess.data.count;
          this.successAmount = this.lastMonthSuccess.data.amount;

          this.lastMonthFailed = responseList[1];
          this.failedCount = this.lastMonthFailed.data.count;
          this.failedAmount = this.lastMonthFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get lastMonth response', error)
        }),
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}