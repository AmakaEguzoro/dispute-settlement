import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { BvnService } from 'app/service/bvn.service';

import { ModelBvn } from './bvn';


@Component({
  selector: 'app-bvn-status',
  templateUrl: './bvn-status.component.html',
  styleUrls: ['./bvn-status.component.scss']
})
export class BvnStatusComponent implements OnInit {

  bvns: ModelBvn;
  errorMessage: any;


  constructor(private bvnService: BvnService) { }

  Form = new FormGroup({
    bvn: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required),
    dateofbirth: new FormControl('', Validators.required),
  });    

  get bvn(){
    return this.Form.get('bvn');
  }

  get firstname(){
    return this.Form.get('firstname');
  }

  get lastname(){
    return this.Form.get('lastname');
  }

  get phonenumber(){
    return this.Form.get('phonenumber');
  }

  get dateofbirth(){
    return this.Form.get('dateofbirth');
  }










  ngOnInit(){
    console.log(this.Form.controls.value);
  }
    
  //   this.initForm();
  //  }

  // initForm() {
  //   this.bvnForm = this.fb.group({
  //     bvn: ['', [Validators.required, Validators.minLength(3)]],
  //     firstname: ['', Validators.required],
  //     lastname: ['', Validators.required],
  //     phonenumber: ['', Validators.required],
  //     dateofbirth: ['', Validators.required]
  //   });
  // }

  // onSubmit() {
  //   console.log(this.initForm)
    // this.bvnService.createForm(this.bvnForm)
    //   .subscribe(
    //     (response) => { console.log(response) },
    //     error => this.errorMessage = <any>error
    //   );
  // }

  }
