import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from '../services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
  editProductForm: FormGroup;
  createCategory: FormGroup;
  existName: boolean = false
  existSKU: boolean = false
  productCategory: any = []
  loader: boolean = false
  addCategory: boolean = false
  clicked: boolean = false
  productData: any
  productId: any 
  constructor(private fb: FormBuilder, private web: InventoryService,private toastr: ToastrService,private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.createCategory = this.fb.group({
      categoryName: ['', Validators.required],
    })
    this.route.params.subscribe(async params => {
      console.log('params: ', params);
      this.productId = params['id'];
      if (this.productId) {
        this.getDetails()
      }
    });
    this.editProductForm = this.fb.group({
      name: [this.productData.name, Validators.required],
      SKU: ['', Validators.required],
      description: [''],
      salePrice: [null, Validators.required],
      purchasePrice: [null, Validators.required],
      quantity: [null, Validators.required],
      enabled: [true, Validators.required],
      enableBill: [true, Validators.required],
      category: ['', Validators.required],
    })
    

   
  }


  getDetails(){
    this.loader = true
    this.web.getProductByID(this.productId).subscribe({
      next: (res) => {
        this.productData = res['product'];
        console.log(this.productData);
        
        this.loader = false;
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
        console.log('Observable completed');
        this.getAllProductCategory()
      }
    });
  }

  getAllProductCategory() {
    this.loader = true
    this.web.getAllProductCategory().subscribe({
      next: (res) => {
        this.productCategory = res;
        console.log(this.productCategory);
        
        this.loader = false;
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
        console.log('Observable completed');
        this.editProductForm = this.fb.group({
          name: [this.productData?.name, Validators.required],
          SKU: [this.productData?.SKU, Validators.required],
          description: [this.productData?.description],
          salePrice: [this.productData?.salePrice, Validators.required],
          purchasePrice: [this.productData?.purchasePrice, Validators.required],
          quantity: [this.productData?.quantity, Validators.required],
          enabled: [this.productData?.enabled, Validators.required],
          enableBill: [this.productData?.enableBill, Validators.required],
          category: [this.productData?.categoryId, Validators.required],
        })
      }
    });
  }


  async checkNameExistOrNot() {
    const result$ = await this.web.checkProductByName(this.editProductForm.value?.name)
    const res = await lastValueFrom(result$);
    console.log(res);
    if (res['exists']) {
      this.existName = true
    }
    else {
      this.existName = false
    }
  }

  async checkSKUExistOrNot() {
    const result$ = await this.web.checkProductBySKU(this.editProductForm.value?.SKU)
    const res = await lastValueFrom(result$);
    console.log(res);
    if (res['exists']) {
      this.existSKU = true
    }
    else {
      this.existSKU = false
    }
  }


  openAddCategory(){
    this.addCategory = true
  }
  closeAddCategory(){
    this.addCategory = false
  }

  async createProductCategory(){
    console.log('this.createCategory.value.categoryName: ', this.createCategory.value.categoryName);

    let payload = {
      "name" : this.createCategory.value.categoryName
    }
    console.log('payload: ', payload);

    try {
      const result$ = await this.web.createProductCategory(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.addCategory = false
        this.getAllProductCategory()
        this.createCategory.reset();
        this.toastr.success("Product Category successfully created!");

      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }
 

  async editProduct() {
    let payload = {
      "name": this.editProductForm.value.name,
      "SKU": this.editProductForm.value.SKU,
      "description": this.editProductForm.value.description,
      "salePrice": this.editProductForm.value.salePrice,
      "purchasePrice": this.editProductForm.value.purchasePrice,
      "quantity": this.editProductForm.value.quantity,
      "enabled": this.editProductForm.value.enabled,
      "enableBill": this.editProductForm.value.enableBill,
      "category": this.editProductForm.value.category
    }
    console.log(payload);
    console.log('this.productId: ', this.productId);
    try {
      const result$ = await this.web.updateProduct(this.productId,payload)
      const res = await lastValueFrom(result$);
      if (res) {
        this.toastr.success("Product successfully updated!");
        console.log(res);
        this.ngOnInit()

      }
    } catch (error) {
      console.log(error);
      this.clicked=false

      this.toastr.error(error.error.message);

    }

  }

}
