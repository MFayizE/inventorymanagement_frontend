import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-inventory-creating',
  templateUrl: './inventory-creating.component.html',
  styleUrls: ['./inventory-creating.component.scss']
})
export class InventoryCreatingComponent implements OnInit {
  loginForm: FormGroup;
  existName: boolean = false
  constructor(private fb: FormBuilder, private web:InventoryService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      name: ['', Validators.required],
    })
  }


  async checkNameExistOrNot(){
    const result$ = await this.web.checkProductByName(this.loginForm.value?.name)
    const res = await lastValueFrom(result$);
    console.log(res)
    let result = res['products']
    console.log(result);
    if(result){
      this.existName=true
    }
    else{
      this.existName=false
    }
  }

}
