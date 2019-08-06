import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
   	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
					}
				},
				error => {
					console.error(error.status);
					console.error(error.message);
				}
			)
		);
	}
}

export const HttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: httpInterceptor,
    multi: true
}

	// intercept request and add token
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
// 				}
// 			)
// 		);
// 	}