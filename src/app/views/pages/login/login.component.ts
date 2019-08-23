import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/_auth/auth.service';
import { User } from 'app/_models/user';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// export class LoginComponent implements OnInit {

//   loginForm: FormGroup;
//   submitAttempt: boolean;
//   user: any;

//   constructor(private router: Router, formBuilder: FormBuilder, private authService: AuthService) {

//     this.checkLogin();
//     this.loginForm = formBuilder.group({
//       email: ['', Validators.compose([Validators.required, Validators.email])],
//       password: ['', Validators.compose([Validators.required])],
//     });
//   }

//   checkLogin() {
//     let user = this.authService.isAuthenticated();
//     if (user) {
//       this.router.navigate(['/dashboard']);
//     }

//   }
//   ngOnInit() {
//     // console.log("Login Init");
//     // console.log(`specialPage: ${this.specialPage}`)
//     // localStorage.Special='true';
//   }
//   validateAllFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//       const control = formGroup.get(field);
//       if (control instanceof FormControl) {
//         control.markAsTouched({ onlySelf: true });
//       } else if (control instanceof FormGroup) {
//         this.validateAllFormFields(control);
//       }
//     });
//   };

//   signIn() {
//     this.submitAttempt = true;
//     if (!this.loginForm.valid) {
//       this.validateAllFormFields(this.loginForm);
//       return;
//     }
//     this.authService.signIn(
//       {
//         email: this.loginForm.value.email,
//         password: this.loginForm.value.password
//       }).subscribe(user => {
//         // console.log(JSON.stringify(user));
//         this.user = user;
//         this.router.navigate(['/dashboard'])
//       }, error => {
//         console.log('Error: ' + error.message)
//       });
//   }

// }

export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService) { }


  ngOnInit() {
    this.userLoginForm();
  }
  userLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.user = Object.assign({}, this.loginForm.value);
      this.authService.login(this.user).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/service-status']);
        this.toastService.success('Logged In')
      }, error => {
        this.toastService.error(error.error.error);
        console.log(error);
        this.loading = false;
      })
    }
  }

  loggedIn() {
    return this.authService.loggedIn()
  }

}
