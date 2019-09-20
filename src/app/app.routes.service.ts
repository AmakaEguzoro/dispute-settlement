import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './views/pages/login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { TransactionComponent } from './Transaction/transaction/transaction.component';
import { ServiceStatusComponent } from './shared/service-status/service-status.component';
import { BvnStatusComponent } from './shared/bvn-status/bvn-status.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { UserManagementComponent } from './shared/user-management/user-management.component';


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
      { path: 'user-management', component: UserManagementComponent}
    ]
  },
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
