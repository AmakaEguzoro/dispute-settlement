import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from 'app/_service/channels.service';
import { SubSink } from 'subsink/dist/subsink';
import * as math from 'mathjs';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-this-month-channels',
  templateUrl: './this-month-channels.component.html',
  styleUrls: ['./this-month-channels.component.scss']
})
export class ThisMonthChannelsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  totalPosAmount: any;
  totalWebAmount: any;
  totalAndroidAmount: any;
  totalAndroidPosAmount: any;
  totalDefaultAmount: any;
  totalOthersAmount: any;
  totalAtmAmount: any;
  elements: any;
  isData: boolean;

  constructor(private channelService: ChannelService) { }

  async ngOnInit() {
    await this.getThisMonthChannel();
  }

  getThisMonthChannel() {
    this.isData = true;
    this.loading = true,
      this.channelService.getThisMonthChannel().subscribe(responseList => {
        this.loading = false;
        let posSuccess = responseList[0];
        let posFailed = responseList[1];
        let posSuccessAmount = posSuccess.data.amount;
        let posFailedAmount = posFailed.data.amount;
        this.totalPosAmount = math.add(posSuccessAmount, posFailedAmount);

        let webSuccess = responseList[2];
        let webFailed = responseList[3];
        let webSuccessAmount = webSuccess.data.amount;
        let webFailedAmount = webFailed.data.amount;
        this.totalWebAmount = math.add(webSuccessAmount, webFailedAmount);

        let androidSuccess = responseList[4];
        let androidFailed = responseList[5];
        let androidSuccessAmount = androidSuccess.data.amount;
        let androidFailedAmount = androidFailed.data.amount;
        this.totalAndroidAmount = math.add(androidSuccessAmount, androidFailedAmount);

        let androidPosSuccess = responseList[6];
        let androidPosFailed = responseList[7];
        let androidPosSuccessAmount = androidPosSuccess.data.amount;
        let androidPosFailedAmount = androidPosFailed.data.amount;
        this.totalAndroidPosAmount = math.add(androidPosSuccessAmount, androidPosFailedAmount);

        let atmSuccess = responseList[8];
        let atmFailed = responseList[9];
        let atmSuccessAmount = atmSuccess.data.amount;
        let atmFailedAmount = atmFailed.data.amount;
        this.totalAtmAmount = math.add(atmSuccessAmount, atmFailedAmount);

        let defaultSuccess = responseList[10];
        let defaultFailed = responseList[11];
        let defaultSuccessAmount = defaultSuccess.data.amount;
        let defaultFailedAmount = defaultFailed.data.amount;
        this.totalDefaultAmount = math.add(defaultSuccessAmount, defaultFailedAmount);

        let othersSuccess = responseList[12];
        let othersFailed = responseList[13];
        let othersSuccessAmount = othersSuccess.data.amount;
        let othersFailedAmount = othersFailed.data.amount;
        this.totalOthersAmount = math.add(othersSuccessAmount, othersFailedAmount);

        this.elements =
          [
            { 'title': 'POS', 'success': posSuccessAmount, 'fail': posFailedAmount, 'total': this.totalPosAmount },
            { 'title': 'WEB', 'success': webSuccessAmount, 'fail': webFailedAmount, 'total': this.totalWebAmount },
            { 'title': 'ANDROID', 'success': androidSuccessAmount, 'fail': androidFailedAmount, 'total': this.totalAndroidAmount },
            { 'title': 'ANDROID-POS', 'success': androidPosSuccessAmount, 'fail': androidPosFailedAmount, 'total': this.totalAndroidPosAmount },
            { 'title': 'DEFAULT', 'success': defaultSuccessAmount, 'fail': defaultFailedAmount, 'total': this.totalDefaultAmount },
            { 'title': 'OTHERS', 'success': othersSuccessAmount, 'fail': othersFailedAmount, 'total': this.totalOthersAmount },
            { 'title': 'ATM', 'success': atmSuccessAmount, 'fail': atmFailedAmount, 'total': this.totalAtmAmount },
          ];

        this.elements = this.elements.splice(0, 5);
      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get this month channel', error);
      });
  }

  ngOnDestroy() {
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

