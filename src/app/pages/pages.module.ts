import {
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from "@angular/core";
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
import { ThisMonthCardComponent } from "./admin/dashboard-cards/monthly-cards/this-month-card/this-month-card.component";
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
import { TransactionReversalComponent } from "./Transaction/transaction-reversal/transaction-reversal.component";
import { ReversalModelComponent } from "./Transaction/transaction-reversal/reversal-model/reversal-model.component";
import { TransactionLocksComponent } from "./Transaction/transaction-locks/transaction-locks.component";
import { RegisterComponent } from "app/_auth/register/register.component";
import { RoleManagementComponent } from "./admin/role-management/role-management.component";
import { UserModalComponent } from "./admin/role-management/user-modal/user-modal.component";
import { HasRoleDirective } from "app/main-layout/navigation/directives/has-role.directive";
import { NavigationComponent } from "../main-layout/navigation/navigation.component";
import { FooterComponent } from "../main-layout/footer/footer.component";
import { NavbarComponent } from "../main-layout/navigation/navbar/navbar.component";
import { DirectiveModule } from "app/directive.module";
import { DayCardComponent } from "./admin/dashboard-cards/daily-cards/day-card/day-card.component";
import { MonthCardComponent } from "./admin/dashboard-cards/monthly-cards/month-card/month-card.component";
import { WeekCardComponent } from "./admin/dashboard-cards/weekly-cards/week-card/week-card.component";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "app/app.routes.service";
import { ExcelService } from "app/_service/excel.service";
import { McashTransactionComponent } from "./Mcash/transaction/mcash-transaction.component";
import { McashComponent } from "./Mcash/terminals/mcash.component";
import { ErrorAnalysisComponent } from "./error-analysis/error-analysis.component";
import { StatusModalComponent } from "./status/service-status/status-modal/status-modal.component";
import { CgateComponent } from "./cgate/cgate.component";
import { TransactionGlobalComponent } from "./Transaction/transaction-global/transaction-global.component";
import { TransactionNipComponent } from "./Transaction/transaction-nip/transaction-nip.component";

import { Table1Component } from "./Transaction/transaction-global/table1/table1.component";
import { Table2Component } from "./Transaction/transaction-global/table2/table2.component";

import { CashinComponent } from "./Transaction/transaction-global/cashin/cashin.component";
import { CashoutComponent } from "./Transaction/transaction-global/cashout/cashout.component";
import { VascardComponent } from "./Transaction/transaction-global/vascard/vascard.component";
import { VascashComponent } from "./Transaction/transaction-global/vascash/vascash.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    RouterModule,
    SharedModule,
    OrderModule,
    PaginationModule.forRoot(),
    DirectiveModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  declarations: [
    // Itex Copmponent
    TodayCardComponent,
    ThisMonthCardComponent,
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

    McashTransactionComponent,
    McashComponent,
    ErrorAnalysisComponent,
    StatusModalComponent,
    CgateComponent,
    TransactionGlobalComponent,
    TransactionNipComponent,
    Table1Component,
    Table2Component,

    CashinComponent,
    CashoutComponent,
    VascardComponent,
    VascashComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,

    TodayCardComponent,
    ThisMonthCardComponent,
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

    McashTransactionComponent,
    McashComponent,
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

  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
