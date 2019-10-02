import { Component, OnInit, OnDestroy } from '@angular/core';
import { Element } from './element';
import { ElementService } from '../../../_service/element.service';
import { ElementError } from './elementError';
import { SwitchService } from 'app/_service/switch.service';
import { Subscription } from 'rxjs';
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
  data: string;
  color: string; 
  isData: boolean;
  refresh : Subscription;


  constructor(private elementService: ElementService, public sw:SwitchService) {  }

  async ngOnInit() {
    await this.getElements();

    this.refresh = Observable.interval(15 * 60 * 1000).subscribe(()=>{
      this.getElements();
    })

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

  public callSwitch(service, action){
    this.currentStatus = action;
    if(action == "ON"){
       this.currentStatus = "OFF";
    } else if(action == "OFF"){
       this.currentStatus = "ON";
    }

    // Create Object
    let payload = {
      "service": service,
      "action" : this.currentStatus
    }

    return this.sw.switchAction(payload).subscribe(data => {
       this.data = data;
       this.getElements();
    }, (err: ElementError) => {
      console.log('an error occured' + err.friendlyMessage);
    });
  
  }
}
