import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                localStorage.clear();
                this.router.navigateByUrl('auth')

            }
            console.log(err);
            this.toastr.error(err.error.message);

            console.log(err?.error?.errors?.message);
            if (err?.error?.errors?.message){
                
                  console.log(err?.error?.errors?.message);
                  
            }
           
            return throwError(() => err?.error?.errors?.message);
        }))
    }
}