import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, EditUser } from 'app/_models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { Register } from 'app/_models/register';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.api.baseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  postIdSource = new  BehaviorSubject<number>(0);
  postIdData: any;
  constructor(private http: HttpClient, private router: Router,
    private toastService: ToastService) { 
      this.postIdData= this.postIdSource.asObservable();
    }

  login(user: User) {
    return this.http.post(this.baseUrl + '/auth/login', user)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            console.log("Logged in User: ", user.user);
            localStorage.setItem('token', user.token);
            localStorage.setItem('role', user.user.role);
            localStorage.setItem('loggedUser', user.user.name);
            localStorage.setItem('loggedEmail', user.user.email);
            localStorage.setItem('walletId', user.user.wallets);
            localStorage.setItem('loggedUsername',user.user.username)
          }
        })
      );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }

  currentUserWallet() {
    const walletString = localStorage.getItem('wallets');
    if (walletString) {
      let wallet = walletString.split(",")[0];
      return wallet;
    }
  }

  currentUserRole() {
    const role = localStorage.getItem('role');
    if (role) {
      return parseInt(role);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedEmail');
    localStorage.removeItem('walletId');
    localStorage.clear();
    this.router.navigate(['/login']),
      this.toastService.success('Logged Out')
  }

  register(newUser: Register) {
    return this.http.post(this.baseUrl + '/users/create', newUser);
  }
  currentUserName() {
    const username = localStorage.getItem('loggedUser');
    if (username) {
    } return username
  }
  roleMatch(expectedRole): boolean {
    let isMatch = false;
    const roles = localStorage.getItem('role');
    const userRoles = roles;
    expectedRole.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  getUsers() {
    return this.http.get(this.baseUrl + `/users/fetch/all`);
  }
  
  editUsers(editUser: EditUser) {
    return this.http.post(this.baseUrl + `/users/fetch`, editUser).pipe(
      map((response: any) => {
        const editUser = response;
        return editUser;
      }
      ));
  }

  changePostId(id: number){
    this.postIdSource.next(id);
}
}