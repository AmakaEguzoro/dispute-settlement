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
import { TransactionGlobalComponent } from "./pages/Transaction/transaction-global/transaction-global.component";
import { TransactionNipComponent } from "./pages/Transaction/transaction-nip/transaction-nip.component";
import { TransactionLocksComponent } from "./pages/Transaction/transaction-locks/transaction-locks.component";
import { RegisterComponent } from "./_auth/register/register.component";
import { RoleManagementComponent } from "./pages/admin/role-management/role-management.component";
import { RoleGuard } from "./_auth/role-guard.service";
import { DayCardComponent } from "./pages/admin/dashboard-cards/daily-cards/day-card/day-card.component";
import { WeekCardComponent } from "./pages/admin/dashboard-cards/weekly-cards/week-card/week-card.component";
import { MonthCardComponent } from "./pages/admin/dashboard-cards/monthly-cards/month-card/month-card.component";
import { AgencyBankingComponent } from "./AgencyBanking/agency-banking/agency-banking.component";
import { McashTransactionComponent } from "./pages/Mcash/transaction/mcash-transaction.component";
import { McashComponent } from "./pages/Mcash/terminals/mcash.component";
import { ErrorAnalysisComponent } from "./pages/error-analysis/error-analysis.component";
import { CgateComponent } from "./pages/cgate/cgate.component";
import { AgentdashboardComponent } from "./pages/agentdashboard/agentdashboard.component";
import { TransactionLimitsComponent } from "./pages/Transaction/transaction-limits/transaction-limits.component";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "not-found", component: NotFoundComponent },

  {
    path: "",
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // { path: 'admin-dashboard', component: AdminDashboardComponent,
      // canActivate: [RoleGuard],data: { expectedRole: [3, 4, 5]} },

      {
        path: "admin-dashboard/day",
        component: DayCardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "admin-dashboard/week",
        component: WeekCardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "admin-dashboard/month",
        component: MonthCardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      { path: "transaction/details", component: TransactionComponent },

      {
        path: "agency/banking",
        component: AgencyBankingComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "error/analysis",
        component: ErrorAnalysisComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "mcash/transactions",
        component: McashTransactionComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "mcash/map-terminals",
        component: McashComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "cgate/transactions",
        component: CgateComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "transaction/global",
        component: TransactionGlobalComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "onboarding/dashboard",
        component: AgentdashboardComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "sanef/account",
        component: AccountComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "sanef/transactions",
        component: TransactionsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "transaction/nip",
        component: TransactionNipComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "service-status",
        component: ServiceStatusComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [4, 5] },
      },

      {
        path: "bvn-status",
        component: BvnStatusComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [4, 5] },
      },

      {
        path: "transaction/reversal",
        component: TransactionReversalComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "transaction/locks",
        component: TransactionLocksComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      {
        path: "register",
        component: RegisterComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [5] },
      },

      {
        path: "users",
        component: RoleManagementComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },
      {
        path: "transaction/limits",
        component: TransactionLimitsComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: [3, 4, 5] },
      },

      ////////// MCASH ROUTE ////////////////////////
      //  { path: 'Mcash', component: McashComponent},
    ],
  },

  { path: "**", redirectTo: "not-found", pathMatch: "full" },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
