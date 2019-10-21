import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-this-month-payment-method',
  templateUrl: './this-month-payment-method.component.html',
  styleUrls: ['./this-month-payment-method.component.scss']
})
export class ThisMonthPaymentMethodComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  loading = false;
  outputPayment:any;
  elements:any;
  isData: boolean;

  constructor(private paymentMethodService: PaymentMethodService) { }

  async ngOnInit() {
    await this.getThisMonthPayment();
  }

  getThisMonthPayment() {
    this.isData = true;
    this.loading = true,
      this.paymentMethodService.getPaymentMethod('month').subscribe(resposeData => {
        this.loading = false;
        this.outputPayment = resposeData.data.response;
        this.outputPayment = this.outputPayment.sort((a, b) => (a.total > b.total) ? -1 : 1);

        //splice the array and pick the top five
        let sortArray = this.outputPayment;
        this.elements = sortArray.splice(0, 5);

      }, error => {
        this.isData = false;
        this.loading = false;
        console.log('cant get this month payment method', error);
      });
  }

  ngOnDestroy() {
    
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}
