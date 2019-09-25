import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { ServiceStatusComponent } from "./status/service-status/service-status.component";
import { BvnStatusComponent } from "./status/bvn-status/bvn-status.component";
import { SummaryService } from "app/_service/summary.service";
import { ChannelService } from "app/_service/channels.service";
import { ProductsService } from "app/_service/products.service";
import { PaymentMethodService } from "app/_service/payment-method.service";
import { TransactionService } from "app/_service/transaction.service";
import { LoginComponent } from "app/_auth/login/login.component";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { TodayCardComponent } from "./admin/dashboard-cards/daily-cards/today-card/today-card.component";
import { YesterdayCardComponent } from "./admin/dashboard-cards/daily-cards/yesterday-card/yesterday-card.component";
import { ThisMonthCardComponent } from "./admin/dashboard-cards/monthly-cards/this-month-card/this-month-card.component";
import { LastMonthCardComponent } from "./admin/dashboard-cards/monthly-cards/last-month-card/last-month-card.component";
import { LastWeekCardComponent } from "./admin/dashboard-cards/weekly-cards/last-week-card/last-week-card.component";
import { ThisWeekCardComponent } from "./admin/dashboard-cards/weekly-cards/this-week-card/this-week-card.component";
import { TransactionComponent } from "./Transaction/transaction/transaction.component";
import { ModelComponent } from "./Transaction/transaction/model/model.component";
import { TodayChannelsComponent } from "./admin/admin-top-5/channel/today-channels/today-channels.component";
import { ThisWeekChannelsComponent } from "./admin/admin-top-5/channel/this-week-channels/this-week-channels.component";
import { ThisMonthChannelsComponent } from "./admin/admin-top-5/channel/this-month-channels/this-month-channels.component";
import { TodayProductComponent } from "./admin/admin-top-5/product/today-product/today-product.component";
import { ThisWeekProductComponent } from "./admin/admin-top-5/product/this-week-product/this-week-product.component";
import { ThisMonthProductComponent } from "./admin/admin-top-5/product/this-month-product/this-month-product.component";
import { TodayPaymentMethodComponent } from "./admin/admin-top-5/payment-methods/today-payment-method/today-payment-method.component";
import { ThisWeekPaymentMethodComponent } from "./admin/admin-top-5/payment-methods/this-week-payment-method/this-week-payment-method.component";
import { ThisMonthPaymentMethodComponent } from "./admin/admin-top-5/payment-methods/this-month-payment-method/this-month-payment-method.component";
import { SharedModule } from "app/shared/shared.module";
import { OrderModule } from "ngx-order-pipe";
import { PaginationModule } from "ngx-bootstrap";
import { TransactionReversalComponent } from './Transaction/transaction-reversal/transaction-reversal.component';
import { ReversalModelComponent } from './Transaction/transaction-reversal/reversal-model/reversal-model.component';
import { TransactionLocksComponent } from './Transaction/transaction-locks/transaction-locks.component';
import { RegisterComponent } from "app/_auth/register/register.component";
import { RoleManagementComponent } from './admin/role-management/role-management.component';
import { UserModalComponent } from './admin/role-management/user-modal/user-modal.component';
import { HasRoleDirective } from "app/main-layout/navigation/directives/has-role.directive";
import { NavigationComponent } from "../main-layout/navigation/navigation.component";
import { FooterComponent } from "../main-layout/footer/footer.component";
import { NavbarComponent } from "../main-layout/navigation/navbar/navbar.component";
import { DirectiveModule } from "app/directive.module";
import { DayCardComponent } from './admin/dashboard-cards/daily-cards/day-card/day-card.component';
import { MonthCardComponent } from './admin/dashboard-cards/monthly-cards/month-card/month-card.component';
import { WeekCardComponent } from './admin/dashboard-cards/weekly-cards/week-card/week-card.component';
import { RouterModule } from "@angular/router";
import { AppRoutes } from "app/app.routes.service";
import { ExcelService } from "app/_service/excel.service";


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutes,
      RouterModule,
      SharedModule,
      DirectiveModule,
      OrderModule,
      MDBBootstrapModulesPro.forRoot(),
      PaginationModule.forRoot(),
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
      RegisterComponent,
      AdminDashboardComponent,
      TransactionComponent,
      ModelComponent,
      TransactionReversalComponent,
      ReversalModelComponent,
      TransactionLocksComponent,
      RoleManagementComponent,
      UserModalComponent,
      DayCardComponent,
      MonthCardComponent,
      WeekCardComponent,
  
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
      RegisterComponent,
      AdminDashboardComponent,
      TransactionComponent,
      ModelComponent,
      TransactionReversalComponent,
      ReversalModelComponent,
      TransactionLocksComponent,
      RoleManagementComponent,
      DayCardComponent,
      MonthCardComponent,
      WeekCardComponent,
    ],
    providers: [
      // itex
      SummaryService,
    ChannelService,
    ProductsService,
    PaymentMethodService,
    TransactionService,
    ExcelService,
    ],

    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
  })
  export class PagesModule { }