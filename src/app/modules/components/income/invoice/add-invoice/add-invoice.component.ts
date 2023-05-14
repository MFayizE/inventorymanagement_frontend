import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, lastValueFrom, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { IncomeService } from '../../income.service';

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
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddInvoiceComponent implements OnInit{
  loader: boolean = false
  createInvoiceForm: FormGroup;
  subTotal: number
  taxAmount: number
  totalAmount: number
  productList: any = []
  invoiceCategory: any = []
  customersList: any = []
  addCategory: boolean = false
  createCategory: FormGroup;
  clicked: boolean = false
  addCustomer: boolean = false

  constructor(private fb: FormBuilder, private web: IncomeService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createInvoiceForm = this.fb.group({
      // items: this.fb.array([]),
      items: this.fb.array([
        this.initItem(),
      ]),
      categoryId: ['', Validators.required],
      customerId: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceNumber: [0, Validators.required],

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

  addItem(): void {
    const control = <FormArray>this.createInvoiceForm.get('items');
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
    const control = <FormArray>this.createInvoiceForm.get('items');
    const item = control.at(index) as FormGroup | null;
    control.removeAt(index);
    console.log('item: ', item);
    if (!item) {
      return; // exit early if item is null or undefined
    }
    const quantity = item.get('quantity').value;
    const price = item.get('price').value;
    const taxPercentage = item.get('taxPercentage').value;
    const total = quantity * price;
    item.get('total').patchValue(total);
    this.subTotal = control.controls.reduce((acc, curr) => acc + curr.get('total').value, 0);
    this.taxAmount = control.controls.reduce((acc, curr) => acc + ((curr.get('total').value * curr.get('taxPercentage').value) / 100), 0);
    this.totalAmount = this.subTotal + this.taxAmount;
    const taxAmount = (total * taxPercentage) / 100;
    item.controls.taxAmount.setValue(Number(taxAmount.toFixed(2)))
    item.controls.tax.setValue(+item.controls.tax.value);
  }

  getAllInvoiceCategory() {
    this.loader = true
    this.web.getAllInvoiceCategory().subscribe({
      next: (res) => {
        this.invoiceCategory = res;
        console.log(this.invoiceCategory);
        this.getAllCustomers()
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




  getAllCustomers() {
    this.loader = true
    this.web.getAllCustomers().subscribe({
      next: (res) => {
        this.customersList = res;
        console.log(this.customersList);

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
    const items = this.createInvoiceForm.get('items') as FormArray;
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

  
  async createInvoiceCategory() {
    let payload = {
      "name": this.createCategory.value.categoryName
    }
    try {
      const result$ = await this.web.createInvoiceCategory(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.addCategory = false
        this.getAllInvoiceCategory()
        this.createCategory.reset();
        this.toastr.success("Invoice Category successfully created!");

      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }

  getAllProduct() {
    this.loader = true
    this.web.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res;
        console.log('this.productList: ', this.productList);

        // this.loader = false;
        this.lastInvoice()
        
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

  async lastInvoice(){
    try {
      this.loader = true
      const result$ = await this.web.getLastInvoice()
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createInvoiceForm.controls['invoiceNumber'].patchValue(res['lastInvoiceNumber'] + 1)
        this.loader = false;
        this.getAllInvoiceCategory()
      }
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);

    }
  }

  searchProducts(term: string) {
    return of(this.productList.filter(product => product.name.toLowerCase().indexOf(term.toLowerCase()) !== -1));
  }


  async createInvoice() {

    let payload = {

      "customerId": this.createInvoiceForm.value.customerId,
      "invoiceDate": this.createInvoiceForm.value.invoiceDate,
      "invoiceNumber": this.createInvoiceForm.value.invoiceNumber,
      "items": this.createInvoiceForm.value.items,
      "categoryId": this.createInvoiceForm.value.categoryId

    }
    console.log('payload: ', payload);


    try {
      const result$ = await this.web.createInvoice(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createInvoiceForm.reset();
        this.router.navigate(['/admin/income/invoices/view/' + res['invoice']?._id]);
        this.toastr.success("Invoice successfully saved!");

      }
    } catch (error) {
      this.clicked = false
      console.log(error);
      this.toastr.error(error.error.message);

    }



  }

  onChangeProduct(data,i){
    console.log('data: ', data);
    const control = <FormArray>this.createInvoiceForm.get('items');
    console.log('control: ', control);
    const item = control.at(i);
    item.patchValue({
      price: data?.salePrice
    });
  }

}
