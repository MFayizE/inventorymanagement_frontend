import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../services/bills.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss']
})
export class BillViewComponent {
  billId: any 
  loader: boolean = false
  billData: any 
  constructor(private route: ActivatedRoute, 
    private web: BillsService, 
    private toastr: ToastrService) {

  }


  async ngOnInit() {
    this.route.params.subscribe(async params => {
      console.log('params: ', params);
      this.billId = params['id'];
      if (this.billId) {
        this.getBillUsingId()
      }

    });
  }

  getBillUsingId(){
    this.loader = true
    this.web.getBillUsingId(this.billId).subscribe({
      next: (res) => {
        this.billData = res['bill'];
        console.log('this.billData: ', this.billData);
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
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

}
