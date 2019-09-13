import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/_auth/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {

//   constructor(private router:Router, private authService:AuthService ){
    
//   }
//   canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    
//     const currentUser = this.authService.isAuthenticated();
//     if(currentUser){
//       return true;z
//     }
//     this.router.navigate(['/login']);
//     return false;
//   }
  
// }

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() : boolean {
      if (!this.authService.isAuthenticated()) {
          this.router.navigate(['/login']);
          return false;
      }
      return true;
  }

}