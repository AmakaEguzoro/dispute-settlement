import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from 'app/_service/settings.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterData } from 'app/_models/settings';

@Component({
  selector: 'app-data-plans',
  templateUrl: './data-plans.component.html',
  styleUrls: ['./data-plans.component.scss']
})
export class DataPlansComponent implements OnInit {

  isData: boolean;
  isData2: boolean;
  loading = true;
  data: any;
  bsModalRef: BsModalRef;
  deleteId: any;
  registerForm: FormGroup;
  newUser: RegisterData;
  detailsData: any;
  // pagination
  perPage = 50;
  currentPage = 1;
  lastPage: number;
  serial: number;
  maxSize = 10;
  updateType: any; updateTariff_id: any; updateCode: any;
  updateDuration: any; updateAmount: any; updatePrice: any;
  updateValue: any; updateDescription: any;  updateId: any;
  currentView: string;
  testData: any;
  updateTypeTest: any; updateTariff_idTest: any; updateCodeTest: any;
  updateDurationTest: any; updateAmountTest: any; updatePriceTest: any;
  updateValueTest: any; updateDescriptionTest: any;  updateIdTest: any;
  updateUser: any; deleteIdTest: any;

  constructor(
    private modalService: BsModalService,
    private settingsService: SettingsService,
    private fb: FormBuilder, private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      type: ['', Validators.required],
      tariff_id: ['', Validators.required],
      code: ['', Validators.required],
      duration: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  @ViewChild('deleteModal',) deleteModal: ModalDirective;
  @ViewChild('basicModal',) basicModal: ModalDirective;
  @ViewChild('updateModal',) updateModal: ModalDirective;

  @ViewChild('deleteModalTest',) deleteModalTest: ModalDirective;
  @ViewChild('basicModalTest',) basicModalTest: ModalDirective;
  @ViewChild('updateModalTest',) updateModalTest: ModalDirective;

  ngOnInit() {
    this.getDataConfigLive();
    this.getDataConfigTest();
  }

  headElements = [
    "S/N", "TYPE", "CODE", "DURATION", "AMOUNT", "VALUE", "PRICE",
    "TARIFF ID", "DESCRIPTION", "ACTION", "ACTION",
  ];

  // live functions
  openRegister() {
    this.registerForm.reset();
    this.basicModal.show();
  }

  openUpdate(modal) {
    this.updateType = modal.type; this.updateTariff_id = modal.tariff_id;
    this.updateCode = modal.code; this.updateDuration = modal.duration;
    this.updateAmount = modal.amount; this.updatePrice = modal.price;
    this.updateValue = modal.value; this.updateDescription = modal.description;
    this.updateModal.show();
  }

  getDataConfigLive() {
    this.isData = true;
    this.loading = true;
    this.settingsService.getDataConfigLive().subscribe((data: any) => {
      this.loading = false;
      this.detailsData = data.data.packages;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      // this.lastPage = data.data.lastPage * this.perPage;
    },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get Data config", error);
      }
    );
  }

  registerDataConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerDataConfigLive(this.newUser).subscribe((data) => {
        let addData = data;
        this.loading = false;
        this.detailsData.unshift(addData);
        this.getDataConfigLive();
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
    this.deleteId = modal.code;
    this.deleteModal.show();
  }
  deleteDataConfigLive() {
    this.loading = true;
    this.settingsService.deleteDataConfigLive(this.deleteId).subscribe((data: any) => {
      this.loading = false;
      this.getDataConfigLive();
      this.deleteModal.hide();
      this.toastService.success('Successfully Deleted');
    }, error => {
      this.loading = false;
      this.toastService.error(error);
      console.log('error in deletion -', error);
    });

  };

  updateDataConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.updateUser = Object.assign({}, this.registerForm.value);
      this.settingsService.updateDataConfigLive(this.updateCode, this.updateUser).subscribe((data) => {
        this.loading = false;
        let updateData = data;
        console.log('update ', updateData);
        this.getDataConfigLive();
        this.toastService.success('Updated successfully');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error.error.message);
        console.log('error in update -', error.error.message);
      });
    }
  };


  setCurrentView(view) {
    this.currentView = view;
  }

  // test functions
  getDataConfigTest() {
    this.isData2 = true;
    this.loading = true;
    this.settingsService.getDataConfigTest().subscribe((data: any) => {
      this.loading = false;
      this.testData = data.data.packages;
      this.serial = 1 + (this.currentPage - 1) * this.perPage;
      // this.lastPage = data.data.lastPage * this.perPage;
    },
      (error) => {
        this.isData2 = false;
        this.loading = false;
        console.log("cant get test Data config", error);
      }
    );
  }
  openRegisterTest() {
    this.registerForm.reset();
    this.basicModalTest.show();
  }
  registerDataConfigTest() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerDataConfigTest(this.newUser).subscribe((data) => {
        let addData2 = data;
        this.loading = false;

        this.testData.unshift(addData2);
        this.getDataConfigTest();
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
    this.updateTypeTest = modal.type; this.updateTariff_idTest = modal.tariff_id;
    this.updateCodeTest = modal.code; this.updateDurationTest = modal.duration;
    this.updateAmountTest = modal.amount; this.updatePriceTest = modal.price;
    this.updateValueTest = modal.value; this.updateDescriptionTest = modal.description;
    this.updateModalTest.show();
  }
  updateDataConfigTest() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.updateUser = Object.assign({}, this.registerForm.value);
      this.settingsService.updateDataConfigTest(this.updateCodeTest, this.updateUser).subscribe((data) => {
        this.loading = false;
        let updateData = data;
        console.log('update ', updateData);
        this.getDataConfigTest();
        this.toastService.success('Updated successfully');
        this.registerForm.reset();
      }, error => {
        this.loading = false;
        this.toastService.error(error.error.message);
        console.log('error in update -', error.error.message);
      });
    }
  };
  openDeleteTest(modal) {
    this.deleteIdTest = modal.code;
    this.deleteModalTest.show();
  }
  deleteDataConfigTest() {
    this.loading = true;
    this.settingsService.deleteDataConfigTest(this.deleteIdTest).subscribe((data: any) => {
      this.loading = false;
      this.getDataConfigTest();
      this.deleteModalTest.hide();
      this.toastService.success('Successfully Deleted');
    }, error => {
      this.loading = false;
      this.toastService.error(error);
      console.log('error in deletion -', error);
    });

  };

}
