import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../services/bills.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { DialogConfirmService } from 'src/app/shared/components/services/dialog-confirm.service';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class BillViewComponent {
  clickedRecieved: boolean = false
  clickedDue: boolean = false
  clickedPayment: boolean = false
  billId: any
  loader: boolean = false
  billData: any
  addDueDate: boolean = false
  addPayment: boolean = false
  createDueDate: FormGroup;
  addPaymentForm: FormGroup;
  accountList: any = []
  addAccount: boolean = false
  constructor(private route: ActivatedRoute,
    private web: BillsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: DialogConfirmService) {

  }


  async ngOnInit() {
    this.route.params.subscribe(async params => {
      console.log('params: ', params);
      this.billId = params['id'];
      if (this.billId) {
        this.getBillUsingId()
      }

    });

    this.createDueDate = this.fb.group({
      dueDate: ['', Validators.required],
    })
    this.addPaymentForm = this.fb.group({
      amount: [null, Validators.required],
      method: ['Cash', Validators.required],
      date: ['', Validators.required],
      account: ['', Validators.required],
    })
  }

  getBillUsingId() {
    this.loader = true
    this.web.getBillUsingId(this.billId).subscribe({
      next: (res) => {
        this.billData = res['bill'];
        this.addPaymentForm.controls['amount'].patchValue(this.billData?.remainingAmount);
        console.log('this.billData: ', this.billData);
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
        console.log('Observable completed');
        this.getAllAccounts()
      }
    });
  }

  getAllAccounts() {
    this.loader = true
    this.web.getAllAccounts().subscribe({
      next: (res) => {
        this.accountList = res;
        console.log('this.accountList: ', this.accountList);
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
        console.log('Observable completed');
      }
    });
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('printTemplate');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  openAddDueDate(){
    this.createDueDate.controls['dueDate'].patchValue(this.billData?.billDate);
    this.addDueDate = true
  }
  openAddPayment(){
    this.addPaymentForm.controls['date'].patchValue(this.billData?.billDate);
    this.addPayment = true
  }

  async addBillDueDate() {
    let payload = {
      "dueDate": this.createDueDate.value.dueDate
    }
    try {
      const result$ = await this.web.addBillDueDate(payload, this.billId)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.addDueDate = false
        this.getBillUsingId()
        this.createDueDate.reset();
        this.toastr.success("Bill Due Date successfully Added!");

      }
    } catch (error) {
      this.clickedDue = false
      console.log(error);
      this.toastr.error(error.error.message);
      

    }

  }

  openMarkBillRecieved(){
    this.dialog
    .confirmDialog({
      title: 'Receive Bill?',
      message: 'Do you want to Receive Bill?',
      confirmCaption: 'Confirm',
      cancelCaption: 'Cancel',
    })
    .subscribe((confirmed) => {
      if (confirmed) {
        this.markBillRecieved()
      }
      else{
        this.clickedRecieved = false
      }
    });
  }

  async markBillRecieved() {
    try {
      const result$ = await this.web.markBillRecieved(this.billId)
      const res = await lastValueFrom(result$);
      if (res) {
        this.getBillUsingId()
        this.toastr.success("Bill Recieved!");

      }
    } catch (error) {
      console.log(error);
      this.clickedRecieved = false
      this.toastr.error(error.error.message);

    }

  }

  async addBillPayment() {
    let payload = {

      "billId": this.billId,
      "payment": {
        "amount": this.addPaymentForm.value.amount,
        "method": this.addPaymentForm.value.method,
        "date": this.addPaymentForm.value.date,
      },
      "account": this.addPaymentForm.value.account,

    }
    try {
      const result$ = await this.web.addPayment(this.billId, payload)
      const res = await lastValueFrom(result$);
      if (res) {
        this.addPaymentForm.reset();
        this.addPayment = false
        this.clickedPayment = false
        this.ngOnInit()

        this.toastr.success("Payment Added Successfully!");

      }
    } catch (error) {
      this.clickedPayment = false
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }


}
