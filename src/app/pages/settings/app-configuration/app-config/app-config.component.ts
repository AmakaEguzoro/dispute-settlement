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
    this.getAppConfig();
  }

  openDelete() {
    // this.deleteId = modal._id;
    this.deleteModal.show();
  }

  openRegister() {
    this.basicModal.show();
  }

  getAppConfig() {
    this.settingsService.getAppConfig().subscribe((data:any) =>{
        this.data = data;
        console.log('app config',this.data);
      },
      (error) => {
        console.log("cant get app config", error);
      }
    );
  }

  deleteUser(){
    console.log('delete')
  }

  register() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.newUser = Object.assign({}, this.registerForm.value);
      this.settingsService.register(this.newUser).subscribe((data) => {
        this.loading = false;
        this.toastService.success('Registration successful');
        console.log('registration successful -', data);

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

}
