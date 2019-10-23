import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from 'app/_service/channels.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-this-week-channels',
  templateUrl: './this-week-channels.component.html',
  styleUrls: ['./this-week-channels.component.scss']
})
export class ThisWeekChannelsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputChannel:any;
  elements:any;
  
  isData: boolean;

  constructor(private channelService: ChannelService) { }

  async ngOnInit() {
    await this.getThisWeekChannel();

  }

  getThisWeekChannel() {
    this.isData = true;
    this.loading = true,
      this.channelService.getChannel('day').subscribe(responseData => {
        this.loading = false;
        this.outputChannel = responseData.data.response;

        this.outputChannel = this.outputChannel.sort((a, b) => (a.total > b.total) ? -1 : 1);
  
        //splice the array and pick the top five
        let sortArray = this.outputChannel;
        this.elements = sortArray.splice(0, 5);
      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get today response', error);
      });
  }

  ngOnDestroy() {
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

