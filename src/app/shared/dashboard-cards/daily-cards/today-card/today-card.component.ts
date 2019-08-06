import { Component, OnInit, Input } from '@angular/core';
import { TodaySuccess, TodayFailed, TodayTotal } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit {
  //  @Input() cardDat: CardData;
  todaySuccess: TodaySuccess;
  todayFailed: TodayFailed;
  todayTotal: TodayTotal;

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.getTodayTotal();
    this.getTodaySuccessfull();
    this.getTodayFailed();
  }

  getTodayTotal() {
    this.summaryService.getTodayTotal().subscribe((todayTotal: TodayTotal) => {
      this.todayTotal = todayTotal;
      console.log( 'ca get todayTotal', todayTotal);
    }, error => {
      console.log(error, 'cannot get todayTotal');
    })
  }

  getTodaySuccessfull() {
    this.summaryService.getTodaySuccess().subscribe((todaySuccess: TodaySuccess) => {
      this.todaySuccess = todaySuccess;
      console.log( 'ca get todaysuce', todaySuccess);
    }, error => {
      console.log(error, 'cannot get todaySuccess');
    })
  }

  getTodayFailed() {
    this.summaryService.getTodayFailed().subscribe((todayFailed: TodayFailed) => {
      this.todayFailed = todayFailed;
      console.log( 'ca get todayfail', todayFailed);
    }, error => {
      console.log(error, 'cannot get todayFailed');
    })
  }

}
