import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { TodayCardComponent } from "app/shared/dashboard-cards/daily-cards/today-card/today-card.component";
import { YesterdayCardComponent } from "app/shared/dashboard-cards/daily-cards/yesterday-card/yesterday-card.component";
import { ThisMonthCardComponent } from "app/shared/dashboard-cards/monthly-cards/this-month-card/this-month-card.component";
import { LastMonthCardComponent } from "app/shared/dashboard-cards/monthly-cards/last-month-card/last-month-card.component";
import { ThisWeekCardComponent } from "app/shared/dashboard-cards/weekly-cards/this-week-card/this-week-card.component";
import { LastWeekCardComponent } from "app/shared/dashboard-cards/weekly-cards/last-week-card/last-week-card.component";
import { ServiceStatusComponent } from "./service-status/service-status.component";
import { BvnStatusComponent } from "./bvn-status/bvn-status.component";
import { TodayChannelsComponent } from "app/shared/top-5/channel/today-channels/today-channels.component";
import { ThisWeekChannelsComponent } from "app/shared/top-5/channel/this-week-channels/this-week-channels.component";
import { ThisMonthChannelsComponent } from "app/shared/top-5/channel/this-month-channels/this-month-channels.component";
import { TodayProductComponent } from "app/shared/top-5/product/today-product/today-product.component";
import { ThisWeekProductComponent } from "app/shared/top-5/product/this-week-product/this-week-product.component";
import { ThisMonthProductComponent } from "app/shared/top-5/product/this-month-product/this-month-product.component";
import { ThisWeekPaymentMethodComponent } from "app/shared/top-5/payment-methods/this-week-payment-method/this-week-payment-method.component";
import { TodayPaymentMethodComponent } from "app/shared/top-5/payment-methods/today-payment-method/today-payment-method.component";
import { ThisMonthPaymentMethodComponent } from "app/shared/top-5/payment-methods/this-month-payment-method/this-month-payment-method.component";
import { SummaryService } from "app/_service/summary.service";
import { ChannelService } from "app/_service/channels.service";
import { ProductsService } from "app/_service/products.service";
import { PaymentMethodService } from "app/_service/payment-method.service";
import { TransactionService } from "app/_service/transaction.service";
import { LoginComponent } from "app/_auth/login/login.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModulesPro.forRoot(),

    ],
    declarations: [
      // Itex Copmponent
      TodayCardComponent,
      YesterdayCardComponent,
      ThisMonthCardComponent,
      LastMonthCardComponent,
      LastWeekCardComponent,
      ThisWeekCardComponent,
  
      ServiceStatusComponent,
      BvnStatusComponent,
      
      TodayChannelsComponent,
      ThisWeekChannelsComponent,
      ThisMonthChannelsComponent,
      TodayProductComponent,
      ThisWeekProductComponent,
      ThisMonthProductComponent,
      TodayPaymentMethodComponent,
      ThisWeekPaymentMethodComponent,
      ThisMonthPaymentMethodComponent,
      LoginComponent,
      AdminDashboardComponent
  
    ],
    exports: [
      MDBBootstrapModulesPro,

      TodayCardComponent,
      YesterdayCardComponent,
      ThisMonthCardComponent,
      LastMonthCardComponent,
      LastWeekCardComponent,
      ThisWeekCardComponent,
  
      TodayChannelsComponent,
      ThisWeekChannelsComponent,
      ThisMonthChannelsComponent,
      TodayProductComponent,
      ThisWeekProductComponent,
      ThisMonthProductComponent,
      TodayPaymentMethodComponent,
      ThisWeekPaymentMethodComponent,
      ThisMonthPaymentMethodComponent,

      ServiceStatusComponent,
      BvnStatusComponent,
      LoginComponent,
      AdminDashboardComponent
  
    ],
    providers: [
      // itex
      SummaryService,
    ChannelService,
    ProductsService,
    PaymentMethodService,
    TransactionService
    ],

    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
  })
  export class PagesModule { }