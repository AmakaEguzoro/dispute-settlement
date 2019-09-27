import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';
import { Subscription, Observable } from 'rxjs';

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
  totalSubtract: any;
  lastMonthTotalAmount: any;
  private subs = new SubSink();
  isData: boolean;
  refresh: Subscription;

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    await this.getThisMonthTransaction();

    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(() => {
      this.getThisMonthTransaction();
    })
  }

  getThisMonthTransaction() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        this.summaryService.getThisMonth().subscribe(responseList => {
          this.loading = false;
          this.thisMonthSuccess = responseList[0];
          this.successCount = this.thisMonthSuccess.data.count;
          this.successAmount = this.thisMonthSuccess.data.amount;

          this.thisMonthFailed = responseList[1];
          this.failedCount = this.thisMonthFailed.data.count;
          this.failedAmount = this.thisMonthFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = this.successCount / this.totalCount * 100;
          this.failedPercent = this.failedCount / this.totalCount * 100;
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get this Month response', error);
        }),
        this.summaryService.getLastMonth().subscribe(responseList => {
          let lastMonthSuccess = responseList[0];
          let lastMonthFailed = responseList[1];
          this.lastMonthTotalAmount = math.add(lastMonthSuccess.data.amount, lastMonthFailed.data.amount);
          this.totalSubtract = this.totalAmount - this.lastMonthTotalAmount;
          this.totalPercent = this.totalSubtract / this.lastMonthTotalAmount * 100;
        })
      );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}