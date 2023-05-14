import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, lastValueFrom, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EditInvoiceComponent implements OnInit{
  loader: boolean = false
  editInvoiceForm: FormGroup;
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
  invoiceId: any
  invoiceData: any
  constructor(private fb: FormBuilder, private web: IncomeService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params: ', params);
      this.invoiceId = params['id'];
      if (this.invoiceId) {
        this.getDetails()
      }
    });

    this.editInvoiceForm = this.fb.group({
      // items: this.fb.array([]),
      items: this.fb.array([
      ]),

      categoryId: ['', Validators.required],
      customerId: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      dueDate: ['']

    });
    this.createCategory = this.fb.group({
      categoryName: ['', Validators.required],
    })
    // this.addItem()
    this.getAllProduct()


  }

  getDetails() {
    this.loader = true
    this.web.getInvoiceByID(this.invoiceId).subscribe({
      next: (res) => {
        this.invoiceData = res['invoice'];
      },
      error: (err) => {
        console.log(err);
        this.loader = false;
      },
      complete: () => {
        console.log('Observable completed');
        const itemsData = this.editInvoiceForm.get('items') as FormArray;
        for (const item of this.invoiceData.items) {
          const formGroup = this.fb.group({
            product: [item.product._id],
            quantity: [item.quantity],
            price: [item.price],
            taxPercentage: [item.taxPercentage],
            total: [item.total],
            taxAmount: [item.taxAmount]
          });
          itemsData.push(formGroup);
        }

        const items = this.editInvoiceForm.get('items') as FormArray;
  
        this.subTotal = items.controls.reduce((acc, curr) => acc + curr.get('total').value, 0);
        this.taxAmount = items.controls.reduce((acc, curr) => acc + ((curr.get('total').value * curr.get('taxPercentage').value) / 100), 0);
        this.totalAmount = this.subTotal + this.taxAmount;

        this.editInvoiceForm.controls['categoryId'].patchValue(this.invoiceData?.category?._id);
        this.editInvoiceForm.controls['customerId'].patchValue(this.invoiceData?.customer?._id);
        this.editInvoiceForm.controls['invoiceDate'].patchValue(this.invoiceData?.invoiceDate);

        this.editInvoiceForm.controls['invoiceNumber'].patchValue(this.invoiceData?.invoiceNumber);
        if(this.invoiceData?.dueDate){
          this.editInvoiceForm.controls['dueDate'].patchValue(this.invoiceData?.dueDate);
        }

        
      }
    });
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
    const control = <FormArray>this.editInvoiceForm.get('items');
    control.push(this.initItem());
  }
  removeItem(index: number): void {
    const control = <FormArray>this.editInvoiceForm.get('items');
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
    const items = this.editInvoiceForm.get('items') as FormArray;
    const item = items.at(index) as FormGroup | null;
    console.log('item: ', item);
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
        this.getAllInvoiceCategory()
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

  async editInvoice() {

    let payload = {

      "customerId": this.editInvoiceForm.value.customerId,
      "invoiceDate": this.editInvoiceForm.value.invoiceDate,
      "invoiceNumber": this.editInvoiceForm.value.invoiceNumber,
      "items": this.editInvoiceForm.value.items,
      "categoryId": this.editInvoiceForm.value.categoryId,
 

    }

    if(this.editInvoiceForm.value.dueDate){
      payload["dueDate"] = this.editInvoiceForm.value.dueDate
    }

    console.log('payload: ', payload);


    try {
      const result$ = await this.web.editInvoice(this.invoiceId,payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.router.navigate(['/admin/income/invoices/view/' + res['invoice']?._id]);
        this.toastr.success("Invoice successfully saved!");
      }
    } catch (error) {
      this.clicked = false
      console.log(error);
      this.toastr.error(error.error.message);

    }



  }

  onChangeProduct(data, i) {
    console.log('data: ', data);
    const control = <FormArray>this.editInvoiceForm.get('items');
    console.log('control: ', control);
    const item = control.at(i);
    item.patchValue({
      price: data?.salePrice
    });
  }
}

