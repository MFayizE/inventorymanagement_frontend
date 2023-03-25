import { ErrorHandler, Injectable } from "@angular/core";
@Injectable()
export class GlobalErrorHandler1 implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      if (confirm("New version available. Load New Version?")) {
        window.location.reload();
      }
    }
  }
}
