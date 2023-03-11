import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const serverURL = environment.mainAPI;

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  constructor(private http: HttpClient) { }


  checkProductByName(data) {
    return  this.http.get(`${serverURL}/api/product/checkProductByName/${data}`)
  }

}
