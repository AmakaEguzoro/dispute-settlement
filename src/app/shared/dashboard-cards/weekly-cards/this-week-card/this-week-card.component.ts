import { Component, OnInit } from '@angular/core';
import { ThisWeekTotal, ThisWeekFailed, ThisWeekSuccess } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';

@Component({
  selector: 'app-this-week-card',
  templateUrl: './this-week-card.component.html',
  styleUrls: ['./this-week-card.component.scss']
})
export class ThisWeekCardComponent implements OnInit {
  thisWeekSuccess: ThisWeekSuccess;
  thisWeekFailed: ThisWeekFailed;
  thisWeekTotal: ThisWeekTotal;
  loading = false;

  constructor(private summaryService: SummaryService) { 
    this.getThisWeekTotal();
    this.getThisWeekSuccessfull();
    this.getThisWeekFailed();
  }

  ngOnInit() {
   
  }

  getThisWeekTotal() {
    this.loading = true;
    this.summaryService.getThisWeekTotal().subscribe((thisWeekTotal: ThisWeekTotal) => {
      this.loading = false;
      this.thisWeekTotal = thisWeekTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisWeekTotal');
    })
  }

  getThisWeekSuccessfull() {
     this.loading = true;
    this.summaryService.getThisWeekSuccess().subscribe((thisWeekSuccess: ThisWeekSuccess) => {
      this.loading = false;
      this.thisWeekSuccess = thisWeekSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisWeekSuccess');
    })
  }

  getThisWeekFailed() {
    this.loading = true;
    this.summaryService.getThisWeekFailed().subscribe((thisWeekFailed: ThisWeekFailed) => {
      this.loading = false;
      this.thisWeekFailed = thisWeekFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisWeekFailed');
    })
  }

}
