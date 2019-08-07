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

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.getYesterdayTotal();
    this.getYesterdaySuccessfull();
    this.getYesterdayFailed();
  }

  getYesterdayTotal() {
    this.summaryService.getYesterdayTotal().subscribe((yesterdayTotal: YesterdayTotal) => {
      this.yesterdayTotal = yesterdayTotal;
    }, error => {
      console.log(error, 'cannot get yesterdayTotal');
    })
  }

  getYesterdaySuccessfull() {
    this.summaryService.getYesterdaySuccess().subscribe((yesterdaySuccess: YesterdaySuccess) => {
      this.yesterdaySuccess = yesterdaySuccess;
    }, error => {
      console.log(error, 'cannot get yesterdaySuccess');
    })
  }

  getYesterdayFailed() {
    this.summaryService.getYesterdayFailed().subscribe((yesterdayFailed: YesterdayFailed) => {
      this.yesterdayFailed = yesterdayFailed;
    }, error => {
      console.log(error, 'cannot get yesterdayFailed');
    })
  }

}

