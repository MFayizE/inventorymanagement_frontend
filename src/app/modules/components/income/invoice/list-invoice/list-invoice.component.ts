import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IncomeService } from '../../income.service';
@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit{
  search = ''
  loader: boolean = false
  page : number = 1 
  limit: number = 25
  isLastPage: boolean
  totalInvoice : number
  maxPage: number
  invoiceList : any = []
  pageLimitMessage: string
  sortOrder: string = 'asc'
  sortBy: string
  isInvalidPage:boolean = false
  totalIncome:number
  constructor(private web: IncomeService) { }

  ngOnInit(): void {
    this.getTotalInvoiceIncome()
  }

  getAllInvoice(){
    this.loader = true
    this.web.getAllInvoiceList(this.page,this.limit,this.search,this.sortBy,this.sortOrder).subscribe({
      next: (res) => {
        this.invoiceList = res["invoices"];
        this.isLastPage = res["isLastPage"]
        this.maxPage = res["maxPage"]
        this.totalInvoice = res['count']
        this.pageLimitMessage = res['message']
        console.log(this.invoiceList);
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
      this.getAllInvoice()
    }
    if(data == 'next'){
      this.page  = this.page + 1
      this.getAllInvoice()

    }

  }

  getPage(newPage){
    this.page = newPage
    this.getAllInvoice()


  }
  sortData(sort){
    this.page = 1
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if(sort == 'invoiceNumber'){
      this.sortBy = 'invoiceNumber'
    }
    if(sort == 'totalAmount'){
      this.sortBy = 'totalAmount'
    }
    if(sort == 'invoiceDate'){
      this.sortBy = 'invoiceDate'
    }
    if(sort == 'dueDate'){
      this.sortBy = 'dueDate'
    }
    if(sort == 'status'){
      this.sortBy = 'status'
    }
    this.getAllInvoice()
  }

  async searchInvoice() {
    this.page = 1
    this.getAllInvoice()
  }

  async getTotalInvoiceIncome(){
    this.loader = true
    try {
      const result$ = await this.web.getTotalInvoiceIncome()
      const res = await lastValueFrom(result$);
      if (res) {
        this.totalIncome = res['totalAmount']
        this.getAllInvoice()
      }
    } catch (error) {
      console.log(error);
    }
  }

  onEnterPressed(data) {
    let currentPage = data.target.value
    console.log('this.maxPage: ', this.maxPage);

    this.isInvalidPage = currentPage > this.maxPage;
    if(!this.isInvalidPage){
      this.page = currentPage
      this.getAllInvoice()
    }
    
  }
}
