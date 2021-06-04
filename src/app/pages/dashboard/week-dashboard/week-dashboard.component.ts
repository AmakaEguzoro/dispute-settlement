import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';
import { ChannelService } from 'app/_service/channels.service';
import { Chart } from 'chart.js';
import { ProductsService } from 'app/_service/products.service';
import { PaymentMethodService } from 'app/_service/payment-method.service';


@Component({
  selector: 'app-week-dashboard',
  templateUrl: './week-dashboard.component.html',
  styleUrls: ['./week-dashboard.component.scss']
})
export class WeekDashboardComponent implements OnInit, OnDestroy {
  loading = false;
  isProductload = false;  isPaymentload = false; isChannelload = false; 

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
  previousAmountSuccess: any;
  previousCountSuccess: any;

  previousAmountFailed: any;
  previousCountFailed: any;

  previousPercentFailed: any;
  previousPercentSuccess: any;

  totalCountPrevious: any;
  response2weeks:any; last2WeeksTotalCount:any; last2WeeksTotalAmount:any; last2WeeksPercentChange:any;

  outputChannel:any;
  channelElements: any;
   // products
   outputProduct: any;
   productElements: any;
 
   // payment
   outputPayment: any;
   paymentElements: any;
  chart: any; 

  

  todayDate: any; lastWeekDate: any; last2Weeks: any;

  constructor(private summaryService: SummaryService,private channelService: ChannelService,
    private productsService: ProductsService, private paymentMethodService: PaymentMethodService,) { }

  async ngOnInit() {
    let week2 = moment().subtract(2, 'weeks'); this.last2Weeks = moment(week2).format('W-YYYY');
    let week1 = moment().subtract(1, 'weeks'); this.lastWeekDate = moment(week1).format('W-YYYY');
    this.todayDate = new Date();
    await this.getThisWeekTransaction();
    await this.getThisWeekChannel();
    await this.getThisWeekPayment();
    await this.getThisWeekProduct();


    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(() => {
      this.getThisWeekTransaction();
    })
  }

  getThisWeekTransaction() {
    this.isData = true;
    this.loading = true,
      this.summaryService.getThisWeek().subscribe(responseList => {

        this.loading = false; this.responseCurrent = responseList[0];
        this.responsePrevious = responseList[1];
        this.response2weeks = responseList[2];

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

        // summary of the data for last2days success and fail
        this.last2WeeksTotalAmount = this.response2weeks.data.totalAmount;
        this.last2WeeksTotalCount = this.response2weeks.data.transactionCount;
        this.last2WeeksPercentChange = ((this.previousTotal - this.last2WeeksTotalAmount) / this.last2WeeksTotalAmount);


      }, error => {
        this.isData = false
        this.loading = false;
        console.log('cant get today response', error);
      })

  }

  getThisWeekChannel() {
    this.isData = true;
    this.isChannelload = true,
      this.channelService.getChannel('week').subscribe(responseData => {
        this.isChannelload = false;
        this.outputChannel = responseData.data.response;

        this.outputChannel = this.outputChannel.sort((a, b) => (a.total > b.total) ? -1 : 1);
  
        //splice the array and pick the top five
        let sortArray = this.outputChannel;
        this.channelElements = sortArray.splice(0, 5);
        let firstChannel = this.channelElements[0];

        let channelName1 = firstChannel.name;
        let channelSucess1 = firstChannel.success;
        let channelFailed1 = firstChannel.failed;
        let channelTotal1 = firstChannel.total;

        let secondChannel = this.channelElements[1];
        let channelName2 = secondChannel.name;
        let channelSucess2 = secondChannel.success;
        let channelFailed2 = secondChannel.failed;
        let channelTotal2 = secondChannel.total;

        let thirdChannel = this.channelElements[2];
        let channelName3 = thirdChannel.name;
        let channelSucess3 = thirdChannel.success;
        let channelFailed3 = thirdChannel.failed;
        let channelTotal3 = thirdChannel.total;

        let fourthChannel = this.channelElements[3];
        let channelName4 = fourthChannel.name;
        let channelSucess4 = fourthChannel.success;
        let channelFailed4 = fourthChannel.failed;
        let channelTotal4 = fourthChannel.total;

        let fiveChannel = this.channelElements[4];
        let channelName5 = fiveChannel.name;
        let channelSucess5 = fiveChannel.success;
        let channelFailed5 = fiveChannel.failed;
        let channelTotal5 = fiveChannel.total;

        this.chart = new Chart('WeekChannel', {

          type: 'horizontalBar',
          data: {
            labels: [channelName1, channelName2, channelName3, channelName4, channelName5],
            datasets: [
              {
                label: "Successful Transaction",
                backgroundColor: "#3986D9",
                borderWidth: 0,
                data: [channelSucess1, channelSucess2, channelSucess3, channelSucess4, channelSucess5],
              }, {
                label: "Failed Transaction",
                backgroundColor: "#093664",
                borderWidth: 0,
                data: [channelFailed1, channelFailed2, channelFailed3, channelFailed4, channelFailed5],
              },
              {
                label: "Total Transaction",
                backgroundColor: "#B4B4B4",
                borderWidth: 0,
                data: [channelTotal1, channelTotal2, channelTotal3, channelTotal4, channelTotal5],
              },
            ],
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
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
                barThickness: 7,
                ticks: {
                  fontSize: 9,
                },
                gridLines: {
                  display: false,
                },

              }]
            }
          }
        });



      }, error => {
        this.isData = false;
        this.isChannelload = false;
        console.log('cant get today response', error);
      });
  }
  getThisWeekPayment() {
    this.isData = true;
    this.isPaymentload = true,
      this.paymentMethodService.getPaymentMethod('week').subscribe(responseData => {
        this.isPaymentload = false;
        this.outputPayment = responseData.data.response;

        this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);
        //splice the array and pick the top five
        let sortArray = this.outputPayment;
        this.paymentElements = sortArray.splice(0, 5);

        let firstPayment = this.paymentElements[0];
        let paymentName1 = firstPayment.name;
        let paymentSucess1 = firstPayment.success;
        let paymentFailed1 = firstPayment.failed;
        let paymentTotal1 = firstPayment.total;

        let secondPayment = this.paymentElements[1];
        let paymentName2 = secondPayment.name;
        let paymentSucess2 = secondPayment.success;
        let paymentFailed2 = secondPayment.failed;
        let paymentTotal2 = secondPayment.total;

        this.chart = new Chart('weekPayment', {

          type: 'horizontalBar',
          data: {
            labels: ['CASH', 'CARD',],
            datasets: [
              {
                label: "Successful Transaction",
                backgroundColor: "#3986D9",
                borderWidth: 0,
                data: [paymentSucess1, paymentSucess2,],
              }, {
                label: "Failed Transaction",
                backgroundColor: "#093664",
                borderWidth: 0,
                data: [paymentFailed1, paymentFailed2,],
              },
              {
                label: "Total Transaction",
                backgroundColor: "#B4B4B4",
                borderWidth: 0,
                data: [paymentTotal1, paymentTotal2,],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as any;
                  return parseInt(tooltipValue).toLocaleString();
                }
              }
            },
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
                barThickness: 7,
                ticks: {
                  fontSize: 9,
                },
                gridLines: {
                  display: false,
                },

              }]
            }
          }
        });



      }, error => {
        this.isData = false;
        this.isPaymentload = false;
        console.log('cant get today response', error);
      });
  }

  getThisWeekProduct() {
    this.isData = true;
    this.isProductload = true,
       this.productsService.getProducts('week').subscribe(resposeData => {
        this.isProductload = false;

        // console.log('This is my Response List', resposeData);
        this.outputProduct = resposeData.data.response;
        this.outputProduct = this.outputProduct.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputProduct;
        this.productElements = sortArray.splice(0, 5);

        let firstProduct = this.productElements[0];
        let productName1 = firstProduct.name;
        let productSucess1 = firstProduct.success;
        let productFailed1 = firstProduct.failed;
        let productTotal1 = firstProduct.total;

        let secondProduct = this.productElements[1];
        let productName2 = secondProduct.name;
        let productSucess2 = secondProduct.success;
        let productFailed2 = secondProduct.failed;
        let productTotal2 = secondProduct.total;

        let thirdProduct = this.productElements[2];
        let productName3 = thirdProduct.name;
        let productSucess3 = thirdProduct.success;
        let productFailed3 = thirdProduct.failed;
        let productTotal3 = thirdProduct.total;

        let fourthProduct = this.productElements[3];
        let productName4 = fourthProduct.name;
        let productSucess4 = fourthProduct.success;
        let productFailed4 = fourthProduct.failed;
        let productTotal4 = fourthProduct.total;

        let fiveProduct = this.productElements[4];
        let productName5 = fiveProduct.name;
        let productSucess5 = fiveProduct.success;
        let productFailed5 = fiveProduct.failed;
        let productTotal5 = fiveProduct.total;


        this.chart = new Chart('weekProduct', {

          type: 'horizontalBar',
          data: {
            labels: [productName1, productName2, productName3, productName4, productName5],
            datasets: [
              {
                label: "Successful Transaction",
                backgroundColor: "#3986D9",
                borderWidth: 0,
                data: [productSucess1, productSucess2, productSucess3, productSucess4, productSucess5],
              }, {
                label: "Failed Transaction",
                backgroundColor: "#093664",
                borderWidth: 0,
                data: [productFailed1, productFailed2, productFailed3, productFailed4, productFailed5],
              },
              {
                label: "Total Transaction",
                backgroundColor: "#B4B4B4",
                borderWidth: 0,
                data: [productTotal1, productTotal2, productTotal3, productTotal4, productTotal5],
              },
            ],
          },
          options: {
            responsive: false,
            maintainAspectRatio: false,
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
                barThickness: 7,
                ticks: {
                  fontSize: 9,
                },
                gridLines: {
                  display: false,
                },

              }]
            }
          }
        });



      }, error => {
        this.isData = false;
        this.isProductload = false;
        console.log('cant get today response', error);
      });
  }
  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

}