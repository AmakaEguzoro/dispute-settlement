import { Component, OnInit } from '@angular/core';
import { ThisMonthFailed, ThisMonthSuccess, ThisMonthTotal } from 'app/_models/summary';
import { SummaryService } from 'app/service/summary.service';

@Component({
  selector: 'app-this-month-card',
  templateUrl: './this-month-card.component.html',
  styleUrls: ['./this-month-card.component.scss']
})
export class ThisMonthCardComponent implements OnInit {
  thisMonthSuccess: ThisMonthSuccess;
  thisMonthFailed: ThisMonthFailed;
  thisMonthTotal: ThisMonthTotal;
  loading = false;
  lastm:any;

  constructor(private summaryService: SummaryService) { 
    this.getThisMonthTotal();
    this.getThisMonthSuccessfull();
    this.getThisMonthFailed();
  }

  ngOnInit() {
    this.summaryService.getLastMonthSuccess().subscribe(data =>{
      this.lastm = data;
      console.log(this.lastm, 'jjj')
    })
   
  }

  getThisMonthTotal() {
    this.loading = true;
    this.summaryService.getThisMonthTotal().subscribe((thisMonthTotal: ThisMonthTotal) => {
      this.loading = false;
      this.thisMonthTotal = thisMonthTotal;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisMonthTotal');
    })
  }

  getThisMonthSuccessfull() {
     this.loading = true;
    this.summaryService.getThisMonthSuccess().subscribe((thisMonthSuccess: ThisMonthSuccess) => {
      this.loading = false;
      this.thisMonthSuccess = thisMonthSuccess;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisMonthSuccess');
    })
  }

  getThisMonthFailed() {
    this.loading = true;
    this.summaryService.getThisMonthFailed().subscribe((thisMonthFailed: ThisMonthFailed) => {
      this.loading = false;
      this.thisMonthFailed = thisMonthFailed;
    }, error => {
      this.loading = false;
      console.log(error, 'cannot get thisMonthFailed');
    })
  }


}
