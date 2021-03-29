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
amountField:boolean=false
fixed:any;
amount:any;
loading:boolean=false
options = [
    
   {label:"No", value:"no"} ,
    {label:"Yes",value:"yes"}
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
this.amountField=true
}else{
  this.amountField=false
}
    
  }

  addfile(event)     
  {    
  this.filess= event.target.files[0];  
  console.log(this.filess,"file")  
 
}
displayfiles(){
  if(!this.filess){
    this.toast.error("Please Insert File")
  }

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
            
    
  }    
}
clear(){
  this.fileArray=""
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
 agents:this.fileArray
  }
  this.loading = true;
    this.nqrService.bulkcreateSubMerchant(obj).subscribe(
      (data) => {
        this.loading = false;
       this.toast.success(data.message || "Agents Created")
    
    this.fileArray=""

      },
      (error) => {
     
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


