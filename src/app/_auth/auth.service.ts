import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestModel } from 'model/request/auth.model';
import { Observable, from } from 'rxjs';
import { LoginResponseModel } from 'model/response/auth.model';
import { Endpoint } from 'common/endpoint'
import { map, catchError } from 'rxjs/operators';
import { Constants } from 'common/constants';
import { environment } from 'environments/environment';
import { User } from 'app/_models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { Register } from 'app/_models/register';

@Injectable({
  providedIn: 'root'
})
// export class AuthService {
//   token: any;
//   constructor(private http: HttpClient,
//     private storageService: StorageService) { }

//   signIn(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
//     return this.http.post(Endpoint.AUTH.login, loginRequest,
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }).pipe(
//         map(data => {
//           this.processLogin(data);
//           return data;
//         }), catchError((error) => {
//           console.log(error);
//           return Observable.throw(error);
//         }));
//   }

//   processLogin(response: LoginResponseModel) {
//     this.storageService.set(Constants.STORAGE_VARIABLES.TOKEN, response);
//   }

//   isAuthenticated(): boolean {
//     if (!this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN)) {
//       return false;
//     }

//     const login = this.storageService.get<LoginResponseModel>(Constants.STORAGE_VARIABLES.TOKEN);
//     if (login.access_token && login.expires_at) {
//       var expireInDate = new Date(login.expires_at);
//       return expireInDate > (new Date());
//     }

//     return true;
//   }

//   signOut() {
//     return this.http.get(Endpoint.AUTH.logout)
//       .pipe(map(data => {
//         this.storageService.clear(Constants.STORAGE_VARIABLES.TOKEN);
//         return data;
//       },
//         error => {
//           console.log(`error ${error}`);
//         }
//       ));
//   }
// }

export class AuthService {

  baseUrl = environment.api.baseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  // user: User;
  constructor(private http: HttpClient, private router: Router,
    private toastService: ToastService) { }

  login(user: User) {

    return this.http.post(this.baseUrl + '/auth/login', user)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            // this.decodedToken = this.jwtHelper.decodeToken(user.token);
            // console.log(this.decodedToken)
          }
        })
      );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']),
      this.toastService.success('Logged Out')
  }
  
  register(newUser: Register) {
    return this.http.post(this.baseUrl + '/users/create', newUser);
  }

  // roleMatch(allowedRoles): boolean {
  //   let isMatch = false;
  //   const userRoles = this.decodedToken.role as Array<string>;
  //   allowedRoles.forEach(element => {
  //     if (userRoles.includes(element)) {
  //       isMatch = true;
  //       return;
  //     }
  //   });
  //   return isMatch;
  // }

}