import { Component, OnInit, OnDestroy } from '@angular/core';
import { Element } from './element';
import { ElementService } from '../../../_service/element.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ElementError } from './elementError';
import { SwitchService } from 'app/_service/switch.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})

export class ServiceStatusComponent implements OnInit,OnDestroy {

  public responseData1: Element[] | ElementError;
  isLoading: boolean;
  public currentStatus: string;
  bsModalRef: BsModalRef;
  editCommentForm: any;
  data: string;
  color: string; 
  isData: boolean;
  refresh : Subscription;


  constructor(private elementService: ElementService, public sw:SwitchService,
     private modalService: BsModalService, private fb: FormBuilder) {  }

  async ngOnInit() {
    this.getElements();

    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(()=>{
      this.getElements();
    })

    this.editCommentForm = this.fb.group({
      commentform: ['', [Validators.required]]
  });

}

  ngOnDestroy(){
    this.refresh.unsubscribe();
  }

  public getElements() {
    this.isData = true;
    this.isLoading = true;
    this.elementService.getElements()
      .subscribe((responseList: Element[]) => {
        this.responseData1 = responseList;
        this.isLoading = false;
      }, (err: ElementError) => {
        this.isData = false;
        this.isLoading = false;
        console.log('an error occured' + err.friendlyMessage);
      });
  }

  // showModal(modal) {
  //   //this.users.response = modal;
  //   const initialState = {
  //     //data: this.users.response,
  //     // user,
  //     ignoreBackdropClick: true,
  //   };
  //   this.bsModalRef = this.modalService.show(StatusModalComponent, { initialState });
  // }

  public callSwitch(service, action){
    this.isLoading = true;
    this.currentStatus = action;
    console.log("action: ",  this.currentStatus);
    
    if(action == "ON"){
       this.currentStatus = "OFF";
    } else if(action == "OFF"){
       this.currentStatus = "ON";
    } else {
      this.currentStatus = "ON";
    }

    let comment = this.editCommentForm.value;
    let name = localStorage.getItem('loggedUser');
    // Create Object    
    let payload = {
      "service": service,
      "action" : this.currentStatus != "" ? this.currentStatus : "ON",
      "comment":  comment.commentform,
      "name" : name
    }

    console.log("payload", payload);
    return this.sw.switchAction(payload).subscribe(data => {
       this.data = data;
       this.getElements();
  
      
    }, (err: ElementError) => {
      console.log('an error occured' + err.friendlyMessage);
    });
  
  }
}
