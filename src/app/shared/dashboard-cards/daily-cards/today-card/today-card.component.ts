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
  // failPercent = 0;
  // successPercent = 0;
  // failedCount = this.todayFailed.data.count;
  // successCount = this.todaySuccess.data.count;
  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.getTodayTotal();
    this.getTodaySuccessfull();
    this.getTodayFailed();   
    // this.calculatePercent(this.failedCount,this.successCount);   
    // this.totalCount = Math.floor(this.todayFailed.data.count / this.todaySuccess.data.count * 100); 
  }

  getTodayTotal() {
    this.summaryService.getTodayTotal().subscribe((todayTotal: TodayTotal) => {
      this.todayTotal = todayTotal;
      // console.log('my count', this.totalCount);
    }, error => {
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
  
  // calculatePercent(failedCount,successCount){
  //   let totalCount = failedCount + successCount;
  //   this.failPercent = (failedCount/totalCount) * 100;
  //   this.successPercent = (successCount/totalCount) * 100;
  //   console.log('Hello', this.failPercent)
  // }

}



  // /**
  //  * call this function after getting all the all the parameter
  //  * @param failedCount 
  //  * @param successCount 
  //  */
 