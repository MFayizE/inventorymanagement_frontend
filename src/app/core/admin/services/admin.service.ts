import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const serverURL = environment.mainAPI;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  loginIn(data) {
    return  this.http.post(`${serverURL}/api/users/login`, data)
  }

}
