import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'app/_auth/auth.service';
import { ActivatedRoute, Router,  NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';


@Component({
  selector: 'app-toggle-nav',
  templateUrl: './toggle-nav.component.html',
  styleUrls: ['./toggle-nav.component.scss']
})
export class ToggleNavComponent implements OnInit {
  
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  userDisplayName: any
  breadcrumbs;
  constructor(private authService: AuthService, private router: Router,
      private activatedRoute: ActivatedRoute ) {
    this.clicked = this.clicked === undefined ? false : true; 
  }

  ngOnInit() {
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .pipe(map(() => this.activatedRoute))
    .pipe(map((route) => {
      while (route.firstChild) { route = route.firstChild; }
      return route;
    }))
    .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
    .subscribe(route => {
  
      let snapshot = this.router.routerState.snapshot;
      this.breadcrumbs = [];
      let url = snapshot.url;
      let routeData = route.snapshot.data;
  
      // console.log(routeData);
      let label = routeData['breadcrumb'];
      let params = snapshot.root.params;
  
      this.breadcrumbs.push({
        url: url,
        label: label,
        params: params
      });
  
    });
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  username() {
    return this.authService.currentUserName();
    //  console.log(this.userDisplayName);
  }

}
 