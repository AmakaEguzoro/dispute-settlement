
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../views/notification/notification.component';
import { NotificationService } from '../views/notification/notification.service';
import { TodayCardComponent } from './dashboard-cards/daily-cards/today-card/today-card.component';
import { YesterdayCardComponent } from './dashboard-cards/daily-cards/yesterday-card/yesterday-card.component';
import { ThisMonthCardComponent } from './dashboard-cards/monthly-cards/this-month-card/this-month-card.component';
import { LastMonthCardComponent } from './dashboard-cards/monthly-cards/last-month-card/last-month-card.component';
import { LastWeekCardComponent } from './dashboard-cards/weekly-cards/last-week-card/last-week-card.component';
import { ThisWeekCardComponent } from './dashboard-cards/weekly-cards/this-week-card/this-week-card.component';
import { SummaryService } from 'app/_service/summary.service';
import { ThousandSuffixesPipe } from 'app/shared/pipe/ThousandSuffixesPipe';
import { ToNumberPipe } from 'app/shared/pipe/ToNumberPipe';
import { ChannelService } from 'app/_service/channels.service';
import { ProductsService } from 'app/_service/products.service';
import { OrderModule } from 'ngx-order-pipe';
import { PaymentMethodService } from 'app/_service/payment-method.service';
import { TodayChannelsComponent } from './top-5/channel/today-channels/today-channels.component';
import { ThisWeekChannelsComponent } from './top-5/channel/this-week-channels/this-week-channels.component';
import { ThisMonthChannelsComponent } from './top-5/channel/this-month-channels/this-month-channels.component';
import { ThisMonthPaymentMethodComponent } from './top-5/payment-methods/this-month-payment-method/this-month-payment-method.component';
import { TodayPaymentMethodComponent } from './top-5/payment-methods/today-payment-method/today-payment-method.component';
import { ThisMonthProductComponent } from './top-5/product/this-month-product/this-month-product.component';
import { ThisWeekProductComponent } from './top-5/product/this-week-product/this-week-product.component';
import { TodayProductComponent } from './top-5/product/today-product/today-product.component';
import { ThisWeekPaymentMethodComponent } from './top-5/payment-methods/this-week-payment-method/this-week-payment-method.component';
import { TransactionService } from 'app/_service/transaction.service';
import { ServiceStatusComponent } from '../pages/service-status/service-status.component';
import { BvnStatusComponent } from '../pages/bvn-status/bvn-status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    // itex
    OrderModule
  ],
  declarations: [
    NotificationComponent,
    // Itex Copmponent
    // TodayCardComponent,
    // YesterdayCardComponent,
    // ThisMonthCardComponent,
    // LastMonthCardComponent,
    // LastWeekCardComponent,
    // ThisWeekCardComponent,

  
    // ServiceStatusComponent,
    // BvnStatusComponent,
    // TodayChannelsComponent,
    // ThisWeekChannelsComponent,
    // ThisMonthChannelsComponent,
    // TodayProductComponent,
    // ThisWeekProductComponent,
    // ThisMonthProductComponent,
    // TodayPaymentMethodComponent,
    // ThisWeekPaymentMethodComponent,
    // ThisMonthPaymentMethodComponent,
    NotFoundComponent,

    // Pipe
    ThousandSuffixesPipe,
    ToNumberPipe
  ],
  exports: [
    MDBBootstrapModulesPro,
    NotificationComponent,
    // Itex Copmponent
    // TodayCardComponent,
    // YesterdayCardComponent,
    // ThisMonthCardComponent,
    // LastMonthCardComponent,
    // LastWeekCardComponent,
    // ThisWeekCardComponent,

    // TodayChannelsComponent,
    // ThisWeekChannelsComponent,
    // ThisMonthChannelsComponent,
    // TodayProductComponent,
    // ThisWeekProductComponent,
    // ThisMonthProductComponent,
    // TodayPaymentMethodComponent,
    // ThisWeekPaymentMethodComponent,
    // ThisMonthPaymentMethodComponent,
    // ServiceStatusComponent,
    // BvnStatusComponent,
NotFoundComponent,
    // pipe
    ThousandSuffixesPipe,
    ToNumberPipe,
  ],
  providers: [
    // itex
    // SummaryService,
    // ChannelService,
    // ProductsService,
    // PaymentMethodService,
    // TransactionService
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
