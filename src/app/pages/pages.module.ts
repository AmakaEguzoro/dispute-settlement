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
import { TransactionComponent } from "./Transaction/transaction/transaction.component";
import { TransactionMonitorComponent } from "./Transaction/transaction-monitor/transaction-monitor.component";
import { ModelComponent } from "./Transaction/transaction/model/model.component";
import { SettlementModalComponent } from "./sanef/settlement/settlement-modal/settlement-modal.component";
import { ModelComponent1 } from "./Transaction/transaction-monitor/model/model.component";
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
import { TransactionNipSetlComponent } from "./Transaction/transaction-nip-setl/transaction-nip-setl.component";
import { TransactionIepostpaidComponent } from "./Transaction/transaction-iepostpaid/transaction-iepostpaid.component";

import { Table1Component } from "./Transaction/transaction-global/table1/table1.component";
import { Table2Component } from "./Transaction/transaction-global/table2/table2.component";

import { CashinComponent } from "./Transaction/transaction-global/cashin/cashin.component";
import { CashoutComponent } from "./Transaction/transaction-global/cashout/cashout.component";
import { VascardComponent } from "./Transaction/transaction-global/vascard/vascard.component";
import { VascashComponent } from "./Transaction/transaction-global/vascash/vascash.component";
import { AgentdashboardComponent } from "./agentdashboard/agentdashboard.component";
import { AgentdetailComponent } from "./agentdashboard/agentdetail/agentdetail.component";
import { AccountComponent } from "./sanef/account/account.component";
import { TransactionsComponent } from "./sanef/transactions/transactions.component";
import { SanefModelComponent } from "./sanef/transactions/model/model.component";
import { AppConfigComponent } from "./settings/app-configuration/app-config/app-config.component";
import { TransactionLimitsComponent } from "./Transaction/transaction-limits/transaction-limits.component";
import { B2bConfigComponent } from "./settings/B2B-CONFIGURATION/b2b-config/b2b-config.component";
import { DataPlansComponent } from "./settings/Data-config/data-plans/data-plans.component";
import { WalletLimitsComponent } from "./settings/Wallet-config/wallet-limits/wallet-limits.component";
import { InconclusiveTransactionComponent } from "./Transaction/inconclusive-transaction/inconclusive-transaction.component";
import { NqrComponent } from "./nqr/nqr.component";
import { NqrBulkComponent } from "./nqr/nqr-bulk/nqr-bulk.component";
import { NqrHistoryComponent } from "./nqr/nqr-history/nqr-history.component";
import { AnQrcodeModule } from "an-qrcode";
import { PurchaseReceiptComponent } from "./Transaction/transaction/e-receipt/purchase-receipt/purchase-receipt.component";
import { PurchaseReceiptComponent1 } from "./Transaction/transaction-monitor/e-receipt/purchase-receipt/purchase-receipt.component";
import { EJournalComponent } from "./Transaction/transaction/e-receipt/e-journal/e-journal.component";
import { EJournalComponent1 } from "./Transaction/transaction-monitor/e-receipt/e-journal/e-journal.component";

import { NqrMerchantOnboardComponent } from "./nqr/nqr-merchant-onboard/nqr-merchant-onboard.component";
import { NqrMerchantHistoryComponent } from "./nqr/nqr-merchant-history/nqr-merchant-history.component";
import { DayDashboardComponent } from "./dashboard/day-dashboard/day-dashboard.component";
import { WeekDashboardComponent } from "./dashboard/week-dashboard/week-dashboard.component";
import { MonthDashboardComponent } from "./dashboard/month-dashboard/month-dashboard.component";
import { DashboardViewComponent } from "./dashboard/dashboard-view/dashboard-view.component";
import { NqrTransactionComponent } from "./nqr/nqr-transaction/nqr-transaction.component";
import { AutoPostTransactionComponent } from "./Transaction/auto-post-transaction/auto-post-transaction.component";
import { NipPayTransactionsComponent } from "./Transaction/nip-pay-transactions/nip-pay-transactions.component";
import { SettlementComponent } from "./sanef/settlement/settlement.component";
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
    AnQrcodeModule,
  ],
  declarations: [
    // Itex Copmponent
    SanefModelComponent,
    ServiceStatusComponent,
    BvnStatusComponent,

    LoginComponent,
    RegisterComponent,
    TransactionComponent,
    TransactionMonitorComponent,
    ModelComponent,
    TransactionReversalComponent,
    TransactionIepostpaidComponent,
    ReversalModelComponent,
    TransactionLocksComponent,
    RoleManagementComponent,
    UserModalComponent,

    McashTransactionComponent,
    McashComponent,
    ErrorAnalysisComponent,
    StatusModalComponent,
    CgateComponent,
    TransactionGlobalComponent,
    TransactionNipComponent,
    TransactionNipSetlComponent,
    Table1Component,
    Table2Component,
    CashinComponent,
    CashoutComponent,
    VascardComponent,
    VascashComponent,
    AgentdashboardComponent,
    AgentdetailComponent,
    AccountComponent,
    TransactionsComponent,
    AppConfigComponent,
    TransactionLimitsComponent,
    B2bConfigComponent,
    WalletLimitsComponent,
    DataPlansComponent,
    InconclusiveTransactionComponent,
    NqrComponent,
    NqrBulkComponent,
    NqrHistoryComponent,
    PurchaseReceiptComponent,
    PurchaseReceiptComponent1,
    EJournalComponent,
    EJournalComponent1,
    ModelComponent1,
    NqrMerchantOnboardComponent,
    NqrMerchantHistoryComponent,
    DayDashboardComponent,
    WeekDashboardComponent,
    MonthDashboardComponent,
    DashboardViewComponent,
    AutoPostTransactionComponent,
    NqrTransactionComponent,
    NipPayTransactionsComponent,
    SettlementComponent,
    SettlementModalComponent,
  ],
  exports: [
    MDBBootstrapModulesPro,
    SanefModelComponent,
    ServiceStatusComponent,
    BvnStatusComponent,
    LoginComponent,
    RegisterComponent,
    TransactionComponent,
    ModelComponent,
    SettlementModalComponent,
    TransactionReversalComponent,
    ReversalModelComponent,
    TransactionLocksComponent,
    RoleManagementComponent,
    McashTransactionComponent,
    McashComponent,
    AppConfigComponent,
    TransactionLimitsComponent,
    B2bConfigComponent,
    WalletLimitsComponent,
    DataPlansComponent,
    InconclusiveTransactionComponent,
    PurchaseReceiptComponent,
    EJournalComponent,
    DayDashboardComponent,
    WeekDashboardComponent,
    MonthDashboardComponent,
    DashboardViewComponent,
    AutoPostTransactionComponent,
    NipPayTransactionsComponent,
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
