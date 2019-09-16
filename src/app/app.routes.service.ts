import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './_auth/login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { TransactionComponent } from './Transaction/transaction/transaction.component';
import { ServiceStatusComponent } from './pages/service-status/service-status.component';
import { BvnStatusComponent } from './pages/bvn-status/bvn-status.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },

  {
    path: '',
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'transaction/details', component: TransactionComponent },
      { path: 'service-status', component: ServiceStatusComponent },
      { path: 'bvn-status', component: BvnStatusComponent},
    ]
  },
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
