import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('receving yur request',request.clone())
    try {
      const token = localStorage.getItem('token');
      if (token) {
        if (token) {
          const clonedReq = request.clone({
            headers: request.headers.set(
              'Authorization', `Bearer ${token}`
            )
          })

          return next.handle(clonedReq);
        }

      }
    } catch (e) {
      console.log(e)
    }
    return next.handle(request);
  }
}
