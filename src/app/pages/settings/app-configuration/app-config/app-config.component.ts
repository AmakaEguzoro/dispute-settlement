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


  ngOnInit() {
    this.getAppConfigLive();
  }



  openRegister() {
    this.basicModal.show();
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


  tt = [{ no: "1", field: "Cash", value: "Mcash" },
  { no: "2", field: "Mcash", value: "test" },
  { no: "3", field: "Mcash", value: "test" },

  ];


  formatString(str) {
    const res = str.replace(/_/g, " ");
    return res;
  }

  registerAppConfigLive() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.registerAppConfigLive(this.newUser).subscribe((data) => {
        this.loading = false;

        this.toastService.success('Registration successful');
        console.log('registration successful -', data);
        console.log('app ', this.detailsData);

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
      console.log('delete data', data)
      this.deleteModal.hide();
      this.toastService.success('Successfully Deleted');
      this.getAppConfigLive();
    }, error => {
      this.loading = false;
      this.toastService.error(error.error.message);
      console.log('error in deletion -', error.error.message);
    });

  };
}
