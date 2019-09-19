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
  payload = {
    "username": "",
    "password": "",
    "name": "",
    "email": "",
    "role": Number,
    "wallets": "",
  
  };

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

  ngOnInit() {
  }

  role = ['1', '2', '3', '4', '5'];

  getRef(event) {
    this.filter = event.target.value;
    console.log('roles event- ', this.filter); 
  }

  register(payload) {
    this.loading = true;
    if (this.registerForm.valid) {
      // this.newUser = Object.assign({}, this.registerForm.value);
      this.authService.register(payload).subscribe((data) => {
        this.loading = false;
        console.log(data);
        this.toastService.success('Registration successful');
        console.log('registration successfull' );
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in registration -', error.message);
        
      });
    }
  }
}
