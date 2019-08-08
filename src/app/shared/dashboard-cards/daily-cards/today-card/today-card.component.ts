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
  loading = false;
  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.getTodayTotal();
    this.getTodaySuccessfull();
    this.getTodayFailed();   
  }

  getTodayTotal() {
    this.loading = true;
    this.summaryService.getTodayTotal().subscribe((todayTotal: TodayTotal) => {
      this.loading = false;
      this.todayTotal = todayTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get todayTotal');
    })
  }

  getTodaySuccessfull() {
    this.summaryService.getTodaySuccess().subscribe((todaySuccess: TodaySuccess) => {
      this.todaySuccess = todaySuccess;
    }, error => {
      console.log(error, 'cannot get todaySuccess');
    })
  }

  getTodayFailed() {
    this.summaryService.getTodayFailed().subscribe((todayFailed: TodayFailed) => {
      this.todayFailed = todayFailed;
    }, error => {
      console.log(error, 'cannot get todayFailed');
    })
  }
}

 