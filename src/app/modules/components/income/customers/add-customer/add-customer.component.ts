import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IncomeService } from '../../income.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  createCustomerForm: FormGroup;
  loader: boolean = false
  clicked: boolean = false
  @Input() isPopUp: boolean
  constructor(private fb: FormBuilder, private toastr: ToastrService, private web:IncomeService) { }
  ngOnInit(): void {
    this.createCustomerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      taxNumber: [''],
      phone: [''],
      website: [''],
      address: [''],
      enabled: [true, Validators.required],
    })
  }

  async createCustomer(){
    let payload = {
      name: this.createCustomerForm.value.name,
      email: this.createCustomerForm.value.email,
      taxNumber: this.createCustomerForm.value.taxNumber,
      phone: this.createCustomerForm.value.phone,
      website: this.createCustomerForm.value.website,
      address: this.createCustomerForm.value.address,
      enabled: this.createCustomerForm.value.enabled,
    }
    try {
      const result$ = await this.web.createCustomer(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createCustomerForm.reset();
        this.ngOnInit()
        this.toastr.success("Customer successfully created!");

      }
    } catch (error) {
      console.log(error);
      this.clicked = false
      this.toastr.error(error.error.message);
      this.clicked = false
    }
  }
}
