import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private paymentMethodService: PaymentMethodService) { }
  loading = false;
  outputPayment: any;

  elements: any;
  isData: boolean;

  chartOptions: any; chartColors: Array<any>;
  chartType: string; chartDatasets: Array<any>;
  chart: any; chartLabels: Array<any>; performanceLabels: any;

  ngOnInit() {
    this.getTodayPayment();
  }
  getTodayPayment() {
    this.isData = true;
    this.loading = true,
      this.paymentMethodService.getPaymentMethod('day').subscribe(resposeData => {
        this.loading = false;

        this.outputPayment = resposeData.data.response;
        this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputPayment;
        this.elements = sortArray.splice(0, 5);
console.log(this.elements,'ytre')
        // this.chartLabels = [ ];

      this.chart = new Chart('canas', {
        type: 'horizontalBar',
        data: {
          labels: ['cash', 'card'],
          datasets: [
            {
              label: "Successful Transaction",
              backgroundColor: "#3986D9",
              borderWidth: 0,
              // data: this.elements.success
              data: [4444,343]
            }, {
              label: "Failed Transaction",
              backgroundColor: "#093664",
              borderWidth: 0,
              // data: this.elements.failed
              data: [332,654]

            },
            {
              label: "Total Transaction",
              backgroundColor: "#B4B4B4",
              borderWidth: 0,
              // data: this.elements.total
              data: [643,533]

            },
          ],
        },
        options: {
          //   tooltips: {
          //     // mode: 'index',
          //     mode: 'x'  // will show the amount. just add it to the label and convert it to "k", "t"
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
            // maxHeight: 44px
            // textAlign: 'left',
          },
          scales: {
            xAxes: [{
              display: true,
              stacked: true,
              gridLines: {
                display: false
              },
            }],
            yAxes: [{
              display: true,
              barThickness: 10,
              stacked: true,
              // ticks: {
              //   callback: function (input: any, args?: any) {
              //     var exp, rounded,
              //       suffixes = ['k', 'M', 'B', 'T', 'P', 'E'];
              //     if (Number.isNaN(input)) {
              //       return null;
              //     }
              //     if (input < 1000) {
              //       return input;
              //     }
              //     exp = Math.floor(Math.log(input) / Math.log(1000));
              //     return (input / Math.pow(1000, exp)) + suffixes[exp - 1];
              //   }
              // },
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
        console.log('cant get today payment method', error);
      });
  }
}
