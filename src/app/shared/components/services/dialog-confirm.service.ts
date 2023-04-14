import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ConfirmDialogData } from '../dialog-confirm/dialog-confirm-model/confirm-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(DialogConfirmComponent, {
        data,
        disableClose: true,
        panelClass: "confirmDialog",
      })
      .afterClosed();
  }
}
