import { Component, OnInit } from '@angular/core';
import { LastWeekTotal, LastWeekFailed, LastWeekSuccess } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';

@Component({
  selector: 'app-last-week-card',
  templateUrl: './last-week-card.component.html',
  styleUrls: ['./last-week-card.component.scss']
})
export class LastWeekCardComponent implements OnInit {
  lastWeekSuccess: LastWeekSuccess;
  lastWeekFailed: LastWeekFailed;
  lastWeekTotal: LastWeekTotal;
  loading = false;

  constructor(private summaryService: SummaryService) { 
    this.getLastWeekTotal();
    this.getLastWeekSuccessfull();
    this.getLastWeekFailed();
  }

  ngOnInit() {
   
  }

  getLastWeekTotal() {
    this.loading = true;
    this.summaryService.getLastWeekTotal().subscribe((lastWeekTotal: LastWeekTotal) => {
      this.loading = false;
      this.lastWeekTotal = lastWeekTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastWeekTotal');
    })
  }

  getLastWeekSuccessfull() {
     this.loading = true;
    this.summaryService.getLastWeekSuccess().subscribe((lastWeekSuccess: LastWeekSuccess) => {
      this.loading = false;
      this.lastWeekSuccess = lastWeekSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastWeekSuccess');
    })
  }

  getLastWeekFailed() {
    this.loading = true;
    this.summaryService.getLastWeekFailed().subscribe((lastWeekFailed: LastWeekFailed) => {
      this.loading = false;
      this.lastWeekFailed = lastWeekFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastWeekFailed');
    })
  }

}
