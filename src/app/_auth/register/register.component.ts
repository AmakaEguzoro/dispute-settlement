import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Register } from 'app/_models/register';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  newUser: Register;
  loading = false;
  filter: any;
  // payload = {
  //   "username": "",
  //   "password": "",
  //   "name": "",
  //   "email": "",
  //   "role": Number,
  //   "wallets": "",
  // };

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private toastService: ToastService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email],
      role: ['', Validators.required],
      wallets: ['',]
    });
  }
  optionsSelect: Array<any>;
  ngOnInit() {
    this.optionsSelect = [
      { value: 1, label: 'Level 1' },
      { value: 2, label: 'Level 2' },
      { value: 3, label: 'Level 3' },
      { value: 4, label: 'Level 4' },
      { value: 5, label: 'Level 5' },
    ];
  }

  // role = ['1', '2', '3', '4', '5'];



  register() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.newUser).subscribe((data) => {
        this.loading = false;
        this.toastService.success('Registration successful');
        this.registerForm.reset();
        console.log('registration successfull');
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in registration -', error.message);
      });
    }
  }

  cancel() {
    this.registerForm.reset();
  }
}
