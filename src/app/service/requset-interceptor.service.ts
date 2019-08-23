import { Injectable, Injector } from "@angular/core";
import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent,
    HttpEvent
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, finalize, switchMap, take, map } from "rxjs/operators";
import { from } from "rxjs/observable/from";
import { EncrDecrService } from "./encr-decr.service";
import { Constants } from "common/constants";
import { LoginResponseModel } from "model/response/auth.model";
import { StorageService } from "./storage.service";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: LoginResponseModel = this.storageService.get<LoginResponseModel>(Constants.STORAGE_VARIABLES.TOKEN);

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.access_token) });
        }



        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                //this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}
