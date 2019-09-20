import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HttpInterceptorProvider } from "./errorInterceptor";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    exports: [
        // LoginComponent,
        // RegisterComponent,
    ],
    providers: [
        HttpInterceptorProvider,
        AuthGuard,
        AuthService,
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }