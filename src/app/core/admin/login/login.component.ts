import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private web:AdminService,    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, Validators.required],
    })
  }

  async signIn(){
    console.log('hello');
    
    let payload = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    try {
      const result$ = this.web.loginIn(payload)
      const res = await lastValueFrom(result$);
      localStorage.setItem("token", res["token"]);
      if(res["token"]){
        console.log(result$);
        console.log(res);
        
        console.log(res["token"]);
        this.router.navigateByUrl("admin/dash");

        


      }
    } catch (error) {
      console.log(error);
      
    }
  }

}
