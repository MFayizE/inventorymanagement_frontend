import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inventory-creating',
  templateUrl: './inventory-creating.component.html',
  styleUrls: ['./inventory-creating.component.scss']
})

export class InventoryCreatingComponent implements OnInit {
  createProductForm: FormGroup;
  createCategory: FormGroup;
  existName: boolean = false
  existSKU: boolean = false
  productCategory: any = []
  loader: boolean = false
  addCategory: boolean = false
  clicked: boolean = false
  constructor(private fb: FormBuilder, private web: InventoryService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      SKU: ['', Validators.required],
      description: [''],
      salePrice: [null, Validators.required],
      purchasePrice: [null, Validators.required],
      quantity: [null, Validators.required],
      enabled: [true, Validators.required],
      enableBill: [true, Validators.required],
      category: ['', Validators.required],
    })
    this.createCategory = this.fb.group({
      categoryName: ['', Validators.required],
    })

    this.getAllProductCategory()
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
      }
    });
  }
    //   (res) => {
    //     console.log(res);
    //     this.productCategory = res
    //     this.loader = false

    //   },
    //   (error) => { }
    // );

  


  async checkNameExistOrNot() {
    const result$ = await this.web.checkProductByName(this.createProductForm.value?.name)
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
    const result$ = await this.web.checkProductBySKU(this.createProductForm.value?.SKU)
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
    let payload = {
      "name" : this.createCategory.value.categoryName
    }
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
 

  async createProduct() {
    let payload = {
      "name": this.createProductForm.value.name,
      "SKU": this.createProductForm.value.SKU,
      "description": this.createProductForm.value.description,
      "salePrice": this.createProductForm.value.salePrice,
      "purchasePrice": this.createProductForm.value.purchasePrice,
      "quantity": this.createProductForm.value.quantity,
      "enabled": this.createProductForm.value.enabled,
      "enableBill": this.createProductForm.value.enableBill,
      "category": this.createProductForm.value.category
    }
    console.log(payload);
    try {
      const result$ = await this.web.createProduct(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        this.toastr.success("Product successfully created!");
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
