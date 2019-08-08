import { PaymentsDashboardComponent } from './views/payments/payments-dashboard/payments-dashboard.component';
import { PaymentsOnlineComponent } from './views/payments/payments-online/payments-online.component';
import { PaymentsOfflineComponent } from './views/payments/payments-offline/payments-offline.component';
import { BlogsDashboardComponent } from './views/blogs/blogs-dashboard/blogs-dashboard.component';
import { CreateBlogsComponent } from './views/blogs/create-blogs/create-blogs.component';
import { FeedsDashboardComponent } from './views/feeds/feeds-dashboard/feeds-dashboard.component';
import { CreateFeedsComponent } from './views/feeds/create-feeds/create-feeds.component';
import { CreateMembersComponent } from './views/members/create-members/create-members.component';
import { MembersDashboardComponent } from './views/members/members-dashboard/members-dashboard.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { RoleManagementComponent } from './views/admin/role-management/role-management.component';
import { FinanceManagementComponent } from './views/finance/finance-management/finance-management.component';
import { FinanceDashboardComponent } from './views/finance/finance-dashboard/finance-dashboard.component';
import { MinutesDashboardComponent } from './views/minutes/minutes-dashboard/minutes-dashboard.component';
import { MinutesManagementComponent } from './views/minutes/minutes-management/minutes-management.component';
import { ElectionsManagementComponent } from './views/elections/elections-management/elections-management.component';
import { ElectionsDashboardComponent } from './views/elections/elections-dashboard/elections-dashboard.component';
import { ExcosComponent } from './views/members/excos/excos.component';
import { CreateMinutesComponent } from './views/minutes/create-minutes/create-minutes.component';
import { CreateFinanceComponent } from './views/finance/create-finance/create-finance.component';
import { CreateElectionsComponent } from './views/elections/create-elections/create-elections.component';

import { HelpComponent } from './views/help/help.component';
import { Settings1Component } from './views/settings/settings1/settings1.component';
import { Settings2Component } from './views/settings/settings2/settings2.component';
import { Settings3Component } from './views/settings/settings3/settings3.component';
import { Map3Component } from './views/maps/map3/map3.component';
import { Form3Component } from './views/forms/form3/form3.component';
import { PopoversComponent } from './views/components/popovers/popovers.component';
import { TooltipsComponent } from './views/components/tooltips/tooltips.component';
import { TimePickerComponent } from './views/components/time-picker/time-picker.component';
import { DatePickerComponent } from './views/components/date-picker/date-picker.component';
import { CollapseComponent } from './views/components/collapse/collapse.component';
import { TagsComponent } from './views/components/tags/tags.component';
import { TabsComponent } from './views/components/tabs/tabs.component';
import { ProgressBarsComponent } from './views/components/progress-bars/progress-bars.component';
import { PaginationComponent } from './views/components/pagination/pagination.component';
import { ListsComponent } from './views/components/lists/lists.component';
import { PanelsComponent } from './views/components/panels/panels.component';
import { CardsComponent } from './views/components/cards/cards.component';
import { ButtonsComponent } from './views/components/buttons/buttons.component';
import { ShadowComponent } from './views/css/shadow/shadow.component';
import { ColorsComponent } from './views/css/colors/colors.component';
import { ImagesComponent } from './views/css/images/images.component';
import { UtilitiesComponent } from './views/css/utilities/utilities.component';
import { MediaObjectComponent } from './views/css/media-object/media-object.component';
import { GridComponent } from './views/css/grid/grid.component';
import { AlertComponent } from './shared/alerts/alert/alert.component';
import { Form2Component } from './views/forms/form2/form2.component';
import { Form1Component } from './views/forms/form1/form1.component';
import { Map2Component } from './views/maps/map2/map2.component';
import { Map1Component } from './views/maps/map1/map1.component';
import { IconsComponent } from './views/css/icons/icons.component';
import { TypographyComponent } from './views/css/typography/typography.component';
import { ModalsComponent } from './views/modals/modals.component';
import { Chart3Component } from './views/charts/chart3/chart3.component';
import { Table2Component } from './views/tables/table2/table2.component';
import { Chart2Component } from './views/charts/chart2/chart2.component';
import { Chart1Component } from './views/charts/chart1/chart1.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { Profile2Component } from './views/profile/profile2/profile2.component';
import { Profile3Component } from './views/profile/profile3/profile3.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LockComponent } from './views/pages/lock/lock.component';
import { PricingComponent } from './views/pages/pricing/pricing.component';
import { SinglePostComponent } from './views/pages/single-post/single-post.component';
import { PostListingComponent } from './views/pages/post-listing/post-listing.component';
import { CustomersComponent } from './views/pages/customers/customers.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { Dashboard2Component } from './views/dashboards/dashboard2/dashboard2.component';
import { Dashboard3Component } from './views/dashboards/dashboard3/dashboard3.component';
import { Dashboard4Component } from './views/dashboards/dashboard4/dashboard4.component';
import { Dashboard5Component } from './views/dashboards/dashboard5/dashboard5.component';
import { EventCalendarComponent } from './views/event-calendar/event-calendar.component';
import { MembersManagementComponent } from './views/members/members-management/members-management.component';
import { AuthGuard } from './_auth/auth.guard';
import { NavigationComponent } from './main-layout/navigation/navigation.component';
import { TodayCardComponent } from './shared/dashboard-cards/daily-cards/today-card/today-card.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent },
 

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: NavigationComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      // { path: 'today', component: TodayCardComponent}
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  // { path: 'login', component: LoginComponent},
  // // { path: '', pathMatch: 'full', redirectTo: 'dashboards/v1' },
  // { path: ' ', pathMatch: 'full', redirectTo: 'login' },

  // //Site routes goes here 
  // {
  //   path: '',
  //   component: SiteLayoutComponent,
  //   // canActivate: [AuthGuard],
  //   children: [
  //     // { path: '', component: Dashboard1Component, pathMatch: 'full' },
  //     { path: 'dashboard', component: Dashboard1Component },
  //     { path: 'vas-transaction', component: Dashboard2Component },
  //     { path: 'role-management', component: RoleManagementComponent },
  //     { path: 'cashin/requery', component: RoleManagementComponent },
  //     { path: 'movies', component: RoleManagementComponent },
  //     { path: 'mandate', component: RoleManagementComponent },
  //     { path: 'genesis-reporting', component: RoleManagementComponent },
  //     { path: 'buttons', component: ButtonsComponent },
  //     { path: 'progress-bars', component: ProgressBarsComponent },
  //     { path: 'modals', component: ModalsComponent },
  //     { path: 'slim', component: ModalsComponent },
  //   ]
  // },

  // //no layout routes
  // // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // // otherwise redirect to home



  // {
  //   path: 'dashboards', children:
  //     [
  //       { path: 'v1', component: Dashboard1Component },
  //       { path: 'v2', component: Dashboard2Component },
  //       { path: 'v3', component: Dashboard3Component },
  //       { path: 'v4', component: Dashboard4Component },
  //       { path: 'v5', component: Dashboard5Component },
  //     ]
  // },
  // {
  //   path: 'admin', children:
  //     [
  //       { path: 'admin-dashboard', component: AdminDashboardComponent },
  //       { path: 'role-management', component: RoleManagementComponent },
  //     ]
  // },

  // {
  //   path: 'members', children:
  //     [
  //       { path: 'members-dashboard', component: MembersDashboardComponent },
  //       { path: 'create-members', component: CreateMembersComponent },
  //       { path: 'members-management', component: MembersManagementComponent },
  //       { path: 'excos', component: ExcosComponent },
  //     ]
  // },

  // {
  //   path: 'minutes', children:
  //     [
  //       { path: 'minutes-dashboard', component: MinutesDashboardComponent },
  //       { path: 'minutes-management', component: MinutesManagementComponent },
  //       { path: 'create-minutes', component: CreateMinutesComponent },
  //     ]
  // },

  // {
  //   path: 'finance', children:
  //     [
  //       { path: 'finance-dashboard', component: FinanceDashboardComponent },
  //       { path: 'finance-management', component: FinanceManagementComponent },
  //       { path: 'create-finance', component: CreateFinanceComponent },
  //     ]
  // },

  // {
  //   path: 'payments', children:
  //     [
  //       { path: 'payments-dashboard', component: PaymentsDashboardComponent },
  //       { path: 'payments-online', component: PaymentsOnlineComponent },
  //       { path: 'payments-offline', component: PaymentsOfflineComponent },
  //     ]
  // },

//   {
//     path: 'elections', children:
//       [
//         { path: 'elections-dashboard', component: ElectionsDashboardComponent },
//         { path: 'elections-management', component: ElectionsManagementComponent },
//         { path: 'create-elections', component: CreateElectionsComponent },
//       ]
//   },

//   {
//     path: 'blogs', children:
//       [
//         { path: 'blogs-dashboard', component: BlogsDashboardComponent },
//         { path: 'create-blogs', component: CreateBlogsComponent },
//       ]
//   },

//   {
//     path: 'feeds', children:
//       [
//         { path: 'feeds-dashboard', component: FeedsDashboardComponent },
//         { path: 'create-feeds', component: CreateFeedsComponent },
//       ]
//   },

//   {
//     path: 'pages', children:
//       [
//         // { path: 'login', component: LoginComponent },
//         { path: 'register', component: RegisterComponent },
//         { path: 'lock', component: LockComponent },
//         { path: 'pricing', component: PricingComponent },
//         { path: 'single-post', component: SinglePostComponent },
//         { path: 'post-listing', component: PostListingComponent },
//         { path: 'customers', component: CustomersComponent },
//       ]
//   },
//   {
//     path: 'profiles', children:
//       [
//         { path: 'profile1', component: Profile1Component },
//         { path: 'profile2', component: Profile2Component },
//         { path: 'profile3', component: Profile3Component }
//       ]
//   },
//   {
//     path: 'settings', children:
//       [
//         { path: 'settings1', component: Settings1Component },
//         { path: 'settings2', component: Settings2Component },
//         { path: 'settings3', component: Settings3Component }
//       ]
//   },
//   {
//     path: 'components', children:
//       [
//         { path: 'buttons', component: ButtonsComponent },
//         { path: 'cards', component: CardsComponent },
//         { path: 'panels', component: PanelsComponent },
//         { path: 'lists', component: ListsComponent },
//         { path: 'pagination', component: PaginationComponent },
//         { path: 'progress-bars', component: ProgressBarsComponent },
//         { path: 'tabs', component: TabsComponent },
//         { path: 'tags', component: TagsComponent },
//         { path: 'collapse', component: CollapseComponent },
//         { path: 'date-picker', component: DatePickerComponent },
//         { path: 'time-picker', component: TimePickerComponent },
//         { path: 'tooltips', component: TooltipsComponent },
//         { path: 'popovers', component: PopoversComponent },
//       ]
//   },
//   {
//     path: 'tables', children:
//       [
//         { path: 'table1', component: BasicTableComponent },
//         { path: 'table2', component: Table2Component },
//       ]
//   },
//   {
//     path: 'charts', children:
//       [
//         { path: 'chart1', component: Chart1Component },
//         { path: 'chart2', component: Chart2Component },
//         { path: 'chart3', component: Chart3Component },
//       ]
//   },
//   {
//     path: 'maps', children:
//       [
//         { path: 'map1', component: Map1Component },
//         { path: 'map2', component: Map2Component },
//         { path: 'map3', component: Map3Component },
//       ]
//   },
//   {
//     path: 'css', children:
//       [
//         { path: 'grid', component: GridComponent },
//         { path: 'media', component: MediaObjectComponent },
//         { path: 'utilities', component: UtilitiesComponent },
//         { path: 'icons', component: IconsComponent },
//         { path: 'images', component: ImagesComponent },
//         { path: 'typography', component: TypographyComponent },
//         { path: 'colors', component: ColorsComponent },
//         { path: 'shadow', component: ShadowComponent },
//       ]
//   },
//   {
//     path: 'forms', children:
//       [
//         { path: 'form1', component: Form1Component },
//         { path: 'form2', component: Form2Component },
//         { path: 'form3', component: Form3Component },
//       ]
//   },
//   { path: 'alerts', component: AlertComponent },
//   { path: 'modals', component: ModalsComponent },
//   { path: 'calendar', component: EventCalendarComponent },
//   { path: 'help', component: HelpComponent },
//   { path: '**', component: NotFoundComponent },
 ];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
