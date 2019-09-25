import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'app/_auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  // userDisplayName = '';
  userDisplayName: any
  constructor(private authService: AuthService, private router: Router,
    private toastService: ToastService) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    // this.userDisplayName = localStorage.getItem('loggedUser');
    // console.log(this.userDisplayName);
    this.username()
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
  this.userDisplayName = this.authService.currentUserName();
   console.log(this.userDisplayName);
   
  }

  named() {
    this.userDisplayName = localStorage.getItem('loggedUser');
    console.log(this.userDisplayName);
  }

}
