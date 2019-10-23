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
    this.getErrorAnalysisForVas()
  }

  getErrorAnalysisForVas(){
    this.isData = false;
    this.loading = true;
    this.errorService.getErrorAnalysis(this.payload).subscribe(data =>{
      this.isData = true;
      this.loading = false;
        console.log(data);
        this.errorData = data;
    }, error =>{
      this.loading = false;
      console.log(error.error.error)
    })

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
}
