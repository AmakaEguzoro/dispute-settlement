import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from 'app/_service/settings.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterWallet } from 'app/_models/settings';

@Component({
  selector: 'app-wallet-limits',
  templateUrl: './wallet-limits.component.html',
  styleUrls: ['./wallet-limits.component.scss']
})
export class WalletLimitsComponent implements OnInit {

  loading: boolean;
  data: any;
  registerForm: FormGroup;
  newUser: RegisterWallet;
  currentView: string;
  testData: any;

  constructor(
    private settingsService: SettingsService,
    private fb: FormBuilder, private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      walletId: ['', Validators.required],
      limit: ['', Validators.required],
      dailyLimit: ['', Validators.required],
      acctNo: ['', Validators.required],
      merchantName: ['', Validators.required],
      transfer: ['', Validators.required],
      tp: ['', Validators.required],
      itex: ['', Validators.required],
    });
  }

  @ViewChild('basicModal',) basicModal: ModalDirective;
  @ViewChild('basicModalTest',) basicModalTest: ModalDirective;

  ngOnInit() {

  }

  // live functions
  openRegister() {
    this.registerForm.reset();
    this.basicModal.show();
  }

  registerWalletConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerWalletConfigLive(this.newUser).subscribe((data) => {
        this.loading = false;
        console.log('live',data)
        this.toastService.success('Registration successful');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in registration -', error);
      });
    }
  }

  cancel() {
    this.registerForm.reset();
  }
  
  setCurrentView(view) {
    this.currentView = view;
  }

  // test functions

  openRegisterTest() {
    this.registerForm.reset();
    this.basicModalTest.show();
  }
  registerWalletConfigTest() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerWalletConfigTest(this.newUser).subscribe((data) => {
        this.loading = false;
        console.log('test',data)
        this.toastService.success('Registration successful');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in registration -', error);
      });
    }
  }

}
