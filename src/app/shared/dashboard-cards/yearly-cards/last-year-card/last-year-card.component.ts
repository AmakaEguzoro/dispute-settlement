import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { LastYearSuccess, LastYearTotal, LastYearFailed } from 'app/_models/summary';

@Component({
  selector: 'app-last-year-card',
  templateUrl: './last-year-card.component.html',
  styleUrls: ['./last-year-card.component.scss']
})
export class LastYearCardComponent implements OnInit {

  lastYearSuccess: LastYearSuccess;
  lastYearFailed: LastYearFailed;
  lastYearTotal: LastYearTotal;
  loading = false;

  constructor(private summaryService: SummaryService) { 
    this.getLastYearTotal();
    this.getLastYearSuccessfull();
    this.getLastYearFailed();
  }

  ngOnInit() {
   
  }

  getLastYearTotal() {
    this.loading = true;
    this.summaryService.getLastYearTotal().subscribe((lastYearTotal: LastYearTotal) => {
      this.loading = false;
      this.lastYearTotal = lastYearTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastYearTotal');
    })
  }

  getLastYearSuccessfull() {
     this.loading = true;
    this.summaryService.getLastYearSuccess().subscribe((lastYearSuccess: LastYearSuccess) => {
      this.loading = false;
      this.lastYearSuccess = lastYearSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastYearSuccess');
    })
  }

  getLastYearFailed() {
    this.loading = true;
    this.summaryService.getLastYearFailed().subscribe((lastYearFailed: LastYearFailed) => {
      this.loading = false;
      this.lastYearFailed = lastYearFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get lastYearFailed');
    })
  }


}
