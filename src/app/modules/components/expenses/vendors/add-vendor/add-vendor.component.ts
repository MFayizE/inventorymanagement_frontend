import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillsService } from '../../bills/services/bills.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent {
  createVendorForm: FormGroup;
  loader: boolean = false
  clicked: boolean = false
  @Input() isPopUp: boolean
  constructor(private fb: FormBuilder, private toastr: ToastrService, private web:BillsService) { }
  ngOnInit(): void {
    this.createVendorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      taxNumber: [''],
      phone: [''],
      website: [''],
      address: [''],
      enabled: [true, Validators.required],
    })
  }

  async createVendor(){
    let payload = {
      name: this.createVendorForm.value.name,
      email: this.createVendorForm.value.email,
      taxNumber: this.createVendorForm.value.taxNumber,
      phone: this.createVendorForm.value.phone,
      website: this.createVendorForm.value.website,
      address: this.createVendorForm.value.address,
      enabled: this.createVendorForm.value.enabled,
    }
    try {
      const result$ = await this.web.createVendor(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createVendorForm.reset();
        this.ngOnInit()
        this.toastr.success("Vendor successfully created!");

      }
    } catch (error) {
      console.log(error);
      this.clicked = false
      this.toastr.error(error.error.message);
      this.clicked = false
    }
  }
}
