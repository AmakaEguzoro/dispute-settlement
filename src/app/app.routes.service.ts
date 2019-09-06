import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './views/pages/login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { TransactionComponent } from './Transaction/transaction/transaction.component';
import { ServiceStatusComponent } from './shared/components/service-status/service-status.component';
<<<<<<< HEAD
import { TodayCardComponent } from './shared/dashboard-cards/daily-cards/today-card/today-card.component';
import { BvnStatusComponent } from './shared/bvn-status/bvn-status.component';
=======
import { NotFoundComponent } from './views/not-found/not-found.component';
>>>>>>> 0be8e68e0b501cc40ac6e4d809a962cf6419513c


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'service-status', component: ServiceStatusComponent },
  { path: 'bvn-status', component: BvnStatusComponent},
=======

  { path: 'not-found', component: NotFoundComponent },

>>>>>>> 0be8e68e0b501cc40ac6e4d809a962cf6419513c
  {
    path: '',
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'transaction/details', component: TransactionComponent },
      { path: 'service-status', component: ServiceStatusComponent },
    ]
  },
  
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
