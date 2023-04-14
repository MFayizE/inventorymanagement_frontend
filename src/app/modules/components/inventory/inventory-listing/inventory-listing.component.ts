import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(private web: InventoryService) { }

  ngOnInit(): void {
    this.getAllProduct()
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


  getAllProduct() {
    this.loader = true
    this.web.getAllProduct(this.page,this.limit,this.search).subscribe({
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
}
