import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-inventory-listing',
  templateUrl: './inventory-listing.component.html',
  styleUrls: ['./inventory-listing.component.scss']
})
export class InventoryListingComponent implements OnInit {

  loader:boolean = false
  page: number = 1
  limit: number = 25
  isLastPage: boolean = false
  maxPage: number
  productList: any =[]
  search = ''
  totalProduct: number
  sortOrder: string = 'asc'
  sortBy: string
  // sortForm: FormGroup;
  constructor(private web: InventoryService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllProduct()
    // this.sortForm = this.fb.group({
    //   name: ['', Validators.required],
    //   SKU: ['', Validators.required],
    //   categoryId : ['', Validators.required],

    // })
  }

  onClickPage(data){
    this.page = data
    this.getAllProduct()
  }

  pagination(data){
    if(data == 'prev'){
      this.page  = this.page - 1
      this.getAllProduct()
    }
    if(data == 'next'){
      this.page  = this.page + 1
      this.getAllProduct()

    }

  }
  
  sortData(sort){
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    if(sort == 'name'){
      this.sortBy = 'name'
    }
    if(sort == 'SKU'){
      this.sortBy = 'SKU'
    }
    if(sort == 'enableBill'){
      this.sortBy = 'enableBill'
    }
    if(sort == 'enabled'){
      this.sortBy = 'enabled'
    }
    if(sort == 'purchasePrice'){
      this.sortBy = 'purchasePrice'
    }
    if(sort == 'quantity'){
      this.sortBy = 'quantity'
    }
    if(sort == 'salePrice'){
      this.sortBy = 'salePrice'
    }
    this.getAllProduct()
  }

  getAllProduct() {
    this.loader = true
    this.web.getAllProduct(this.page,this.limit,this.search,this.sortBy,this.sortOrder).subscribe({
      next: (res) => {
        this.productList = res["products"];
        this.isLastPage = res["isLastPage"]
        this.maxPage = res["maxPage"]
        this.totalProduct = res['count']
        console.log(this.productList);
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

  

  async searchProduct() {
    this.page = 1
    this.getAllProduct()
  }

  getPage(newPage){
    this.page = newPage
    this.getAllProduct()

  }
}
