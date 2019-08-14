import { ModalComponent } from './components/modal/modal.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alerts/alert/alert.component';
import { CascadingPanelComponent } from './components/cascading-panel/cascading-panel.component';
import { CascadingCardComponent } from './components/cascading-card/cascading-card.component';
import { OverlayCardComponent } from './components/overlay-card/overlay-card.component';
import { PanelComponent } from './components/panel/panel.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './components/notification/notification.service';
import { TodayCardComponent } from './dashboard-cards/daily-cards/today-card/today-card.component';
import { YesterdayCardComponent } from './dashboard-cards/daily-cards/yesterday-card/yesterday-card.component';
import { ThisMonthCardComponent } from './dashboard-cards/monthly-cards/this-month-card/this-month-card.component';
import { LastMonthCardComponent } from './dashboard-cards/monthly-cards/last-month-card/last-month-card.component';
import { LastWeekCardComponent } from './dashboard-cards/weekly-cards/last-week-card/last-week-card.component';
import { ThisWeekCardComponent } from './dashboard-cards/weekly-cards/this-week-card/this-week-card.component';
import { ThisYearCardComponent } from './dashboard-cards/yearly-cards/this-year-card/this-year-card.component';
import { LastYearCardComponent } from './dashboard-cards/yearly-cards/last-year-card/last-year-card.component';
import { SummaryService } from 'app/service/summary.service';
import { ThousandSuffixesPipe } from 'app/service/ThousandSuffixesPipe';
import { ChartService } from 'app/service/chart.service';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  declarations: [
    AlertComponent,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    NotificationComponent,
    // Itex Copmponent
    TodayCardComponent,
    YesterdayCardComponent,
    ThisMonthCardComponent,
    LastMonthCardComponent,
    LastWeekCardComponent,
    ThisWeekCardComponent,
    ThisYearCardComponent,
    LastYearCardComponent,

    ThousandSuffixesPipe
  ],
  exports: [
    MDBBootstrapModulesPro,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    NotificationComponent,
    AlertComponent,
    // Itex Copmponent
    TodayCardComponent,
    YesterdayCardComponent,
    ThisMonthCardComponent,
    LastMonthCardComponent,
    LastWeekCardComponent,
    ThisWeekCardComponent,
    ThisYearCardComponent,
    LastYearCardComponent,

    ThousandSuffixesPipe
  ],
  providers: [
    // NotificationService,
    // itex
    SummaryService,
    ChartService
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
