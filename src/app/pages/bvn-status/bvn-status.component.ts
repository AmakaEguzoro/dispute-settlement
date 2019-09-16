import { BvnLoginService } from '../../_service/bvn-login.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BvnService } from 'app/_service/bvn.service';
import { IMyOptions } from 'ng-uikit-pro-standard';



@Component({
  selector: 'app-bvn-status',
  templateUrl: './bvn-status.component.html',
  styleUrls: ['./bvn-status.component.scss']
})
export class BvnStatusComponent implements OnInit {

  bvnForm: FormGroup;
  errorMessage: any;
  Token: string;
  disp_bvnData: any;
  isLoading: boolean;
  isChosen: any;
  validity: any;

  constructor(private fb: FormBuilder, private bvnService: BvnService, private bvnLogin: BvnLoginService) { }

  ngOnInit() {
    this.bvnForm = this.fb.group({
      bvn: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      dateofbirth: ['', Validators.required]
    });
  }

  onSubmit() {
    //console.log(this.bvnForm.value)
    this.isLoading = true;
    this.bvnLogin.loginPath().subscribe(data => {
      this.Token = data.token;
      this.bvnService.createForm(this.bvnForm.value, this.Token)
        .subscribe((bvnData) => {
          console.log(JSON.stringify(bvnData));
         this.disp_bvnData = bvnData.data.message;
         this.isChosen = bvnData.data.RequestStatus;
         this.validity = bvnData.data.Validity;
         
         this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.message);
        });
    }, error => {
      console.log(error.message);
    });
    // console.log("Bvn Login Data " + JSON.stringify(bvnTokenData))   
  }

  get bvn() {
    return this.bvnForm.get('bvn');
  }

  get firstname() {
    return this.bvnForm.get('firstname');
  }

  get lastname() {
    return this.bvnForm.get('lastname');
  }

  get phonenumber() {
    return this.bvnForm.get('phonenumber');
  }

  get dateofbirth() {
    return this.bvnForm.get('dateofbirth');
  }

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mmmm-yyyy',
    minYear: 1900,

  };

}
