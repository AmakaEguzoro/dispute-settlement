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

  // canActivate(next: ActivatedRouteSnapshot) : boolean {
  //   const roles = next.firstChild.data['roles'] as Array<string>;
  //   if (roles) {
  //     const match = this.authService.roleMatch(roles);
  //     if (match) {
  //       return true;
  //     } else {
  //       this.router.navigate(['transaction/details']);
  //     }
  //   }

  //     if (!this.authService.isAuthenticated()) {
  //         this.router.navigate(['/login']);
  //         return false;
  //     }
  //     return true;
  // }

}