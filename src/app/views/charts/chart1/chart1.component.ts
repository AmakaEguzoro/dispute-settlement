import { Component, OnInit } from '@angular/core';
import { ChartService } from 'app/service/chart.service';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  loading = false;
  public chart3Type:string = 'bar';
public chart3Datasets:Array<any> = [];

public chart3Labels:Array<any> = [];
records : {};


public chart3Colors:Array<any> = [
  {
      backgroundColor: '#374AFB',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      // width: '10'
  }
];


public chartOptions:any = { 
  responsive: true
};

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    // this.loading = true;
    // this.chartService.getLastWeekChart().subscribe(data=>{
    //   this.loading = false;
    //   // console.log('Chart1Component data', data.data);
    //   if(data){
    //     let newData =  Object.keys(data.data);
    //     let newDataset = {data:Object.values(data.data)};
    //     this.chart3Datasets.push(newDataset);
    //   this.chart3Labels = newData;
    //   this.records = data.data
    //   }
    // }, error => {
    //   this.loading = false;
    //   console.log(error);
    // })
  }

  elements: any = [
    { product: 'Product A', amount: '300k', percent: '80%'},
    { product: 'Product B', amount: '200k', percent: '5%'},
    { product: 'Product C', amount: '100k', percent: '40%'},
    { product: 'Product D', amount: '50k', percent: '5%'},
    { product: 'Product E', amount: '10k', percent: '1%'},
  ];

  headElements = ['Product', 'Amount', 'Percent'];

}
