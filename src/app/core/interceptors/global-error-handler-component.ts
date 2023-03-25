import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler
{
    constructor(private injector: Injector, public snackBar: MatSnackBar) { }

    handleError(error: Error | HttpErrorResponse)
    {
        const errorService = this.injector.get(ErrorService);
        let message;
        let stackTrace = errorService.getClientStack(error);

        if (error instanceof HttpErrorResponse) // Server Error
            message = errorService.getServerMessage(error);
        else // Client Error
            message = errorService.getClientMessage(error);

        this.snackBar.open(message, 'X', { panelClass: ['error'] });
    }
}