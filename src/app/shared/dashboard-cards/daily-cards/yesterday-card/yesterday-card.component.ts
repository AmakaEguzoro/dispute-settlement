import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { YesterdaySuccess, YesterdayFailed, YesterdayTotal } from 'app/_models/summary';

@Component({
  selector: 'app-yesterday-card',
  templateUrl: './yesterday-card.component.html',
  styleUrls: ['./yesterday-card.component.scss']
})
export class YesterdayCardComponent implements OnInit {
  yesterdaySuccess: YesterdaySuccess;
  yesterdayFailed: YesterdayFailed;
  yesterdayTotal: YesterdayTotal;
  loading = false;
isData: any;
  constructor(private summaryService: SummaryService) {  }

  ngOnInit() {
    this.getYesterdayTotal();
  this.getYesterdaySuccessfull();
 this.getYesterdayFailed();
  }

  getYesterdayTotal() {
    this.loading = true;
    this.summaryService.getYesterdayTotal().subscribe((yesterdayTotal: YesterdayTotal) => {
      this.loading = false;
      this.yesterdayTotal = yesterdayTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get yesterdayTotal');
    })
  }

  getYesterdaySuccessfull() {
    this.loading = true;
    this.summaryService.getYesterdaySuccess().subscribe((yesterdaySuccess: YesterdaySuccess) => {
      this.loading = false;
      this.yesterdaySuccess = yesterdaySuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get yesterdaySuccess');
    })
  }

  getYesterdayFailed() {
    this.loading = false;
    this.summaryService.getYesterdayFailed().subscribe((yesterdayFailed: YesterdayFailed) => {
      this.loading = false;
      this.yesterdayFailed = yesterdayFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get yesterdayFailed');
    })
  }

}

