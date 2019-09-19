import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './_auth/login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { ServiceStatusComponent } from './pages/status/service-status/service-status.component';
import { BvnStatusComponent } from './pages/status/bvn-status/bvn-status.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TransactionComponent } from './pages/Transaction/transaction/transaction.component';
import { TransactionReversalComponent } from './pages/Transaction/transaction-reversal/transaction-reversal.component';
import { TransactionLocksComponent } from './pages/Transaction/transaction-locks/transaction-locks.component';
import { RegisterComponent } from './_auth/register/register.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },

  {
    path: '',
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent, 
      // data: {roles: ['Admin',]}
    },
      { path: 'transaction/details', component: TransactionComponent },
      { path: 'service-status', component: ServiceStatusComponent },
      { path: 'bvn-status', component: BvnStatusComponent},
      { path: 'transaction/reversal', component: TransactionReversalComponent},
      { path: 'transaction/locks', component: TransactionLocksComponent},
      { path: 'register', component: RegisterComponent},
    ]
  },
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
