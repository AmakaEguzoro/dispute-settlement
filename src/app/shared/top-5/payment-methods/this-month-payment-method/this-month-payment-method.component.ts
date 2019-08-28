import { Component, OnInit, OnDestroy } from '@angular/core';
import * as math from 'mathjs';
import { SubSink } from 'subsink/dist/subsink';
import { PaymentMethodService } from 'app/service/payment-method.service';

@Component({
  selector: 'app-this-month-payment-method',
  templateUrl: './this-month-payment-method.component.html',
  styleUrls: ['./this-month-payment-method.component.scss']
})
export class ThisMonthPaymentMethodComponent implements OnInit,OnDestroy {

  private subs = new SubSink();
  loading = false;
  totalCARDAmount: any;
  totalMCARDAmount: any;
  totalCASHAmount: any;
  elements: any;
  isData: boolean;

  constructor(private paymentMethodService: PaymentMethodService) { }

  async ngOnInit() {
    this.isData = true;
    this.loading = true,
      this.subs.add(
        await this.paymentMethodService.getThisMonthPaymentMethod().subscribe(responseList => {
          this.loading = false;
          let CARDSuccess = responseList[0];
          let CARDFailed = responseList[1];
          let CARDSuccessAmount = CARDSuccess.data.amount;
          let CARDFailedAmount = CARDFailed.data.amount;
          this.totalCARDAmount = math.add(CARDSuccessAmount, CARDFailedAmount);

          let MCARDSuccess = responseList[2];
          let MCARDFailed = responseList[3];
          let MCARDSuccessAmount = MCARDSuccess.data.amount;
          let MCARDFailedAmount = MCARDFailed.data.amount;
          this.totalMCARDAmount = math.add(MCARDSuccessAmount, MCARDFailedAmount);

          let CASHSuccess = responseList[4];
          let CASHFailed = responseList[5];
          let CASHSuccessAmount = CASHSuccess.data.amount;
          let CASHFailedAmount = CASHFailed.data.amount;
          this.totalCASHAmount = math.add(CASHSuccessAmount, CASHFailedAmount);

          this.elements =
            [
              { 'title': 'CARD', 'success': CARDSuccessAmount, 'fail': CARDFailedAmount, 'total': this.totalCARDAmount },
              { 'title': 'CASH', 'success': CASHSuccessAmount, 'fail': CASHFailedAmount, 'total': this.totalCASHAmount },
              { 'title': 'MCARD', 'success': MCARDSuccessAmount, 'fail': MCARDFailedAmount, 'total': this.totalMCARDAmount },
            ];

        }, error => {
          this.isData = false;
          this.loading = false;
          console.log('cant get this month payment method', error);
        }),
      );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  headElements = ['', 'Success', 'Fail', 'Total'];
}