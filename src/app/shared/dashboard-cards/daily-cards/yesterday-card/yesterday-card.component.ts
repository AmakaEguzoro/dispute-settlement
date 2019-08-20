import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import * as math from 'mathjs';
import { chain } from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';

@Component({
  selector: 'app-yesterday-card',
  templateUrl: './yesterday-card.component.html',
  styleUrls: ['./yesterday-card.component.scss']
})
export class YesterdayCardComponent implements OnInit {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  yesterdaySuccess: any;
  yesterdayFailed: any;

  successPercent: any;
  failedPercent: any;
  totalPercent: any;
  private subs = new SubSink();
  isData: boolean;

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        await this.summaryService.getYesterday().subscribe(responseList => {
          this.loading = false;
          this.yesterdaySuccess = responseList[0];
          this.successCount = this.yesterdaySuccess.data.count;
          this.successAmount = this.yesterdaySuccess.data.amount;

          this.yesterdayFailed = responseList[1];
          this.failedCount = this.yesterdayFailed.data.count;
          this.failedAmount = this.yesterdayFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get yesterday response', error)
        }),
        await  this.summaryService.getToday().subscribe(responseList => {
          let todaySuccess = responseList[0];
          let todayFailed = responseList[1];
          let todayTotalAmount = math.add(todaySuccess.data.amount, todayFailed.data.amount);
         this.totalPercent = math.chain(this.totalAmount).subtract(todayTotalAmount).divide(this.totalAmount).multiply(100);
        })
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}