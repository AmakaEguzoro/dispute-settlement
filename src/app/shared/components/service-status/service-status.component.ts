import { Component, OnInit } from '@angular/core';
import { Element } from './element';
import { ElementService } from '../../../service/element.service';
import { ElementError } from './elementError';
import { SwitchService } from 'app/service/switch.service';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})

export class ServiceStatusComponent implements OnInit {

  public responseData1: Element[] | ElementError;
  isLoading: boolean;
  public currentStatus: string;
  data: string;
  color: string; 


  constructor(private elementService: ElementService, public sw:SwitchService) { 
    //......//
  }

  async ngOnInit() {
    await this.getElements();
  }

  public getElements() {
    this.isLoading = true;
    this.elementService.getElements()
      .subscribe((responseList: Element[]) => {
        this.responseData1 = responseList;
        this.isLoading = false;
      }, (err: ElementError) => {
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
    //console.log(payload);

    return this.sw.switchAction(payload).subscribe(data => {
       this.data = data;
       this.getElements();
       //console.log(data);
    }, (err: ElementError) => {
      console.log('an error occured' + err.friendlyMessage);
    });
  
  }
}
