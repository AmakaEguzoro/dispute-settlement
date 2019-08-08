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

import { ErrorModule } from './views/errors/error.module';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';

import { AsdevApiService } from './providers/asdev-api.service';

//encrption decryption service
import { EncrDecrService } from 'app/service/encr-decr.service';
import { RequestInterceptorService } from './service/requset-interceptor.service';

import { MatDialogModule } from '@angular/material';
import { ErrordialogComponent } from './views/errordialog/errordialog.component';
import { AuthGuard } from './_auth/auth.guard';
import { HttpInterceptorProvider } from './_auth/errorInterceptor';




@NgModule({
  declarations: [
    AppComponent,
    ErrordialogComponent
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
    ErrorModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [
    ErrordialogComponent,
  ],
  providers: [
    MDBSpinningPreloader,
    AsdevApiService,
    // AngularFirestore,
    // AngularFireStorage,
    // EncrDecrService,
    ErrordialogComponent,
    // { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
    HttpInterceptorProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
