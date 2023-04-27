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

  getProductByID(id){
    
    return  this.http.get(`${serverURL}/api/product/${id}`).pipe(catchError(this.handleError));

  }
  
  getAllProduct(page,limit,search,sortBy,sortOrder){
    const params = {
      search,
      page,
      limit
    };
    if(search){
      return this.http.get(`${serverURL}/api/product/search?`,{params:params}).pipe(catchError(this.handleError));

    }
    else{
      if(sortBy){
        return  this.http.get(`${serverURL}/api/product?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`).pipe(catchError(this.handleError));
      }
      else{
        return  this.http.get(`${serverURL}/api/product?page=${page}&limit=${limit}`).pipe(catchError(this.handleError));
      }

    }

  }
  createProduct(data){
    return this.http.post(`${serverURL}/api/product/add`,data)

  }
  updateProduct(id,data){
    return this.http.put(`${serverURL}/api/product/${id}`,data)

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
  updateProductCategory(id,data){
    return this.http.put(`${serverURL}/api/category/update/${id}`,data)
  }
  getAllCategoryList(page,limit,name){
    const params = {
      name,
      page,
      limit
    };
    if(name){
      return this.http.get(`${serverURL}/api/category/view?`,{params:params}).pipe(catchError(this.handleError));

    }
    else{
      return  this.http.get(`${serverURL}/api/category/view?page=${page}&limit=${limit}`).pipe(catchError(this.handleError));

    }

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
