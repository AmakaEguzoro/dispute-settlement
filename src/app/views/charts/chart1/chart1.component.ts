import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {

  public chart3Type:string = 'bar';
// tslint:disable-next-line:max-line-length
// Note that below data are duplicated, it shouldn't be used that way. Purpose of following is keep data clearly binded to each chart separetaly.
public chart3Datasets:Array<any> = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'My Second dataset'},
  // {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
];

public chart3Labels:Array<any> = ['A', 'B', 'C', 'D', 'E'];



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

  constructor() { }

  ngOnInit() {
  }

  elements: any = [
    { product: 'Product A', amount: '300k', percent: '80%'},
    { product: 'Product B', amount: '200k', percent: '5%'},
    { product: 'Product C', amount: '100k', percent: '40%'},
    { product: 'Product D', amount: '50k', percent: '5%'},
    { product: 'Product E', amount: '10k', percent: '1%'},
  ];

  // headElements = ['First', 'Last', 'Handle'];

}
