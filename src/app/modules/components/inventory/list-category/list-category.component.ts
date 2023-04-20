import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
}) 
export class ListCategoryComponent implements OnInit {
  loader:boolean = false
  page: number = 1
  limit: number = 25
  isLastPage: boolean = false
  maxPage: number
  categoryList: any =[]
  search = ''
  totalCategory: number
  updateCategory: boolean = false
  editCategory: FormGroup;
  addCategory: boolean = false
  createCategory: FormGroup;
  constructor(private web: InventoryService,private fb: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCategory()
    this.editCategory = this.fb.group({
      categoryName: ['', Validators.required],
      categoryID: ['', Validators.required],
    })
    this.createCategory = this.fb.group({
      categoryName: ['', Validators.required],
    })
  }
  
  getAllCategory() {
    this.loader = true
    this.web.getAllCategoryList(this.page,this.limit,this.search).subscribe({
      next: (res) => {
        this.categoryList = res["categories"];
        this.isLastPage = res["isLastPage"]
        this.maxPage = res["totalPages"]
        this.totalCategory = res['count']
        console.log(this.totalCategory);
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
    this.getAllCategory()
  }

  pagination(data){
    if(data == 'prev'){
      this.page  = this.page - 1
      this.getAllCategory()
    }
    if(data == 'next'){
      this.page  = this.page + 1
      this.getAllCategory()

    }

  }

  async editProductCategory(){
    let payload = {
      "name" : this.editCategory.value.categoryName
    }
    try {
      const result$ = await this.web.updateProductCategory(this.editCategory.value.categoryID,payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.updateCategory = false
        this.getAllCategory()
        this.toastr.success("Product Category successfully updated!");

      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }

  closeEditCategory(){
    this.editCategory.controls['categoryName'].patchValue('');
    this.editCategory.controls['categoryID'].patchValue('');

    this.updateCategory = false
  }

  
  openEditCategory(data){
    console.log('data: ', data);
    this.editCategory.controls['categoryName'].patchValue(data?.name);
    this.editCategory.controls['categoryID'].patchValue(data?._id);
    console.log('editCategory: ', this.editCategory);

    this.updateCategory = true
  }

  async createProductCategory(){
    let payload = {
      "name" : this.createCategory.value.categoryName
    }
    try {
      const result$ = await this.web.createProductCategory(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.addCategory = false
        this.createCategory.reset();
        this.getAllCategory()
        this.toastr.success("Product Category successfully created!");
      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }

}
