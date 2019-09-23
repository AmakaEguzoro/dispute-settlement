import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from 'app/_models/tabs';
import { AuthService } from 'app/_auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // routeLinks: any[];
  // activeLinkIndex = -1;

  // usersTabs: Tab[] = [
  //   { link: '/service-status', name: 'Active Users', isActive: true  },
  //   { link: '/bvn-status', name: 'Unassigned Users' },
  //   // { link: '/admin/users/disabled', name: 'Disabled Users' }
  // ];

  constructor(private router: Router, private authService: AuthService,) {
    // this.routeLinks = [
    //   {
    //     label: 'Product 1',
    //     link: './transaction/details',
    //     index: 0
    //   }, {
    //     label: 'Product 2',
    //     link: './not-found',
    //     index: 1
    //   }, {
    //     label: 'Product 3',
    //     link: './service-status',
    //     index: 2
    //   }, {
    //     label: 'Product 4',
    //     link: './product4',
    //     index: 3
    //   }, {
    //     label: 'Product 5',
    //     link: './product5',
    //     index: 4
    //   }
    // ];
  }

  // tabs: any[] = [
  //   { title: 'Dynamic Title 1', link: './service-status' },
  //   { title: 'Dynam 1', link: './service-status' },
  //   { title: 'Dynamic Title 2', content: 'Dynamic content 2' },
  //   { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  // ];

  ngOnInit() {
    // this.link()

  }
  // isAuthenticated() {
  //   return this.authService.isAuthenticated()
  // }
  // switchTabs(tabLink: string) {
  //   this.router.navigate([ tabLink ]);
  // }

  // addNewTab(): void {
  //   const newTabIndex = this.tabs.length + 1;
  //   this.tabs.push({
  //     title: `Dynamic Title ${newTabIndex}`,
  //     content: `Dynamic content ${newTabIndex}`,
  //     disabled: false,
  //     removable: true
  //   });
  // }
 
  // removeTabHandler(tab: any): void {
  //   this.tabs.splice(this.tabs.indexOf(tab), 1);
  //   console.log('Remove Tab handler');
  // }
  // link() {
  //   console.log('here');
    
  //   this.router.events.subscribe((res) => {
  //     console.log(res);
      
  //     this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.'
  //      + this.router.url));
  //   });
  // }
}
