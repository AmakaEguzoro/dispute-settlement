import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from 'app/_service/settings.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterB2B, UpdateB2B } from 'app/_models/settings';

@Component({
  selector: 'app-b2b-config',
  templateUrl: './b2b-config.component.html',
  styleUrls: ['./b2b-config.component.scss']
})
export class B2bConfigComponent implements OnInit {

  isData: boolean;
  isData2: boolean;
  loading = true;
  data: any;
  bsModalRef: BsModalRef;
  deleteId: any;
  registerForm: FormGroup;
  updateForm: FormGroup;
  newUser: RegisterB2B;
  updateB2B: UpdateB2B;
  detailsData = [];
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;

  updateUsername: any; updateKey: any; 
  updateOrganisationCode: any; updateMode: any;
  updateWallet: any; updateVendType: any; 
  updateIp: any; updateName: any;
  updateCompanyName: any;
  currentView: string;
  testData: any; updateIdTest: any;
  updateValueTest: any; deleteIdTest: any;

  constructor(
    private modalService: BsModalService,
    private settingsService: SettingsService,
    private fb: FormBuilder, private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      Mode: ['', Validators.required],
      wallet: ['', Validators.required],
      vendType: ['', Validators.required],
      ip: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],

    });
  }

  @ViewChild('deleteModal',) deleteModal: ModalDirective;
  @ViewChild('basicModal',) basicModal: ModalDirective;
  @ViewChild('updateModal',) updateModal: ModalDirective;

  @ViewChild('deleteModalTest',) deleteModalTest: ModalDirective;
  @ViewChild('basicModalTest',) basicModalTest: ModalDirective;
  @ViewChild('updateModalTest',) updateModalTest: ModalDirective;

  ngOnInit() {
    this.getB2BConfigLive();
    this.getB2BConfigTest();
    this.updateB2BForm();
  }

  // live functions
  openRegister() {
    this.registerForm.reset();
    this.basicModal.show();
  }

 
  headElements = [
    "S/N",
    "USERNAME",
    "IDENTIFIER",
    "WALLET",
    "IP",
    "VEND TYPE",
    "NAME",
    "ORGANISATION CODE",
    "EMAIL",
    "KEY",
    "MODE",
    "ACTION",
    "ACTION",
  ];
  getB2BConfigLive() {
    this.isData = true;
    this.loading = true;
    this.settingsService.getB2BConfigLive().subscribe((data: any) => {
      this.loading = false;
      console.log('B2B', data);

      // this.detailsData =data
      for (let key in data) {
        this.detailsData.push(Object.assign(data[key], { name: key }));
      }
      console.log('B2B config', this.detailsData);

      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      // this.lastPage = data.data.lastPage * this.perPage;
    },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get B2B config", error);
      }
    );
  }

  // formatString(str) {
  //   const res = str.replace(/_/g, " ");
  //   return res;
  // }

  registerB2BConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerB2BConfigLive(this.newUser).subscribe((data) => {
        let addData = data;
        this.loading = false;
        this.detailsData.unshift(addData);
        this.getB2BConfigLive();
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

  openDelete(modal) {
    this.deleteId = modal.name;
    this.deleteModal.show();
  }
  deleteB2BConfigLive() {
    this.loading = true;
    this.settingsService.deleteB2BConfigLive(this.deleteId).subscribe((data: any) => {
      this.loading = false;
      this.getB2BConfigLive();
      this.deleteModal.hide();
      this.toastService.success('Successfully Deleted');
    }, error => {
      this.loading = false;
      this.toastService.error(error);
      console.log('error in deletion -', error);
    });

  };

  updateB2BForm() {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      key: ['', Validators.required],
      organisationCode: ['', Validators.required],
      Mode: ['', Validators.required],
      wallet: ['', Validators.required],
      vendType: ['', Validators.required],
      ip: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }
  openUpdate(modal) {
    this.updateUsername = modal.username;
    this.updateKey = modal.key;
    this.updateOrganisationCode = modal.organisationCode;
    this.updateMode = modal.Mode;
    this.updateWallet = modal.wallet;
    this.updateVendType = modal.vendType;
    this.updateIp = modal.ip;
    this.updateName = modal.name;
    this.updateCompanyName = modal.companyName;
    this.updateModal.show();
  }
  updateB2BConfigLive() {
    this.loading = true;
    if (this.updateForm.valid) {
      this.updateB2B = Object.assign({}, this.updateForm.value);
      this.settingsService.updateB2BConfigLive( this.updateName,this.updateB2B).subscribe((data) => {
        this.loading = false;
        let updateData = data;
        console.log('up',updateData)
        this.getB2BConfigLive();
        this.toastService.success('Updated successfully');
        this.updateForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in update -', error);
      });
    }
  };

  setCurrentView(view) {
    this.currentView = view;
  }

  // test functions
  getB2BConfigTest() {
    this.isData2 = true;
    this.loading = true;
    this.settingsService.getB2BConfigTest().subscribe((data: any) => {
      this.loading = false;
      this.testData = data;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      // this.lastPage = data.data.lastPage * this.perPage;
    },
      (error) => {
        this.isData2 = false;
        this.loading = false;
        console.log("cant get test B2B config", error);
      }
    );
  }
  openRegisterTest() {
    this.registerForm.reset();
    this.basicModalTest.show();
  }
  registerB2BConfigTest() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerB2BConfigTest(this.newUser).subscribe((data) => {
        let addData2 = data;
        this.loading = false;
        this.testData.unshift(addData2);
        this.getB2BConfigTest();
        this.toastService.success('Registration successful');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in registration -', error);
      });
    }
  }
  openUpdateTest(modal) {
    this.updateIdTest = modal.field;
    this.updateValueTest = modal.value;
    this.updateModalTest.show();
  }
  updateB2BConfigTest() {
    this.loading = true;
    this.settingsService.deleteB2BConfigTest(this.updateIdTest).subscribe((data: any) => {
    }, error => {
      console.log('error in update deletion -', error);
    });
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerB2BConfigTest(this.newUser).subscribe((data) => {
        this.loading = false;
        this.getB2BConfigTest();
        this.toastService.success('Updated successfully');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error);
        console.log('error in update -', error);
      });
    }
  };
  openDeleteTest(modal) {
    this.deleteIdTest = modal.username;
    this.deleteModalTest.show();
  }
  deleteB2BConfigTest() {
    this.loading = true;
    this.settingsService.deleteB2BConfigTest(this.deleteIdTest).subscribe((data: any) => {
      this.loading = false;
      this.getB2BConfigTest();
      this.deleteModalTest.hide();
      this.toastService.success('Successfully Deleted');
    }, error => {
      this.loading = false;
      this.toastService.error(error);
      console.log('error in deletion -', error);
    });

  };

}

