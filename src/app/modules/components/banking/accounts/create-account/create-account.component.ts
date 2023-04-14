import { Component, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  loader: boolean = false
  clicked: boolean = false
  @Input() isPopUp: boolean
  constructor(private fb: FormBuilder, private toastr: ToastrService, private web:AccountService) { }
  ngOnInit(): void {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      accountNumber: [null, Validators.required],
      balance: [0, Validators.required],
      bankName: [''],
      bankPhone: [null],
      bankAddress:[''],
      isEnable: [true, Validators.required],
    })
  }

  async createAccount(){
    let payload = {
      name: this.createAccountForm.value.name,
      accountNumber: this.createAccountForm.value.accountNumber,
      balance: this.createAccountForm.value.balance,
      bankName: this.createAccountForm.value.bankName,
      bankPhone: this.createAccountForm.value.bankPhone,
      isEnable: this.createAccountForm.value.isEnable,
    }
    try {
      const result$ = await this.web.createAccount(payload)
      const res = await lastValueFrom(result$);
      if (res) {
        console.log(res);
        this.createAccountForm.reset();
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
