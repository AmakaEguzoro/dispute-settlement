import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';
import { Subscription, Observable } from 'rxjs';


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
  totalSubtract: any;
  lastWeekTotalAmount: any;
  private subs = new SubSink();
  isData: boolean;
  refresh: Subscription;

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    await this.getThisWeekTransaction();

    this.refresh = Observable.interval(120 * 1000).subscribe(() => {
      this.getThisWeekTransaction();
    })
  }

  getThisWeekTransaction() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        this.summaryService.getThisWeek().subscribe(responseList => {
          this.loading = false;
          this.thisWeekSuccess = responseList[0];
          this.successCount = this.thisWeekSuccess.data.count;
          this.successAmount = this.thisWeekSuccess.data.amount;

          this.thisWeekFailed = responseList[1];
          this.failedCount = this.thisWeekFailed.data.count;
          this.failedAmount = this.thisWeekFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = this.successCount / this.totalCount * 100;
          this.failedPercent = this.failedCount / this.totalCount * 100;
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get thisWeek response', error);
        }),
        this.summaryService.getLastWeek().subscribe(responseList => {
          let lastWeekSuccess = responseList[0];
          let lastWeekFailed = responseList[1];
          this.lastWeekTotalAmount = math.add(lastWeekSuccess.data.amount, lastWeekFailed.data.amount);
          this.totalSubtract = this.totalAmount - this.lastWeekTotalAmount;
          this.totalPercent = this.totalSubtract / this.lastWeekTotalAmount * 100;
        })
      );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}