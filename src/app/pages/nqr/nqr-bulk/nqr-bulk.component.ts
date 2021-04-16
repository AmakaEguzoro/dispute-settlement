import { document } from './../../../../lib/ng-uikit-pro-standard/free/utils/facade/browser';
import { Component, Inject, OnInit, HostListener } from '@angular/core';
import * as XLSX from 'xlsx'
import {
 
  ToastService,
} from "ng-uikit-pro-standard";
import { DOCUMENT } from "@angular/platform-browser";
import { NqrserviceService } from '../../../_service/nqrservice.service';
@Component({
  selector: 'app-nqr-bulk',
  templateUrl: './nqr-bulk.component.html',
  styleUrls: ['./nqr-bulk.component.scss']
})
export class NqrBulkComponent implements OnInit {
// windowScrolled: boolean;
   constructor( private nqrService:NqrserviceService,private toast:ToastService,@Inject(DOCUMENT) private document:Document) { }
//  @HostListener("window:scroll", [])
  ngOnInit() {
  }
title:any
filess:File
arrayBuffer:any
serial: number=1;
filelist:any
fileArray:any
fileArr:any
show:boolean=false
merchantField:boolean=false
fixed:any;
merchantNo:any;
loading:boolean=false
errors: any = {};
  error: boolean=true;
options = [
    
   {label:"ITEX", value:""} ,
    {label:"PTSP",value:"yes"}
   ];
    headElements = [
    "S/N",
    "WALLET",
    "NAME",
    "EMAIL",
    "PHONE NO",
    "FIXED AMOUNT",
    "AMOUNT"
  ];

 showAmount($event){
this.fixed=$event.target.value
if($event.target.value=='yes'){
this.merchantField=true
}else{
  this.merchantField=false
}
    
  }

  addfile(event)     
  {    
  this.filess= event.target.files[0];
  console.log(this.filess)
  if(this.filess){
    this.show=true;
  }else{
    this.show=false
  }
 
 
}
displayfiles(){
  this.error = false;
    this.errors = {

    
    merchantNo:!this.merchantNo? "Merchant No is required":"",
    
    };
   
     if(this.merchantField){
       if(!this.merchantNo) this.error=true;
     };

  if(!this.filess){
    this.toast.error("Please Insert File")
  }

  if(!this.error){
 let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.filess);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];      
        this.fileArr = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
     this.fileArray=this.toStrings(this.fileArr) 
     console.log(this.fileArr,"filearray")           
    
  }} else{
this.toast.error("Please Input required value")
  }  

}
clear(){
  this.fileArray=""
  this.show=false
}

toStrings(o) {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object') {
      return this.toStrings(o[k]);
    } 
    o[k] = '' + o[k];
  });
  return o;
}


confirm(){

  const obj={
 agents:this.fileArray,
 merchantNo:this.merchantNo
  }
  this.loading = true;
    this.nqrService.bulkcreateSubMerchant(obj).subscribe(
      (data) => {
        this.loading = false;
       this.toast.success(data.message || "Agents Created")
    
    this.fileArray=""
    this.show=false
    this.merchantNo=""
    this.merchantField=false

      },
      (error) => {
      this.fileArray=""
    this.show=false
    this.merchantNo=""
    this.merchantField=false
        this.loading = false;
        this.toast.error(error.error.data[0] || "Cant Create Agent")
        console.log("cant register agent", error);
      }
    )}
//  onWindowScroll() {
//         if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
//             this.windowScrolled = true;
//         } 
//        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
//             this.windowScrolled = false;
//         }
//     }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
    }


