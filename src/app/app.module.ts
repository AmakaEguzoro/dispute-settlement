import { ToastModule } from 'ng-uikit-pro-standard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';


// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';

import { AsdevApiService } from './providers/asdev-api.service';

//encrption decryption service
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { AuthGuard } from './_auth/auth.guard';
import { HttpInterceptorProvider } from './_auth/errorInterceptor';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';



import { OrderModule } from 'ngx-order-pipe';
import { TransactionComponent } from './Transaction/transaction/transaction.component';
import { ModelComponent } from './Transaction/model/model.component';
import { PaginationModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './_service/socket.service';
import { JwtModule } from '@auth0/angular-jwt';
import { PagesModule } from './pages/pages.module';
 
const config: SocketIoConfig = { url: 'http://197.253.19.76:8002', options: { query: { "token": "59fj9439ewdi93" }} };

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    //itex
    TransactionComponent,
    ModelComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule, HttpModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    FormsModule,

    ViewsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    // Itex
    SharedModule,
    PagesModule,
    OrderModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: ['http://197.253.19.76:6200/api/v1/auth']
      }
    })
  ],
  //itex
  entryComponents: [ ModelComponent ],
  
  providers: [
    MDBSpinningPreloader,
    AsdevApiService,
    //itex
     HttpInterceptorProvider,
    AuthGuard,
    SocketService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
