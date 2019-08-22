import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';


@Component({
  selector: 'app-this-week-card',
  templateUrl: './this-week-card.component.html',
  styleUrls: ['./this-week-card.component.scss']
})
export class ThisWeekCardComponent implements OnInit {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  thisWeekSuccess: any;
  thisWeekFailed: any;
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
        await this.summaryService.getThisWeek().subscribe(responseList => {
          this.loading = false;
          this.thisWeekSuccess = responseList[0];
          this.successCount = this.thisWeekSuccess.data.count;
          this.successAmount = this.thisWeekSuccess.data.amount;

          this.thisWeekFailed = responseList[1];
          this.failedCount = this.thisWeekFailed.data.count;
          this.failedAmount = this.thisWeekFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get thisWeek response', error);
        }),
      await  this.summaryService.getLastWeek().subscribe(responseList => {
          let lastWeekSuccess = responseList[0];
          let lastWeekFailed = responseList[1];
          let lastWeekTotalAmount = math.add(lastWeekSuccess.data.amount, lastWeekFailed.data.amount);
          let totalSubtract = math.chain(this.totalAmount).subtract(lastWeekTotalAmount);
          this.totalPercent = math.chain(totalSubtract).divide(lastWeekTotalAmount).multiply(100);
        })
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}