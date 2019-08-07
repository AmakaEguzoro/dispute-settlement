import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'app/service/summary.service';
import { ThisYearFailed, ThisYearTotal, ThisYearSuccess } from 'app/_models/summary';

@Component({
  selector: 'app-this-year-card',
  templateUrl: './this-year-card.component.html',
  styleUrls: ['./this-year-card.component.scss']
})
export class ThisYearCardComponent implements OnInit {

  thisYearSuccess: ThisYearSuccess;
  thisYearFailed: ThisYearFailed;
  thisYearTotal: ThisYearTotal;
  loading = false;

  constructor(private summaryService: SummaryService) { 
    this.getThisYearTotal();
    this.getThisYearSuccessfull();
    this.getThisYearFailed();
  }

  ngOnInit() {
   
  }

  getThisYearTotal() {
    this.loading = true;
    this.summaryService.getThisYearTotal().subscribe((thisYearTotal: ThisYearTotal) => {
      this.loading = false;
      this.thisYearTotal = thisYearTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisYearTotal');
    })
  }

  getThisYearSuccessfull() {
     this.loading = true;
    this.summaryService.getThisYearSuccess().subscribe((thisYearSuccess: ThisYearSuccess) => {
      this.loading = false;
      this.thisYearSuccess = thisYearSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisYearSuccess');
    })
  }

  getThisYearFailed() {
    this.loading = true;
    this.summaryService.getThisYearFailed().subscribe((thisYearFailed: ThisYearFailed) => {
      this.loading = false;
      this.thisYearFailed = thisYearFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisYearFailed');
    })
  }


}
