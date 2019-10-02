import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/_auth/auth.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private toastService: ToastService) { }


  canActivate() : boolean {
    // const roles = route.data['is_admin'] as Array<number>;
    // console.log('role' , roles);
    
    // if (roles) {
    //   const match = this.authService.roleMatch(roles);
    //   if (match) {
    //     return true;
    //   } else {
    //     this.router.navigate(['transaction/details']);
    //     this.toastService.error('You are not authorized to access this area');
    //     console.log("You are not authorized to access this area")
    //   }
    // }

      if (!this.authService.isAuthenticated()) {
          this.router.navigate(['/login']);
          return false;
      }
      return true;
  }

}