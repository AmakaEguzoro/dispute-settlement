import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'app/_service/summary.service';
import * as math from 'mathjs';
import { Subscription, Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { ChannelService } from 'app/_service/channels.service';
import { formatDate } from '@angular/common';
import { ProductsService } from 'app/_service/products.service';
import { IMyOptions } from 'lib/ng-uikit-pro-standard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-day-dashboard',
  templateUrl: './day-dashboard.component.html',
  styleUrls: ['./day-dashboard.component.scss']
})

export class DayDashboardComponent implements OnInit, OnDestroy {

  constructor(private paymentMethodService: PaymentMethodService, private summaryService: SummaryService,
    private fb: FormBuilder, private channelService: ChannelService, private productsService: ProductsService,) {
    this.searchForm = this.fb.group({
      startDate: ["", Validators.min],
    });
  }

  todayTime: any;
  todayFail: any;

  // search
  filterData: any;
  start: any;
  searchForm: FormGroup;

  response2Days: any;
  // summary of the data for last2days success and fail
  last2DaysTotalAmount: any;
  last2DaysTotalCount: any;
  last2DaysPercentChange: any;

  loading = false;
  isloading = false;
  isData: boolean;
  refresh: Subscription;
  todayDate: any; yesterdayDate: any; last2Days: any;
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

  // channels
  outputChannel: any;
  channelElements: any;

  // products
  outputProduct: any;
  productElements: any;

  // payment
  outputPayment: any;
  paymentElements: any;

  chartOptions: any; chartColors: Array<any>;
  chartType: Array<any>;
  // typeChart: any;
  datasets: any;
  chartDataArray: Array<any>;
  chartDatasets: Array<any>; selectedType: any;
  chartLabels: Array<any>; performanceLabels: any;
  chart: any;preDate:any;

  typeChart: Array<any> = [{ type: "bar" }, { type: "line" }];
  async ngOnInit() {
    this.chartType = this.typeChart[0].type;
    let dayDate = moment(); this.start = moment(dayDate).format('YYYY-MM-DD');
    
    this.preDate = new Date();
    this.yesterdayDate = this.preDate.setDate(this.preDate.getDate() - 1);
    this.last2Days = this.preDate.setDate(this.preDate.getDate() - 1);

    await this.getTodayTransaction();
    await this.getTodayChannel();
    await this.getTodayPayment();
    await this.getTodayProduct();
    await this.getTodayTimeChart(this.start);
    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(() => {
      this.getTodayTransaction();
    })
  }

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "yyyy-mm-dd",
    startDate: moment().format('YYYY-MM-DD'),
    ariaLabelOpenCalendar: "Open Calendar",
    closeAfterSelect: true,
    minYear: 1900,
  };
  searchTrans() {
    this.start = this.searchForm.value.startDate;
      this.getTodayTimeChart(this.start);
  }

  getTodayTimeChart(date) {
    this.isData = true;
    this.isloading = true,
      this.summaryService.getTodayTimeChart(this.start).subscribe(responseData => {
        this.isloading = false;
        this.todayTime = responseData.data;

        let time12amFail = this.todayTime.P12AMFailed; let time12amSucess = this.todayTime.P12AMSuccessful; let time12amTotal = this.todayTime.P12AMTotalAmount;
        let time1amFail = this.todayTime.P1AMFailed; let time1amSucess = this.todayTime.P1AMSuccessful; let time1amTotal = this.todayTime.P1AMTotalAmount;
        let time2amFail = this.todayTime.P2AMFailed; let time2amSucess = this.todayTime.P2AMSuccessful; let time2amTotal = this.todayTime.P2AMTotalAmount;
        let time3amFail = this.todayTime.P3AMFailed; let time3amSucess = this.todayTime.P3AMSuccessful; let time3amTotal = this.todayTime.P3AMTotalAmount;
        let time4amFail = this.todayTime.P4AMFailed; let time4amSucess = this.todayTime.P4AMSuccessful; let time4amTotal = this.todayTime.P4AMTotalAmount;
        let time5amFail = this.todayTime.P5AMFailed; let time5amSucess = this.todayTime.P5AMSuccessful; let time5amTotal = this.todayTime.P5AMTotalAmount;
        let time6amFail = this.todayTime.P6AMFailed; let time6amSucess = this.todayTime.P6AMSuccessful; let time6amTotal = this.todayTime.P6AMTotalAmount;
        let time7amFail = this.todayTime.P7AMFailed; let time7amSucess = this.todayTime.P7AMSuccessful; let time7amTotal = this.todayTime.P7AMTotalAmount;
        let time8amFail = this.todayTime.P8AMFailed; let time8amSucess = this.todayTime.P8AMSuccessful; let time8amTotal = this.todayTime.P8AMTotalAmount;
        let time9amFail = this.todayTime.P9AMFailed; let time9amSucess = this.todayTime.P9AMSuccessful; let time9amTotal = this.todayTime.P9AMTotalAmount;
        let time10amFail = this.todayTime.P10AMFailed; let time10amSucess = this.todayTime.P10AMSuccessful; let time10amTotal = this.todayTime.P10AMTotalAmount;
        let time11amFail = this.todayTime.P11AMFailed; let time11amSucess = this.todayTime.P11AMSuccessful; let time11amTotal = this.todayTime.P11AMTotalAmount;

        let time12pmFail = this.todayTime.P12PMFailed; let time12pmSucess = this.todayTime.P12PMSuccessful; let time12pmTotal = this.todayTime.P12PMTotalAmount;
        let time1pmFail = this.todayTime.P1PMFailed; let time1pmSucess = this.todayTime.P1PMSuccessful; let time1pmTotal = this.todayTime.P1PMTotalAmount;
        let time2pmFail = this.todayTime.P2PMFailed; let time2pmSucess = this.todayTime.P2PMSuccessful; let time2pmTotal = this.todayTime.P2PMTotalAmount
        let time3pmFail = this.todayTime.P3PMFailed; let time3pmSucess = this.todayTime.P3PMSuccessful; let time3pmTotal = this.todayTime.P3PMTotalAmount;
        let time4pmFail = this.todayTime.P4PMFailed; let time4pmSucess = this.todayTime.P4PMSuccessful; let time4pmTotal = this.todayTime.P4PMTotalAmount;
        let time5pmFail = this.todayTime.P5PMFailed; let time5pmSucess = this.todayTime.P5PMSuccessful; let time5pmTotal = this.todayTime.P5PMTotalAmount;
        let time6pmFail = this.todayTime.P6PMFailed; let time6pmSucess = this.todayTime.P6PMSuccessful; let time6pmTotal = this.todayTime.P6PMTotalAmount;
        let time7pmFail = this.todayTime.P7PMFailed; let time7pmSucess = this.todayTime.P7PMSuccessful; let time7pmTotal = this.todayTime.P7PMTotalAmount;
        let time8pmFail = this.todayTime.P8PMFailed; let time8pmSucess = this.todayTime.P8PMSuccessful; let time8pmTotal = this.todayTime.P8PMTotalAmount;
        let time9pmFail = this.todayTime.P9PMFailed; let time9pmSucess = this.todayTime.P9PMSuccessful; let time9pmTotal = this.todayTime.P9PMTotalAmount;
        let time10pmFail = this.todayTime.P10PMFailed; let time10pmSucess = this.todayTime.P10PMSuccessful; let time10pmTotal = this.todayTime.P10PMTotalAmount;
        let time11pmFail = this.todayTime.P11PMFailed; let time11pmSucess = this.todayTime.P11PMSuccessful; let time11pmTotal = this.todayTime.P11PMTotalAmount;



        this.datasets = [{
          data: [
            time12amSucess, time1amSucess, time2amSucess, time3amSucess, time4amSucess, time5amSucess,
            time6amSucess, time7amSucess, time8amSucess, time9amSucess, time10amSucess, time11amSucess,
            time12pmSucess, time1pmSucess, time2pmSucess, time3pmSucess, time4pmSucess, time5pmSucess,
            time6pmSucess, time7pmSucess, time8pmSucess, time9pmSucess, time10pmSucess, time11pmSucess,
          ], fill: false, label: 'Sucessful Transactions'
        },

        {
          data: [
            time12amFail, time1amFail, time2amFail, time3amFail, time4amFail, time5amFail,
            time6amFail, time7amFail, time8amFail, time9amFail, time10amFail, time11amFail,
            time12pmFail, time1pmFail, time2pmFail, time3pmFail, time4pmFail, time5pmFail,
            time6pmFail, time7pmFail, time8pmFail, time9pmFail, time10pmFail, time11pmFail,
          ], fill: false, label: 'Failed Transactions'
        },
        {
          data: [
            time12amTotal, time1amTotal, time2amTotal, time3amTotal, time4amTotal, time5amTotal,
            time6amTotal, time7amTotal, time8amTotal, time9amTotal, time10amTotal, time11amTotal,
            time12pmTotal, time1pmTotal, time2pmTotal, time3pmTotal, time4pmTotal, time5pmTotal,
            time6pmTotal, time7pmTotal, time8pmTotal, time9pmTotal, time10pmTotal, time11pmTotal,
          ], fill: false, label: 'Total Transactions'
        },
        ];


        this.chartLabels = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
          '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
        ];
        this.chartColors = [

          {

            backgroundColor: "#229654",
            borderColor: '#229654',
            borderWidth: 3,
            pointBackgroundColor: '#229654',
          },

          {
            backgroundColor: "#FF7070",
            borderColor: '#FF7070',
            borderWidth: 3,
            pointBackgroundColor: '#FF7070',
          },
          {
            backgroundColor: "#B4B4B4",
            borderColor: '#B4B4B4',
            borderWidth: 3,
            pointBackgroundColor: '#B4B4B4',

          }

        ];

        this.chartOptions = {
          responsive: true,
          // fill: false,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: '#808080',
              fontSize: 13,
              boxWidth: 7,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as any;
                return parseInt(tooltipValue).toLocaleString();
              }
            }
          },
          scales: {
            yAxes: [{
              display: true,
              stacked: true, grid: {

              },
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
            xAxes: [{
              display: true,
              barThickness: 10,
              stacked: true,
              ticks: {
                fontColor: '#69A8FF',
              },
              gridLines: {
                display: true,
              },

            }]
          }

        };

      }, error => {
        this.isData = false;
        this.isloading = false;
        console.log('cant get today response', error);
      }
      );
  }
  switchBarData() {
    this.chartType = this.typeChart[0].type;
  }
  switchLineData() {
    this.chartType = this.typeChart[1].type;
  }

  getTodayTransaction() {
    this.isData = true;
    this.loading = true,
      this.summaryService.getToday().subscribe(responseList => {

        this.loading = false;
        this.responseCurrent = responseList[0];
        this.responsePrevious = responseList[1];
        this.response2Days = responseList[2];


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
        this.last2DaysTotalAmount = this.response2Days.data.totalAmount;
        this.last2DaysTotalCount = this.response2Days.data.transactionCount;
        this.last2DaysPercentChange = ((this.previousTotal - this.last2DaysTotalAmount) / this.last2DaysTotalAmount);



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

        this.chart = new Chart('cans', {

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

  getTodayPayment() {
    this.isData = true;
    this.loading = true,
      this.paymentMethodService.getPaymentMethod('day').subscribe(responseData => {
        this.loading = false;
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

        this.chart = new Chart('can', {

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

  getTodayProduct() {
    this.isData = true;
    this.loading = true,
      this.loading = true, this.productsService.getProducts('day').subscribe(resposeData => {
        this.loading = false;

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


        this.chart = new Chart('ca', {

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
