import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-bill-listing',
  templateUrl: './bill-listing.component.html',
  styleUrls: ['./bill-listing.component.scss']
})
export class BillListingComponent implements OnInit {
  search = ''
  loader: boolean = false
  page : number = 1 
  limit: number = 25
  isLastPage: boolean
  totalBill : number
  maxPage: number
  billList : any = []
  pageLimitMessage: string
  sortOrder: string = 'asc'
  sortBy: string
  totalExpense:number
  
  constructor(private web: BillsService) { }

  ngOnInit(): void {
    this.getAllBill()
    this.getTotalExpense()
  }

  getAllBill(){
    this.loader = true
    this.web.getAllBillList(this.page,this.limit,this.search,this.sortBy,this.sortOrder).subscribe({
      next: (res) => {
        this.billList = res["bills"];
        this.isLastPage = res["isLastPage"]
        this.maxPage = res["maxPage"]
        this.totalBill = res['count']
        this.pageLimitMessage = res['message']
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

  getPage(newPage){
    this.page = newPage
    this.getAllBill()

  }
  sortData(sort){
    this.page = 1
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if(sort == 'billNumber'){
      this.sortBy = 'billNumber'
    }
    if(sort == 'totalAmount'){
      this.sortBy = 'totalAmount'
    }
    if(sort == 'billDate'){
      this.sortBy = 'billDate'
    }
    if(sort == 'dueDate'){
      this.sortBy = 'dueDate'
    }
    if(sort == 'status'){
      this.sortBy = 'status'
    }
    this.getAllBill()
  }

  async searchBill() {
    this.page = 1
    this.getAllBill()
  }

  async getTotalExpense(){
    try {
      const result$ = await this.web.getTotalBillExpense()
      const res = await lastValueFrom(result$);
      if (res) {
        this.totalExpense = res['totalAmount']
      }
    } catch (error) {
      console.log(error);
    }
  }

}
