import { ToastModule } from "ng-uikit-pro-standard";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes.service";
import { ViewsModule } from "./views/views.module";
import { SharedModule } from "./shared/shared.module";
import { MDBSpinningPreloader } from "ng-uikit-pro-standard";

// main layout

import { AsdevApiService } from "./providers/asdev-api.service";

//encrption decryption service
import {
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from "@angular/material";
import { AuthGuard } from "./_auth/auth.guard";
import { HttpInterceptorProvider } from "./_auth/errorInterceptor";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { OrderModule } from "ngx-order-pipe";
import {
  PaginationModule,
  ModalModule,
  BsDatepickerModule,
  TabsModule,
} from "ngx-bootstrap";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { SocketService } from "./_service/socket.service";
import { JwtModule } from "@auth0/angular-jwt";
import { PagesModule } from "./pages/pages.module";
import { ModelComponent } from "./pages/Transaction/transaction/model/model.component";
import { NotificationComponent } from "./views/notification/notification.component";
import { ReversalModelComponent } from "./pages/Transaction/transaction-reversal/reversal-model/reversal-model.component";
import { RegisterComponent } from "./_auth/register/register.component";
import { AuthModule } from "./_auth/_auth.module";
import { ServiceModule } from "./_service/_service.module";
import { HasRoleDirective } from "./main-layout/navigation/directives/has-role.directive";
import { UserModalComponent } from "./pages/admin/role-management/user-modal/user-modal.component";
import { RoleGuard } from "./_auth/role-guard.service";
import { NavigationModule } from "./main-layout/navigation/navigation.module";
import { RouterTestingModule } from "@angular/router/testing";
import { DirectiveModule } from "./directive.module";
import { WebworkerService } from "./web-worker/webworker.service";
// import { SanefModelComponent } from "./pages/sanef/transactions/model/model.component";
import { EJournalComponent } from "./pages/Transaction/transaction/e-receipt/e-journal/e-journal.component";
import { SettlementModalComponent } from "../app/pages/sanef/settlement/settlement-modal/settlement-modal.component";

const config: SocketIoConfig = {
  url: "http://197.253.19.76:8002",
  options: { query: { token: "59fj9439ewdi93" } },
};

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [AppComponent, NotificationComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutes,
    RouterModule,
    // RouterTestingModule,
    FormsModule,
    DirectiveModule,
    NavigationModule,
    ViewsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    // Itex
    SharedModule,
    PagesModule,
    MatTabsModule,
    // ServiceModule,
    // AuthModule,
    OrderModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: [
          "http://127.0.0.1:8000/api/v1/auth",
          // 'http://197.253.19.76:6200/api/v1/users/create'
        ],
      },
    }),
  ],
  //itex
  entryComponents: [
    ModelComponent,
    SettlementModalComponent,

    ReversalModelComponent,
    UserModalComponent,
    EJournalComponent,
  ],

  providers: [
    MDBSpinningPreloader,
    AsdevApiService,
    //itex
    HttpInterceptorProvider,
    AuthGuard,
    RoleGuard,
    SocketService,
    WebworkerService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
