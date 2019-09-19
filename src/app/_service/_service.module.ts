import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AsdevApiService } from "app/providers/asdev-api.service";
import { HttpInterceptorProvider } from "app/_auth/errorInterceptor";
import { AuthGuard } from "app/_auth/auth.guard";
import { SocketService } from "./socket.service";
import { SummaryService } from "./summary.service";
import { ChannelService } from "./channels.service";
import { ProductsService } from "./products.service";
import { PaymentMethodService } from "./payment-method.service";
import { TransactionService } from "./transaction.service";
import { BvnLoginService } from "./bvn-login.service";
import { BvnService } from "./bvn.service";
import { ElementService } from "./element.service";
import { SwitchService } from "./switch.service";

@NgModule({
    imports: [
     
    ],
    declarations: [
    ],
    exports: [
    
    ],
    providers: [
        // AsdevApiService,
        // SummaryService,
        // ChannelService,
        // ProductsService,
        // PaymentMethodService,
        // TransactionService,
        // BvnLoginService,
        // BvnService,
        // SocketService,
        // ElementService,
        // SwitchService,
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
  })
  export class ServiceModule { }