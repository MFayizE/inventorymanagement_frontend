import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-bill-listing',
  templateUrl: './bill-listing.component.html',
  styleUrls: ['./bill-listing.component.scss']
})
export class BillListingComponent implements OnInit {
  loader: boolean = false
  page : number = 1 
  limit: number = 25
  isLastPage: boolean
  totalBill : number
  maxPage: number
  billList : any = []
  constructor(private web: BillsService) { }

  ngOnInit(): void {
    this.getAllBill()
  }

  getAllBill(){
    this.loader = true
    this.web.getAllBillList(this.page,this.limit).subscribe({
      next: (res) => {
        this.billList = res["bills"];
        this.isLastPage = res["isLastPage"]
        this.maxPage = res["maxPage"]
        this.totalBill = res['count']
        console.log(this.billList);
        console.log(this.maxPage);

        this.loader = false;
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

  pagination(data){
    if(data == 'prev'){
      this.page  = this.page - 1
      this.getAllBill()
    }
    if(data == 'next'){
      this.page  = this.page + 1
      this.getAllBill()

    }

  }


}
