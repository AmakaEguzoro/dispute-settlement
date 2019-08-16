import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';

@Component({
  selector: 'app-last-week-card',
  templateUrl: './last-week-card.component.html',
  styleUrls: ['./last-week-card.component.scss']
})
export class LastWeekCardComponent implements OnInit {
  totalAmount: any;
  successCount: any;
  failedCount: any;
  successAmount: any;
  failedAmount: any;
  loading = false;
  totalCount: any;
  lastWeekSuccess: any;
  lastWeekFailed: any;

  successPercent: any;
  failedPercent: any;
  totalPercent: any;
  private subs = new SubSink();

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    this.loading = true,
      this.subs.add(
        await this.summaryService.getLastWeek().subscribe(responseList => {
          this.loading = false;
          this.lastWeekSuccess = responseList[0];
          this.successCount = this.lastWeekSuccess.data.count;
          this.successAmount = this.lastWeekSuccess.data.amount;

          this.lastWeekFailed = responseList[1];
          this.failedCount = this.lastWeekFailed.data.count;
          this.failedAmount = this.lastWeekFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = math.chain(this.successCount).divide(this.totalCount).multiply(100);
          this.failedPercent = math.chain(this.failedCount).divide(this.totalCount).multiply(100);
        }, error => {
          this.loading = false;
          console.log('cant get lastWeek response', error)
        }),
        this.summaryService.getThisWeek().subscribe(responseList => {
          let thisWeekSuccess = responseList[0];
          let thisWeekFailed = responseList[1];
          let thisWeekTotalCount = math.add(thisWeekSuccess.data.count, thisWeekFailed.data.count);
          this.totalPercent = math.chain(this.totalCount).subtract(thisWeekTotalCount).divide(this.totalCount).multiply(100);
        })
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}