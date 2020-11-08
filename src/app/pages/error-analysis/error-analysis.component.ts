import { Component, OnInit } from '@angular/core';
import { ErrorAnalysisService } from 'app/_service/error-analysis.service';
import { IMyOptions } from 'lib';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-error-analysis',
  templateUrl: './error-analysis.component.html',
  styleUrls: ['./error-analysis.component.scss']
})
export class ErrorAnalysisComponent implements OnInit {

  isData:boolean;
  loading:boolean;
  searchForm:any;
  start: any;
  end: any;
  range: any;
  failureCount =  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
  products = [
    "IKEDC",
    "IBEDC",
    "EKEDC",
    "EEDC",
    "PHEDC",
    "AEDC",
    "KEDCO",
    "TRANSFER",
    "WITHDRAWAL",
    "MULTICHOICE",
    "MTNVTU",
    "MTNDATA",
    "MTNVTUSONITE",
    "MTNDATASONITE",
    "AIRTELDATA",
    "AIRTELVTU",
    "GLOVTU",
    "GLODATA",
    "ETISALATVTU",
    "ETISALATDATA",
    "STARTIMES",
    "GEHS",
    "OLHS",
    "SMILE",
    "LCC"
  ];

  DateObj: any = new Date();
  dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    "dateRange": this.newRange
  };
  constructor(private errorService:ErrorAnalysisService, private fb:FormBuilder) {
    this.searchForm = this.fb.group({
      startDate: ['', Validators.min],
      endDate: ['', Validators.min]
    });
   }
   headElements = ['#', 'PRODUCT', 'ERROR', 'COUNT'];
   errorData:any;

  ngOnInit() {
    this.getErrorAnalysisForVas(this.payload)
  }

  getErrorAnalysisForVas(payload){
    this.isData = false;
    this.loading = true;
    this.errorService.getErrorAnalysis(payload).subscribe(data =>{
      this.isData = true;
      this.loading = false;
        console.log(data);
        let failureCount = data.data.failureCount;
        this.products = data.data.products;
        this.chartDatasets = [
          { data: failureCount, label: "Service Failure Error Anaylysis for " + payload.dateRange },
        ];
    }, error =>{
      this.loading = false;
      console.log(error.error.error)
    })

  }

  searchTrans() {
    this.start = this.searchForm.value.startDate;
    this.end = this.searchForm.value.endDate;
    this.range = `${this.start} - ${this.end}`;
   
    this.payload = {
      "dateRange": this.range
    };
  
    console.log(this.payload);

    this.getErrorAnalysisForVas(this.payload)
  }

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy/mm/dd',
    startDate: this.dateRange,
    ariaLabelOpenCalendar: 'Open Calendar',
    closeAfterSelect: true,
    minYear: 1900,

  };

  searchError(){
    
  }

  public chartType: string = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: this.failureCount, label: 'Active Services' }
  ];

  public chartLabels: Array<any> = this.products;

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',

        
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',

        
      ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  
}
