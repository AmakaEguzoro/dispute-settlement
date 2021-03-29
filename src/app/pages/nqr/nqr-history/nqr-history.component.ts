import { Component, HostListener, OnInit, Inject, ViewChild } from '@angular/core';
import {
 
  ToastService,
} from "ng-uikit-pro-standard";
import { Router } from "@angular/router";
import { NqrserviceService } from '../../../_service/nqrservice.service';
import { DOCUMENT } from "@angular/platform-browser";
import { document } from './../../../../lib/ng-uikit-pro-standard/free/utils/facade/browser';
@Component({
  selector: 'app-nqr-history',
  templateUrl: './nqr-history.component.html',
  styleUrls: ['./nqr-history.component.scss']
})
export class NqrHistoryComponent implements OnInit {
  

   constructor( private nqrService:NqrserviceService,private toast:ToastService,@Inject(DOCUMENT) private document:Document,private router:Router) { }
// @HostListener("window:scroll", [])
// windowScrolled: boolean;
serial:number;
fileArray:any;
isData:boolean=false
perPage:number=50;
prev_disable: boolean = true;
  pageRange: string;
lastPage:number
  next_disable: boolean = false;
page = 1;
summaryData:any
total:any
currentPage = 1;
 headElements = [
    "S/N",
    "WALLET",
    "SubMerchant Name",
    "SubMerchant No",
    "QR Code"
  
  ];
  ngOnInit() {
    this.AgentSummary()
  }

loading:boolean=false

    

  AgentSummary() {
    this.isData = true;
    this.loading = true;
    this.nqrService.getHistory(this.perPage, this.page).subscribe(
      (data: any) => {
        this.loading = false;
        this.summaryData = data.data.list.data;
         this.lastPage=data.data.list.last_page
        
        this.serial = 1 + (this.page - 1) * this.perPage;

      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get agent summary details", error);
      }
    );
  }

 next() {
    this.page += 1;
    if (this.page >= this.lastPage) {
      this.next_disable = true;
    }
    this.prev_disable = false;
    this.AgentSummary();
  }

  prev() {
    this.page -= 1;
    if (this.page == 1) {
      this.prev_disable = true;
    }
    this.next_disable = false;
    this.AgentSummary();
  }
   pageChanged(event: any): void {
    // this.loading = true;
    this.page = event.page;
    console.log("current page", this.currentPage);

    this.router.navigateByUrl("/nqr/onboard-history", {
      queryParams: { page: this.page },
    });
  }
  // onWindowScroll() {
  //       if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
  //           this.windowScrolled = true;
  //       } 
  //      else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
  //           this.windowScrolled = false;
  //       }
  //   }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
 href : string;
 qrCode:string="";
 subMerchantName:string;
     downloadImage(){
      
    this.href = document.getElementsByTagName('img')[3].src;
  }

showModal(row,modal){
 this.qrCode=row.qrCode
     this.subMerchantName=row.subMerchantName
    modal.show()
   
  }
    }
