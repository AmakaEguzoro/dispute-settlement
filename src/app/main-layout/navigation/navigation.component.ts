import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'app/_auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  loggedIn() {
    return this.authService.loggedIn()
 }
  // logout() {
  //   this.authService.log().subscribe(data => {
  //     this.router.navigate(['/login'])
  //   },
  //     error => {
  //       console.log("An error Occured");
  //     });
  // }


}
