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
import { RoleManagementComponent } from './pages/admin/role-management/role-management.component';
import { RoleGuard } from './_auth/role-guard.service';


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  
  
  {
    path: '',
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent, 
      canActivate: [RoleGuard],data: { expectedRole: 5} },

      { path: 'transaction/details', component: TransactionComponent },

      { path: 'service-status', component: ServiceStatusComponent,
       canActivate: [RoleGuard],data: { expectedRole: 5} },

      { path: 'bvn-status', component: BvnStatusComponent,
      canActivate: [RoleGuard],data: { expectedRole: 5} },
      
      { path: 'transaction/reversal', component: TransactionReversalComponent,
      canActivate: [RoleGuard],data: { expectedRole: 5} },

      { path: 'transaction/locks', component: TransactionLocksComponent,
      canActivate: [RoleGuard],data: { expectedRole: 5} },

      { path: 'register', component: RegisterComponent,
       canActivate: [RoleGuard],data: { expectedRole: 5}},

      { path: 'users', component: RoleManagementComponent,
      canActivate: [RoleGuard],data: { expectedRole: 5}},
    ]
  },
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
