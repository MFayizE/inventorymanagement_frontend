import { BillsService } from './../services/bills.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, lastValueFrom, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AddVendorComponent } from '../../vendors/add-vendor/add-vendor.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-bill-adding',
  templateUrl: './bill-adding.component.html',
  styleUrls: ['./bill-adding.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class BillAddingComponent implements OnInit {
  loader: boolean = false
  createBillForm: FormGroup;
  subTotal: number
  taxAmount: number
  totalAmount: number
  productList: any = []
  billCategory: any = []
  vendorsList: any = []
  addCategory: boolean = false
  createCategory: FormGroup;
  clicked: boolean = false
  addVendor: boolean = false

  constructor(private fb: FormBuilder, private web: BillsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createBillForm = this.fb.group({
      // items: this.fb.array([]),
      items: this.fb.array([
        this.initItem(),
      ]),
      categoryId: ['', Validators.required],
      vendorId: ['', Validators.required],
      billDate: ['', Validators.required],
      billNumber: ['', Validators.required],

    });
    this.createCategory = this.fb.group({
      categoryName: ['', Validators.required],
    })
    // this.addItem()
    this.getAllProduct()


  }

  initItem() {
    return this.fb.group({
      product: [''],
      quantity: [1],
      price: [0.00],
      taxPercentage: [0],
      total: [0],
      taxAmount: [0]
    });
  }

  // get items(): FormArray {
  //   return this.createBillForm.get('items') as FormArray;
  // }

  // search = (text$: Observable<string>) =>
  // text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   map(term => term.length < 3 ? []
  //     : this.productList.filter(product => product.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
  // );
  addItem(): void {
    const control = <FormArray>this.createBillForm.get('items');
    control.push(this.initItem());
    // this.items.push(this.fb.group({
    //   product: [''],
    //   quantity: [1],
    //   price: [0.00],
    //   tax: [0],
    //   total: [0],
    //   taxAmount: [0]
    // }));
  }
  removeItem(index: number): void {
    const control = <FormArray>this.createBillForm.get('items');
    control.removeAt(index);
  }

  getAllBillCategory() {
    this.loader = true
    this.web.getAllBillCategory().subscribe({
      next: (res) => {
        this.billCategory = res;
        console.log(this.billCategory);
        this.getAllVendors()
        // this.loader = false;

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


  getAllVendors() {
    this.loader = true
    this.web.getAllVendors().subscribe({
      next: (res) => {
        this.vendorsList = res;
        console.log(this.vendorsList);

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

  calculateTotal(index: number): void {
    const items = this.createBillForm.get('items') as FormArray;
    const item = items.at(index) as FormGroup | null;
    if (!item) {
      return; // exit early if item is null or undefined
    }
    const quantity = item.get('quantity').value;
    const price = item.get('price').value;
    const taxPercentage = item.get('taxPercentage').value;
    const total = quantity * price;
    item.get('total').patchValue(total);
    this.subTotal = items.controls.reduce((acc, curr) => acc + curr.get('total').value, 0);
    this.taxAmount = items.controls.reduce((acc, curr) => acc + ((curr.get('total').value * curr.get('taxPercentage').value) / 100), 0);
    this.totalAmount = this.subTotal + this.taxAmount;
    const taxAmount = (total * taxPercentage) / 100;
    item.controls.taxAmount.setValue(Number(taxAmount.toFixed(2)))
    item.controls.tax.setValue(+item.controls.tax.value);
  }


  async createBillCategory() {
    let payload = {
      "name": this.createCategory.value.categoryName
    }
    try {
      const result$ = await this.web.createBillCategory(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.addCategory = false
        this.getAllBillCategory()
        this.createCategory.reset();
        this.toastr.success("Bill Category successfully created!");

      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }

  // calculateTotalAmount(index: number) {
  //   const item = (this.createBillForm.controls.items as FormArray).at(index) as FormGroup;
  //   // const item = this.items.controls[index];
  //   const quantity = item.get('quantity').value;
  //   const price = item.get('price').value;
  //   const taxPercentage = item.get('tax').value;
  //   const total = quantity * price;
  //   const taxAmount = (total * taxPercentage) / 100; // calculate tax amount
  //   const grandTotal = total + taxAmount;

  //   item.controls.total.setValue(total.toFixed(2));
  //   item.controls.taxAmount.setValue(taxAmount.toFixed(2)); // update tax amount field
  //   item.controls.grandTotal.setValue(grandTotal.toFixed(2));

  //   this.calculateBillTotal();
  // }


  onSubmit() {
    console.log(this.createBillForm.value);
  }

  getAllProduct() {
    this.loader = true
    this.web.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res;
        console.log('this.productList: ', this.productList);

        // this.loader = false;
        this.getAllBillCategory()
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

  searchProducts(term: string) {
    return of(this.productList.filter(product => product.name.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }

  async createBill() {

    let payload = {

      "vendorId": this.createBillForm.value.vendorId,
      "billDate": this.createBillForm.value.billDate,
      "billNumber": this.createBillForm.value.billNumber,
      "items": this.createBillForm.value.items,
      "categoryId": this.createBillForm.value.categoryId

    }
    console.log('payload: ', payload);


    try {
      const result$ = await this.web.createBill(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createBillForm.reset();
        this.toastr.success("Bill successfully saved!");

      }
    } catch (error) {
      this.clicked = false
      console.log(error);
      this.toastr.error(error.error.message);

    }



  }

}
