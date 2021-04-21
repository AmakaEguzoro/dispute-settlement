import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { FooterComponent } from '../footer/footer.component';
import { DirectiveModule } from 'app/directive.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToggleNavComponent } from './toggle-nav/toggle-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
    DirectiveModule
  ],
  declarations: [
    NavigationComponent,
    NavbarComponent,
    FooterComponent,
    SideNavComponent,
    ToggleNavComponent,
    // HasRoleDirective
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    NavbarComponent,
    SideNavComponent,
    ToggleNavComponent,

    // HasRoleDirective
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class NavigationModule {

}
