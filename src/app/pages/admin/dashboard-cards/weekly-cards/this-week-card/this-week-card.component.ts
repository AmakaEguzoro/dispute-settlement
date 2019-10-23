import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-this-week-card',
  templateUrl: './this-week-card.component.html',
  styleUrls: ['./this-week-card.component.scss']
})
export class ThisWeekCardComponent implements OnInit, OnDestroy {

  loading = false;
  isData: boolean;
  refresh: Subscription;

  //version 2 variables
  
  //response holder for success and  fail 
  responseCurrent: any;
  responsePrevious: any;

  previousTotal: any = null;

  //response holder for success and  fail count
  successCountCurrent: any;
  failCountCurrent: any;

  //response holder for success and  fail  amount
  successAmountCurrent: any = null;
  failAmountCurrent: any = null;

  //percentage change
  percentChange: any = null;

  //response holder for success and  fail  percentage
  successPercentCurrent: any;
  failPercentCurrent: any;

  //total amount and count
  totalAmountCurrent: any;
  totalCountCurrent: any;

  //previous data
  previousAmountSuccess:any;
  previousCountSuccess:any;

  previousAmountFailed:any;
  previousCountFailed:any;

  previousPercentFailed:any;
  previousPercentSuccess:any;

  totalCountPrevious:any;


  
  constructor(private summaryService: SummaryService) { }

  async ngOnInit() {
    await this.getTodayTransaction();

    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(() => {
      this.getTodayTransaction();
    })
  }
  getTodayTransaction() {
    this.isData = true;
    this.loading = true,
      this.summaryService.getThisWeek().subscribe(responseList => {
          
          console.log(responseList); 
          this.loading = false;  this.responseCurrent = responseList[0];
          this.responsePrevious = responseList[1];
    
          // console.log(this.responsePrevious);
    
          //summary of the data for success and fail
          this.successCountCurrent = parseInt(this.responseCurrent.data.successfulCount);
          this.failCountCurrent = parseInt(this.responseCurrent.data.failedCount);
    
          //summary of the data for success and fail
          this.successAmountCurrent = parseFloat(this.responseCurrent.data.successfulAmount);
          this.failAmountCurrent = parseFloat(this.responseCurrent.data.failedAmount);
    
          //output response to display
          this.totalCountCurrent = this.responseCurrent.data.transactionCount;
          this.totalAmountCurrent = this.responseCurrent.data.totalAmount;
    
    
          //summary of the data for success and fail
          this.successPercentCurrent = this.responseCurrent.data.successfulPercent;
          this.failPercentCurrent = this.responseCurrent.data.failedPercent;
    
          //summary of the data for previous  success and fail
    
          this.previousAmountSuccess = parseFloat(this.responsePrevious.data.successfulAmount);
          this.previousAmountFailed = parseFloat(this.responsePrevious.data.failedAmount);
          this.previousTotal = this.previousAmountSuccess + this.previousAmountFailed / 100;
          this.totalCountPrevious = this.responsePrevious.data.transactionCount;
          this.previousCountFailed = this.responsePrevious.data.failedCount;
          this.previousCountSuccess = this.responsePrevious.data.successfulCount;

          this.previousPercentFailed = this.responsePrevious.data.failedPercent;
          this.previousPercentSuccess = this.responsePrevious.data.successfulPercent;

          this.percentChange = ((this.totalAmountCurrent - this.previousTotal) / this.previousTotal);
    
        }, error => {
          this.isData = false
          this.loading = false;
          console.log('cant get today response', error);
        })
    
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

}