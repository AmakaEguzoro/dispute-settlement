import { McashterminalsService } from 'app/_service/mcashterminals.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mcash',
  templateUrl: './mcash.component.html',
  styleUrls: ['./mcash.component.scss']
})
export class McashComponent implements OnInit {
  McashForm: FormGroup;
  errorMessage: any;
  // status: any;
  resp_message: string;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private mCash: McashterminalsService) { }


  ngOnInit() {
    this.McashForm = this.fb.group({
      merchantCode: ['', Validators.required],
      terminalId: ['', Validators.required],
      merchantName: ['', Validators.required],
      terminalBank: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.mCash.createFormMcash(this.McashForm.value)
      .subscribe(McashData => {
       // console.log(JSON.stringify(McashData));
       // this.status = McashData.status;
       // console.log(this.status);
        this.resp_message = McashData.message;
       // console.log(this.resp_message);
        this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error.message);
    });
  }


  get merchantCode() {
    return this.McashForm.get('merchantCode');
  }

  get terminalId() {
    return this.McashForm.get('terminalId');
  }

  get merchantName() {
    return this.McashForm.get('merchantName');
  }

  get terminalBank() {
    return this.McashForm.get('terminalBank');
  }

}