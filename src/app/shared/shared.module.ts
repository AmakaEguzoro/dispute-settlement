
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThousandSuffixesPipe } from 'app/shared/pipe/ThousandSuffixesPipe';
import { ToNumberPipe } from 'app/shared/pipe/ToNumberPipe';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoundPipe } from './pipe/toRound';
import { HasRoleDirective } from '../main-layout/navigation/directives/has-role.directive';
import { FilterPipe } from './pipe/filter';
import { TabsComponent } from './tabs/tabs.component';
import { GroupByPipe } from './pipe/groupBy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    OrderModule,
    // GroupByPipe
  ],
  declarations: [
    NotFoundComponent,
    ThousandSuffixesPipe,
    ToNumberPipe,
    GroupByPipe,
    RoundPipe,
    FilterPipe,
    TabsComponent,
  ],
  exports: [
    NotFoundComponent,
    ThousandSuffixesPipe,
    ToNumberPipe,
    RoundPipe,
    FilterPipe,
    GroupByPipe,
    TabsComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
