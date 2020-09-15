import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from 'app/_service/settings.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Register } from 'app/_models/settings';


@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent implements OnInit {

  isData: boolean;
  isData2: boolean;
  loading = true;
  data: any;
  bsModalRef: BsModalRef;
  deleteId: any;
  registerForm: FormGroup;
  newUser: Register;
  detailsData: any;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  updateId: any;
  updateValue: any;
  currentView: string;
  testData:any; updateIdTest: any;
  updateValueTest: any; deleteIdTest: any;

  constructor(
    private modalService: BsModalService,
    private settingsService: SettingsService,
    private fb: FormBuilder, private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      field: ['', Validators.required],
      value: ['', Validators.required],

    });
  }

  @ViewChild('deleteModal',) deleteModal: ModalDirective;
  @ViewChild('basicModal',) basicModal: ModalDirective;
  @ViewChild('updateModal',) updateModal: ModalDirective;

  @ViewChild('deleteModalTest',) deleteModalTest: ModalDirective;
  @ViewChild('basicModalTest',) basicModalTest: ModalDirective;
  @ViewChild('updateModalTest',) updateModalTest: ModalDirective;

  ngOnInit() {
    this.getAppConfigLive();
    this.getAppConfigTest();
  }

  // live functions
  openRegister() {
    this.registerForm.reset();
    this.basicModal.show();
  }

  openUpdate(modal) {
    this.updateId = modal.field;
    this.updateValue = modal.value;
    this.updateModal.show();
  }

  getAppConfigLive() {
    this.isData = true;
    this.loading = true;
    this.settingsService.getAppConfigLive().subscribe((data: any) => {
      this.loading = false;
      this.detailsData = data;
      console.log('app config', this.detailsData);
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      // this.lastPage = data.data.lastPage * this.perPage;
    },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get app config", error);
      }
    );
  }

  // formatString(str) {
  //   const res = str.replace(/_/g, " ");
  //   return res;
  // }

  registerAppConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerAppConfigLive(this.newUser).subscribe((data) => {
        let addData = data;
        this.loading = false;
        this.detailsData.unshift(addData);
        this.getAppConfigLive();
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
    this.deleteId = modal.field;
    this.deleteModal.show();
  }
  deleteAppConfigLive() {
    this.loading = true;
    this.settingsService.deleteAppConfigLive(this.deleteId).subscribe((data: any) => {
      this.loading = false;
      this.getAppConfigLive();
      this.deleteModal.hide();
      this.toastService.success('Successfully Deleted');
    }, error => {
      this.loading = false;
      this.toastService.error(error);
      console.log('error in deletion -', error);
    });

  };

  updateAppConfigLive() {
    this.loading = true;
    this.settingsService.deleteAppConfigLive(this.updateId).subscribe((data: any) => {
    }, error => {
      console.log('error in update deletion -', error);
    });
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerAppConfigLive(this.newUser).subscribe((data) => {
        this.loading = false;
        let updateData = data;
        this.getAppConfigLive();
        this.toastService.success('Updated successfully');
        this.registerForm.reset();
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
getAppConfigTest() {
  this.isData2 = true;
  this.loading = true;
  this.settingsService.getAppConfigTest().subscribe((data: any) => {
    this.loading = false;
    this.testData = data;
    this.serial = 1 + (this.currentPage - 1) * this.perPage;
    // this.lastPage = data.data.lastPage * this.perPage;
  },
    (error) => {
      this.isData2 = false;
      this.loading = false;
      console.log("cant get test app config", error);
    }
  );
}
openRegisterTest() {
  this.registerForm.reset();
  this.basicModalTest.show();
}
registerAppConfigTest() {
  this.loading = true;
  if (this.registerForm.valid) {
    this.newUser = Object.assign({}, this.registerForm.value);
    this.settingsService.registerAppConfigTest(this.newUser).subscribe((data) => {
      let addData2 = data;
      this.loading = false;
      this.testData.unshift(addData2);
      this.getAppConfigTest();
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
updateAppConfigTest() {
  this.loading = true;
  this.settingsService.deleteAppConfigTest(this.updateIdTest).subscribe((data: any) => {
  }, error => {
    console.log('error in update deletion -', error);
  });
  if (this.registerForm.valid) {
    this.newUser = Object.assign({}, this.registerForm.value);
    this.settingsService.registerAppConfigTest(this.newUser).subscribe((data) => {
      this.loading = false;
      this.getAppConfigTest();
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
  this.deleteIdTest = modal.field;
  this.deleteModalTest.show();
}
deleteAppConfigTest() {
  this.loading = true;
  this.settingsService.deleteAppConfigTest(this.deleteIdTest).subscribe((data: any) => {
    this.loading = false;
    this.getAppConfigTest();
    this.deleteModalTest.hide();
    this.toastService.success('Successfully Deleted');
  }, error => {
    this.loading = false;
    this.toastService.error(error);
    console.log('error in deletion -', error);
  });

};

}
