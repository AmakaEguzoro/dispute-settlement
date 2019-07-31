import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {MDBSpinningPreloader} from 'ng-uikit-pro-standard';

@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  values: string[] = ['Tag 1', 'Tag 2', 'Tag 4'];

  specialPage: boolean=false;

  private specialPages: any[] = [
    '/',
    '/pages/login',
    '/pages/register',
    '/pages/lock',
    '/pages/pricing',
    '/pages/single-post',
    '/pages/post-listing'
  ];
  
  private currentUrl = '';

  constructor(
    private router: Router,
    private location: Location,
    private mdbSpinningPreloader: MDBSpinningPreloader
  ) {

    this.router.events.subscribe((route:any) => {
      // this.currentUrl = route.url;
      // console.log("Special?: "+localStorage.Special)
      // // if(this.currentUrl==undefined){this.currentUrl='/'}
      // if((localStorage.Special!=undefined)&&(localStorage.Special=='false')){
      //   this.specialPage = false;  
      // }else {this.specialPage = true;}
      // // this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });

  }

  ngOnInit(): void {
    this.mdbSpinningPreloader.stop();
  }

  goBack(): void {
    this.location.back();
  }

}
