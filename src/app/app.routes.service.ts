import { NqrMerchantOnboardComponent } from './pages/nqr/nqr-merchant-onboard/nqr-merchant-onboard.component';
import { NqrMerchantHistoryComponent } from './pages/nqr/nqr-merchant-history/nqr-merchant-history.component';
import { TransactionsComponent } from "./pages/sanef/transactions/transactions.component";
import { AccountComponent } from "./pages/sanef/account/account.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { RouterModule, Route } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./_auth/login/login.component";
import { AuthGuard } from "./_auth/auth.guard";
import { ServiceStatusComponent } from "./pages/status/service-status/service-status.component";
import { BvnStatusComponent } from "./pages/status/bvn-status/bvn-status.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { TransactionComponent } from "./pages/Transaction/transaction/transaction.component";
import { TransactionReversalComponent } from "./pages/Transaction/transaction-reversal/transaction-reversal.component";
import { TransactionIepostpaidComponent } from "./pages/Transaction/transaction-iepostpaid/transaction-iepostpaid.component";

import { TransactionGlobalComponent } from "./pages/Transaction/transaction-global/transaction-global.component";
import { TransactionNipComponent } from "./pages/Transaction/transaction-nip/transaction-nip.component";
import { TransactionNipSetlComponent } from "./pages/Transaction/transaction-nip-setl/transaction-nip-setl.component";

import { TransactionLocksComponent } from "./pages/Transaction/transaction-locks/transaction-locks.component";
import { RegisterComponent } from "./_auth/register/register.component";
import { RoleManagementComponent } from "./pages/admin/role-management/role-management.component";
import { RoleGuard } from "./_auth/role-guard.service";
import { AgencyBankingComponent } from "./AgencyBanking/agency-banking/agency-banking.component";
import { McashTransactionComponent } from "./pages/Mcash/transaction/mcash-transaction.component";
import { McashComponent } from "./pages/Mcash/terminals/mcash.component";
import { ErrorAnalysisComponent } from "./pages/error-analysis/error-analysis.component";
import { CgateComponent } from "./pages/cgate/cgate.component";
import { AgentdashboardComponent } from "./pages/agentdashboard/agentdashboard.component";
import { AppConfigComponent } from "./pages/settings/app-configuration/app-config/app-config.component";
import { TransactionLimitsComponent } from "./pages/Transaction/transaction-limits/transaction-limits.component";
import { DataPlansComponent } from "./pages/settings/Data-config/data-plans/data-plans.component";
import { WalletLimitsComponent } from "./pages/settings/Wallet-config/wallet-limits/wallet-limits.component";
import { B2bConfigComponent } from "./pages/settings/B2B-CONFIGURATION/b2b-config/b2b-config.component";
import { InconclusiveTransactionComponent } from "./pages/Transaction/inconclusive-transaction/inconclusive-transaction.component";
import { NqrComponent } from './pages/nqr/nqr.component';
import { NqrBulkComponent } from './pages/nqr/nqr-bulk/nqr-bulk.component';
import { NqrHistoryComponent } from './pages/nqr/nqr-history/nqr-history.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "not-found", component: NotFoundComponent },

  {
    path: "",
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [

      {
        path: "admin-dashboard/day",
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Dashboard | Summary View' },
        
      },


      { path: "transaction/details", component: TransactionComponent, data:{ breadcrumb: 'Transactions'}  },

      { path: "inconclusive/transaction", component: InconclusiveTransactionComponent,
       data:{ breadcrumb: 'Inconclusive Transactions'}  },


      {
        path: "agency/banking",
        component: AgencyBankingComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Agency Banking' },
      },

      {
        path: "error/analysis",
        component: ErrorAnalysisComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Error Analysis' },
      },

      {
        path: "mcash/transactions",
        component: McashTransactionComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] , breadcrumb: 'Mcash Transactions'},
      },

      {
        path: "mcash/map-terminals",
        component: McashComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Mcash | Map Terminals' },
      },

      {
        path: "cgate/transactions",
        component: CgateComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Cgate Transactions' },
      },
      {
        path: "transaction/global",
        component: TransactionGlobalComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5],breadcrumb: 'Global Transactions' },
      },
      {
        path: "onboarding/dashboard",
        component: AgentdashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Onboarding Dashboard' },
      },
       {
        path: "nqr/onboard",
        component: NqrComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nqr Onboarding' },
      },
       {
        path: "nqr/onboard-bulk",
        component: NqrBulkComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nqr | Bulk-Upload' },
      },
       {
        path: "nqr/onboard-history",
        component: NqrHistoryComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nqr | Onboard History' },
      },
      {
        path: "nqr/merchant-onboard-history",
        component: NqrMerchantHistoryComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nqr | Merchant Onboard History' },
      },
       {
        path: "nqr/merchant-onboard",
        component: NqrMerchantOnboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nqr | Merchant Bulk-Upload'},
      },
      {
        path: "sanef/account",
        component: AccountComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Sanef | Account' },
      },
      {
        path: "sanef/transactions",
        component: TransactionsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Sanef | Transactions'  },
      },
      {
        path: "transaction/nip",
        component: TransactionNipComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nip | Transactions Session Report' },
      },

      {
        path: "transaction-settlement/nip",
        component: TransactionNipSetlComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Nip | Settlement Cycle Report' },
      },

      {
        path: "service-status",
        component: ServiceStatusComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [4, 5],  breadcrumb: 'Service Status' },
      },

      {
        path: "bvn-status",
        component: BvnStatusComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [4, 5],  breadcrumb: 'Bvn Status'},
      },

      {
        path: "transaction/reversal",
        component: TransactionReversalComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Transaction Reversal' },
      },

      {
        path: "transaction/iepostpaid",
        component: TransactionIepostpaidComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'IE Stored/Forwarded Transaction Report'},
      },

      {
        path: "transaction/locks",
        component: TransactionLocksComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] ,breadcrumb: 'Transactions On-Hold'},
      },

      {
        path: "register",
        component: RegisterComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5], breadcrumb: ' Create User'},
      },

      {
        path: "users",
        component: RoleManagementComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] ,breadcrumb: 'Users' },
      },
      {
        path: "transaction/limits",
        component: TransactionLimitsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5], breadcrumb: 'Transaction Limits' },
      },

      {
        path: "app/configurations",
        component: AppConfigComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5], breadcrumb: 'Live App Configurations'},
      },

      {
        path: "b2b/configurations",
        component: B2bConfigComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5], breadcrumb: 'Live B2B Configurations'},
      },
      {
        path: "wallet/configurations",
        component: WalletLimitsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5], breadcrumb: 'Live Wallet Limits' },
      },
      {
        path: "data/configurations",
        component: DataPlansComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5], breadcrumb: 'Live Data Configurations'},
      },
    ],
  },

  { path: "**", redirectTo: "not-found", pathMatch: "full" },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
