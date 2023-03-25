import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../services/bills.service';

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

}
