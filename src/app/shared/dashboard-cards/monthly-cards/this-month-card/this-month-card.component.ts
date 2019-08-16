import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';

@Component({
  selector: 'app-this-month-card',
  templateUrl: './this-month-card.component.html',
  styleUrls: ['./this-month-card.component.scss']
})
export class ThisMonthCardComponent implements OnInit {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  thisMonthSuccess: any;
  thisMonthFailed: any;
  successPercent: any;
  failedPercent: any;
  totalPercent: any;
  private subs = new SubSink();

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    this.loading = true,
      this.subs.add(
        await this.summaryService.getThisMonth().subscribe(responseList => {
          this.loading = false;
          this.thisMonthSuccess = responseList[0];
          this.successCount = this.thisMonthSuccess.data.count;
          this.successAmount = this.thisMonthSuccess.data.amount;

          this.thisMonthFailed = responseList[1];
          this.failedCount = this.thisMonthFailed.data.count;
          this.failedAmount = this.thisMonthFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.loading = false;
          console.log('cant get thisMonth response', error);
        }),
        this.summaryService.getLastMonth().subscribe(responseList => {
          let lastMonthSuccess = responseList[0];
          let lastMonthFailed = responseList[1];
          let lastMonthTotalCount = math.add(lastMonthSuccess.data.count, lastMonthFailed.data.count);
          let totalSubtract = math.chain(this.totalCount).subtract(lastMonthTotalCount);
          this.totalPercent = math.chain(totalSubtract).divide(lastMonthTotalCount).multiply(100);
        })
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}