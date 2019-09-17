import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
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
  private subs = new SubSink();
  isData: boolean;

  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
   await this.getYesterdayTransaction();

  }

  getYesterdayTransaction() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        this.summaryService.getYesterday().subscribe(responseList => {
          this.loading = false;
          this.yesterdaySuccess = responseList[0];
          this.successCount = this.yesterdaySuccess.data.count;
          this.successAmount = this.yesterdaySuccess.data.amount;

          this.yesterdayFailed = responseList[1];
          this.failedCount = this.yesterdayFailed.data.count;
          this.failedAmount = this.yesterdayFailed.data.amount;

          this.totalCount = math.add(this.successCount, this.failedCount);
          this.totalAmount = math.add(this.successAmount, this.failedAmount);

          this.successPercent = this.successCount / this.totalCount * 100;
          this.failedPercent = this.failedCount / this.totalCount * 100;
        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get yesterday response', error)
        }),
      );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}