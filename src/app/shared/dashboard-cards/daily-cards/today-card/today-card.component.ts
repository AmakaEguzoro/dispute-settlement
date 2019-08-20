import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit, OnDestroy {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  todaySuccess: any;
  todayFailed: any;
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
        await this.summaryService.getToday().subscribe(responseList => {
          this.loading = false;
          this.todaySuccess = responseList[0];
          this.successCount = this.todaySuccess.data.count;
          this.successAmount = this.todaySuccess.data.amount;

          this.todayFailed = responseList[1];
          this.failedCount = this.todayFailed.data.count;
          this.failedAmount = this.todayFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.isData = false
          this.loading = false;
          console.log('cant get today response', error);
        }),
        this.summaryService.getYesterday().subscribe(responseList => {
          let yesterdaySuccess = responseList[0];
          let yesterdayFailed = responseList[1];
          let yesterdayTotalAmount = math.add(yesterdaySuccess.data.amount, yesterdayFailed.data.amount);
          let totalSubtract = math.chain(this.totalAmount).subtract(yesterdayTotalAmount);
          this.totalPercent = math.chain(totalSubtract).divide(yesterdayTotalAmount).multiply(100);
        })
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}