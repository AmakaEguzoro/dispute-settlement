import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { CalendarModule } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from '../main-layout/footer/footer.component';
import { TypographyComponent } from './css/typography/typography.component';
import { IconsComponent } from './css/icons/icons.component';
import { Map1Component } from './maps/map1/map1.component';
import { Map2Component } from './maps/map2/map2.component';
import { LoginComponent } from '../_auth/login/login.component';
import { Form2Component } from './forms/form2/form2.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboards/dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboards/dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboards/dashboard4/dashboard4.component';
import { Dashboard5Component } from './dashboards/dashboard5/dashboard5.component';
import { GridComponent } from './css/grid/grid.component';
import { MediaObjectComponent } from './css/media-object/media-object.component';
import { UtilitiesComponent } from './css/utilities/utilities.component';
import { ColorsComponent } from './css/colors/colors.component';
import { ShadowComponent } from './css/shadow/shadow.component';
import { Map3Component } from './maps/map3/map3.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
// MDB Angular Pro
import { MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { RoleManagerComponent } from './admins/role-manager/role-manager.component';
// import { ErrordialogComponent } from '../views/errordialog/errordialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k'
    }),
    CalendarModule.forRoot(),
    CKEditorModule,
    MDBBootstrapModulesPro.forRoot()
    // ErrordialogComponent
  ],
  declarations: [
    FooterComponent,
    TypographyComponent,
    IconsComponent,
    Map1Component,
    Map2Component,
    Form2Component,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard5Component,
    GridComponent,
    MediaObjectComponent,
    UtilitiesComponent,
    ColorsComponent,
    ShadowComponent,
    Map3Component,
    EventCalendarComponent,
    RoleManagerComponent,
    // ErrordialogComponent,
    //  Itex
  
  ],
  exports: [
    FooterComponent,
    TypographyComponent,
    IconsComponent,
    Map1Component,
    Map2Component,
    Map3Component,
    Form2Component,
    StatsCardComponent,
    StatsCard2Component,    
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard5Component,
    GridComponent,
    MediaObjectComponent,
    UtilitiesComponent,
    ColorsComponent,
    ShadowComponent,
    RoleManagerComponent,
    // ErrordialogComponent
   // Itex
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
