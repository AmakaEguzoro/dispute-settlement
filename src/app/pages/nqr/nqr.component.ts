import { NqrserviceService } from './../../_service/nqrservice.service';
import { Component, OnInit } from '@angular/core';
import {
 
  ToastService,
} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-nqr',
  templateUrl: './nqr.component.html',
  styleUrls: ['./nqr.component.scss']
})
export class NqrComponent implements OnInit {
walletid:any;
email:any;
phoneNo:any;
fixed:any;
name:any;
amount:any;
 errors: any = {};
  error: boolean=true;
isData:boolean=false
loading:boolean=false
is_registered:boolean=true
amountField:boolean=false
  constructor( private nqrService:NqrserviceService,private toast:ToastService) { }

  ngOnInit() {
  }

   options = [
    
   {label:"No", value:"no"} ,
    {label:"Yes",value:"yes"}
   ];
 CreateAccount() {
    const isPhone = /^(0|234|\+234)[0-9]{10}$/;
    const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    this.error = false;
    this.errors = {
      //account number errors
      walletid: !this.walletid ? "Wallet Id  is required" : "",
     email:!this.email? "Email is required":"",
     name:!this.name? "Name is required":"",
     phoneNo:!this.phoneNo? "Phone No is required":"",
    amount:!this.amount? "Amount is required":"",
    
    };
    if (!this.walletid) this.error = true;
     if (!this.email &&
      !isEmail.test(this.email)) this.error = true; 
     if (!this.name) this.error = true; 
     if (!this.phoneNo &&
      !isPhone.test(this.phoneNo)) this.error = true;
     if(this.amountField){
       if(!this.amount) this.error=true;
     };

  if(!this.error){

   const obj={
     wallet:this.walletid,
     name:this.name,
     email:this.email,
     phoneNumber:this.phoneNo,
     isFixedAmount:this.fixed?this.fixed:"no",
     amount:this.amount
   }
   
    this.loading = true;
    this.nqrService.createSubMerchant(obj).subscribe(
      (data) => {
        this.loading = false;
       this.toast.success("Agent Created")
       console.log(data,"data")
       this.name='';
       this.walletid='';
       this.phoneNo='';
       this.email='';
       this.fixed='no'

      },
      (error) => {
     
        this.loading = false;
        this.toast.error("Cant Create Agent")
        console.log("cant register agent", error);
      }
    );}
  }

  VerifyAccount() {
      this.loading = true;
    this.nqrService.VerifyAccount(this.walletid).subscribe(
      (data:any) => {
        this.loading = false;
       this.toast.show(data.message)
       this.is_registered=data.data.isRegistered
//      if(data.data.isRegistered=false){
// this.is_registered=false
//      }
//      else{
// this.is_registered=true;
//      }


      },
      (error) => {
        this.is_registered=true;
       
        this.loading = false;
        this.toast.error(error.message)
        console.log("cant validate agent", error);
      }
    );
  }

  showAmount($event){
this.fixed=$event.target.value
if($event.target.value=='yes'){
this.amountField=true
}else{
  this.amountField=false
}
    
  }
   
}
