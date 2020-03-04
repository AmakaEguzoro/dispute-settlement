import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-this-week-payment-method',
  templateUrl: './this-week-payment-method.component.html',
  styleUrls: ['./this-week-payment-method.component.scss']
})
export class ThisWeekPaymentMethodComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputPayment:any;
  elements: any;
  isData: boolean;

  constructor(private paymentMethodService: PaymentMethodService) { }

  async ngOnInit() {
    await this.getThisWeekPayment();
  }

  getThisWeekPayment() {
    this.isData = true;
    this.loading = true;
      this.paymentMethodService.getPaymentMethod('week').subscribe(resposeData => {
        this.loading = false;

        this.outputPayment = resposeData.data.response;
        this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputPayment;
        this.elements = sortArray.splice(0, 5);
        // console.log('Sort Array', resposeData.data.response);
      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get this week payment method', error);
      });
  }

  ngOnDestroy() {
    
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}

