import { Component, OnInit } from '@angular/core';
import { LastMonthSuccess, LastMonthFailed, LastMonthTotal } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';

@Component({
  selector: 'app-last-month-card',
  templateUrl: './last-month-card.component.html',
  styleUrls: ['./last-month-card.component.scss']
})
export class LastMonthCardComponent implements OnInit {
  lastMonthSuccess: LastMonthSuccess;
  lastMonthFailed: LastMonthFailed;
  lastMonthTotal: LastMonthTotal;
  loading = false;
  lastm:any;

  constructor(private summaryService: SummaryService) { 
    this.getLastMonthTotal();
    this.getLastMonthSuccessfull();
    this.getLastMonthFailed();
  }

  ngOnInit() {
    this.summaryService.getThisMonthSuccess().subscribe(data =>{
      this.lastm = data;
      console.log(this.lastm, 'jjj')
    })
  }

  getLastMonthTotal() {
    this.loading = true;
    this.summaryService.getLastMonthTotal().subscribe((lastMonthTotal: LastMonthTotal) => {
      this.loading = false;
      this.lastMonthTotal = lastMonthTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthTotal');
    })
  }

  getLastMonthSuccessfull() {
     this.loading = true;
    this.summaryService.getLastMonthSuccess().subscribe((lastMonthSuccess: LastMonthSuccess) => {
      this.loading = false;
      this.lastMonthSuccess = lastMonthSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthSuccess');
    })
  }

  getLastMonthFailed() {
    this.loading = true;
    this.summaryService.getLastMonthFailed().subscribe((lastMonthFailed: LastMonthFailed) => {
      this.loading = false;
      this.lastMonthFailed = lastMonthFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastMonthFailed');
    })
  }

}
