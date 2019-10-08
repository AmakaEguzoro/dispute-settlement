import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'lib';
import { AgencyBankingService } from 'app/_service/agency-banking.service';
import { ExcelService } from 'app/_service/excel.service';

@Component({
  selector: 'app-agency-banking',
  templateUrl: './agency-banking.component.html',
  styleUrls: ['./agency-banking.component.scss']
})
export class AgencyBankingComponent implements OnInit {

  DateObj: any = new Date();
  dateRange = (String)(this.DateObj.getFullYear() + '/' + (this.DateObj.getMonth() + 1) + '/' + this.DateObj.getDate());
  payload = {
    "dateRange": this.dateRange
  };

  searchForm: FormGroup;
  loading: boolean = false;
  isData: boolean;
  exportData:any;

  constructor(public fb: FormBuilder, 
    public agencyBanking: AgencyBankingService,
    public excelService:ExcelService
    ) {
      console.log(this.loading);
      
      this.searchForm = this.fb.group({
      // startDate: ['', Validators.min],
      // endDate: ['', Validators.min]
    });
  }

  public onDateChnaged(event) {
    this.payload.dateRange = event.actualDateFormatted;
    console.log('new payload ', this.payload.dateRange);
  }

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy/mm/dd',
    startDate: this.dateRange,
    ariaLabelOpenCalendar: 'Open Calendar',
    closeAfterSelect: true,
    minYear: 1900,

  };


  downloadAgencyReport(): void {

    this.isData = true;
    this.loading = true;
    this.agencyBanking.getAgencyBankingData(this.payload).subscribe((data) => {
      this.loading = false;
      this.exportData = data;
      // console.log(this.exportData);
      this.excelService.exportAsExcelFile(this.exportData, 'Agency Banking Report');

    }, error => {
      this.isData = false;
      this.loading = false;
      console.log('cant get transaction details', error);
    })
  }
  ngOnInit() {
  }

}
