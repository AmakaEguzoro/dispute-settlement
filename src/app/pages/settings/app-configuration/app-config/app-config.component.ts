import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from 'app/_service/settings.service';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';


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


  constructor(
    private modalService: BsModalService,
    private settingsService: SettingsService, 
  ) { }

  @ViewChild('deleteModal',) deleteModal: ModalDirective;

  ngOnInit() {
    this.getAppConfig();
  }

  openDelete() {
    // this.deleteId = modal._id;
    this.deleteModal.show();
  }

  getAppConfig() {
    this.isData = true;
    this.loading = true;
    this.settingsService.getAppConfig().subscribe((data) => {
        this.loading = false;
        this.data = data;
        console.log('app config',this.data);
      },
      (error) => {
        this.isData = false;
        this.loading = false;
        console.log("cant get app config", error);
      }
    );
  }

  deleteUser(){
    console.log('delete')
  }

}
