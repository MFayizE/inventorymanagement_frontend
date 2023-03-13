import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  checkProductBySKU(data) {
    return  this.http.get(`${serverURL}/api/product/checkProductBySKU/${data}`)
  }

  getAllProductCategory(){
    
    return  this.http.get(`${serverURL}/api/category/all`).pipe(catchError(this.handleError));

  }
  
  getAllProduct(page,limit,search){
    const params = {
      search,
      page,
      limit
    };
    const options = {
      params
    };
    if(search){
      return this.http.post(`${serverURL}/api/product/search?`,null,options).pipe(catchError(this.handleError));

    }
    else{
      return  this.http.get(`${serverURL}/api/product?page=${page}&limit=${limit}`).pipe(catchError(this.handleError));

    }

  }
  createProduct(data){
    return this.http.post(`${serverURL}/api/product/add`,data)

  }
  searchProduct(search,page,limit){
    const params = {
      search,
      page,
      limit
    };
    const options = {
      params
    };

  }

  createProductCategory(data){
    return this.http.post(`${serverURL}/api/category/add`,data)
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }

}
