import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {  }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;    
    const token = parseInt(localStorage.getItem('role'));
    if ( token == expectedRole ) {
      console.log("You are  authorized to access this area")
      return true;
    }
    this.auth.logout();
    console.log("You are not authorized to access this area")
    return false;
  }
   
  }
