import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from 'app/_models/user';
import { Constants } from 'common/constants';
import { StorageService } from 'app/service/storage.service';

@Injectable()
// export class httpInterceptor implements HttpInterceptor {
//    	// intercept request and add token
// 	intercept(
// 		request: HttpRequest<any>,
// 		next: HttpHandler
// 	): Observable<HttpEvent<any>> {

// 		return next.handle(request).pipe(
// 			tap(
// 				event => {
// 					 if (event instanceof HttpResponse) {
// 					}
// 				},
// 				error => {
// 					console.error(error.status);
// 					console.error(error.message);

//	}
// 			
//)
// 		);
// 	}
// }


@Injectable()
export class httpInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(
        private storageService: StorageService,) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: User = this.storageService.get<User>(Constants.STORAGE_VARIABLES.TOKEN);

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }



        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
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
                return throwError(error);
            }));
    }
}

export const HttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: httpInterceptor,
    multi: true
}