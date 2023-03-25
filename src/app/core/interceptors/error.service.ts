import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    checkOnline()
    {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
    }

    getClientMessage(error: Error): string {
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        var msg = error.error.Message;
        if (!!msg)
            return msg + " : " + error.error.ExceptionMessage;
        return "Application can not execute because API hasn\'t been started";
    }

    getServerStack(error: HttpErrorResponse): string {
        return error.error.StackTrace;
    }
}