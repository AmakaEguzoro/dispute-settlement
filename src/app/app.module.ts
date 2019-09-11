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
import { EncrDecrService } from 'app/service/encr-decr.service';
import { RequestInterceptorService } from './service/requset-interceptor.service';

import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { AuthGuard } from './_auth/auth.guard';
import { HttpInterceptorProvider } from './_auth/errorInterceptor';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';



import { OrderModule } from 'ngx-order-pipe';
import { TransactionComponent } from './Transaction/transaction/transaction.component';
import { TransactionCardComponent } from './Transaction/transaction-card/transaction-card.component';
import { ModelComponent } from './Transaction/model/model.component';
import { PaginationModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './service/socket.service';
import { FiltersComponent } from './Transaction/filters/filters.component';
 
const config: SocketIoConfig = { url: 'http://197.253.19.76:8002', options: { query: { "token": "59fj9439ewdi93" }} };

@NgModule({
  declarations: [
    AppComponent,
    //itex
    TransactionComponent,
    TransactionCardComponent,
    ModelComponent,
    FiltersComponent
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
    SharedModule,
    ViewsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // Itex
    OrderModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config)
  ],
  //itex
  entryComponents: [ ModelComponent ],
  
  providers: [
    MDBSpinningPreloader,
    AsdevApiService,
    // AngularFirestore,
    // AngularFireStorage,
    // EncrDecrService,
    //itex
     HttpInterceptorProvider,
    AuthGuard,
    SocketService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
