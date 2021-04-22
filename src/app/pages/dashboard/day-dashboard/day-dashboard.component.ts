import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
import * as math from 'mathjs';
import { Subscription, Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { ChannelService } from 'app/_service/channels.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-day-dashboard',
  templateUrl: './day-dashboard.component.html',
  styleUrls: ['./day-dashboard.component.scss']
})

export class DayDashboardComponent implements OnInit, OnDestroy {

  constructor(private paymentMethodService: PaymentMethodService, private summaryService: SummaryService,
    private channelService: ChannelService) { }


  loading = false;
  isData: boolean;
  refresh: Subscription;
  todayDate: any; yesterdayDate: any;
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
  previousAmountSuccess: any;
  previousCountSuccess: any;

  previousAmountFailed: any;
  previousCountFailed: any;

  previousPercentFailed: any;
  previousPercentSuccess: any;

  totalCountPrevious: any;

  outputPayment: any;


  // channels
  outputChannel: any;
  elements: any; channelName: any;
  channelSucess: any; channelFailed: any; channeltotal: any;


  chartOptions: any; chartColors: Array<any>;
  chartType: string; chartDatasets: Array<any>;
  chart: any; chartLabels: Array<any>; performanceLabels: any;

  async ngOnInit() {
    this.todayDate = new Date();
    let preDate = new Date();
    this.yesterdayDate = preDate.setDate(preDate.getDate() - 1);
    await this.getTodayTransaction();
    await this.getTodayChannel();
    // await this.getTodayPayment();
    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(() => {
      this.getTodayTransaction();
    })
  }

  getTodayTransaction() {
    this.isData = true;
    this.loading = true,
      this.summaryService.getToday().subscribe(responseList => {

        // console.log(responseList); 
        this.loading = false; this.responseCurrent = responseList[0];
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
        console.log(this.percentChange);


      }, error => {
        this.isData = false
        this.loading = false;
        console.log('cant get today response', error);
      })

  }

  getTodayChannel() {
    this.isData = true;
    this.loading = true,
      this.channelService.getChannel('day').subscribe(responseData => {
        this.loading = false;
        this.outputChannel = responseData.data.response;
        this.outputChannel = this.outputChannel.sort((a, b) => (a.total > b.total) ? -1 : 1);
        //splice the array and pick the top five
        let sortArray = this.outputChannel;
        this.elements = sortArray.splice(0, 5);
        for (let entry of this.elements) {
          this.channelName = entry.name
          console.log(entry.name); // 1, "string", false
        }
        for (let entrysuccess of this.elements) {
          this.channelSucess = entrysuccess.success
        }
        for (let entryFailed of this.elements) {
          this.channelFailed = entryFailed.failed
        }
        for (let entryTotal of this.elements) {
          this.channeltotal = entryTotal.total
        }
        this.chart = new Chart('cans', {
                  type: 'horizontalBar',
                  data: {
                    // labels: this.channelName,
                    datasets: [
                      {
                        label: "Successful Transaction",
                        backgroundColor: "#3986D9",
                        borderWidth: 0,
                       data: this.channelSucess
                      }, {
                        label: "Failed Transaction",
                        backgroundColor: "#093664",
                        borderWidth: 0,
                       data: this.channelFailed
                      },
                      {
                        label: "Total Transaction",
                        backgroundColor: "#B4B4B4",
                        borderWidth: 0,
                        data: this.channeltotal
                      },
                    ],
                  },
                  options: {
                    //   tooltips: {
                    //     // mode: 'index',
                    //     mode: 'x'  // will show the amount. just add it to the label and convert it to "k", "t"
                    // },
                  //   layout: {
                  //     padding : {
                  //       left: 8
                  //     }
                  // },
                    tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as any;
                          return parseInt(tooltipValue).toLocaleString();
                        }
                      }
                    },
                    responsive: true,
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        fontColor: '#808080',
                        fontSize: 8,
                        boxWidth: 5,
                      }
                     
                    },
                    scales: {
                      xAxes: [{
                        display: true,
                        stacked: true,
                        ticks: {
                          
                          callback: function (input: any, args?: any) {
                            var exp, rounded,
                              suffixes = ['k', 'M', 'B', 'T', 'P', 'E'];
                            if (Number.isNaN(input)) {
                              return null;
                            }
                            if (input < 1000) {
                              return input;
                            }
                            exp = Math.floor(Math.log(input) / Math.log(1000));
                            return (input / Math.pow(1000, exp)) + suffixes[exp - 1];
                          }
                         
                        },
                        gridLines: {
                          display: false
                        },
                      }],
                      yAxes: [{
                        display: true,
                        barThickness: 10,
                        stacked: true,
                        
                        gridLines: {
                          display: false,
                        },
                       
                      }]
                    }
                  }
                });



      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get today response', error);
      });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }





}


