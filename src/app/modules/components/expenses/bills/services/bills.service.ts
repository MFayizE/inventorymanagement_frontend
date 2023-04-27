import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError,Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const serverURL = environment.mainAPI;
@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(private http: HttpClient) { }

  getAllProduct(){
    return  this.http.get(`${serverURL}/api/product/getAll`).pipe(catchError(this.handleError));
  }

  
  getAllBillCategory(){
    
    return  this.http.get(`${serverURL}/api/billCategory/all`).pipe(catchError(this.handleError));

  }
   
  getAllVendors(){
    
    return  this.http.get(`${serverURL}/api/vendor/all`).pipe(catchError(this.handleError));

  }


  
  createBillCategory(data){
    return this.http.post(`${serverURL}/api/billCategory/add`,data)
  }

  createBill(data){
    return this.http.post(`${serverURL}/api/bill`,data)

  }
  editBill(id,data){
    return this.http.put(`${serverURL}/api/bill/edit/${id}`,data)
  }
  createVendor(data){
    return this.http.post(`${serverURL}/api/vendor/add`,data)

  }
  getBillUsingId(Id){
    return this.http.get(`${serverURL}/api/bill/${Id}`).pipe(catchError(this.handleError));

  }
  getAllAccounts(){
    return this.http.get(`${serverURL}/api/account/all`).pipe(catchError(this.handleError));
  }

  addBillDueDate(data,Id){
    return this.http.put(`${serverURL}/api/bill/${Id}`,data)

  }

  
  markBillRecieved(Id){
    return this.http.put(`${serverURL}/api/bill/${Id}/received`, null)

  }

  addPayment(Id,data){
    return this.http.put(`${serverURL}/api/bill/${Id}/payment`, data)

  }

  
  getAllBillList(page,limit){
    
    return  this.http.get(`${serverURL}/api/bill?page=${page}&limit=${limit}`).pipe(catchError(this.handleError));

  }

  getBillByID(id){
    
    return  this.http.get(`${serverURL}/api/bill/${id}`).pipe(catchError(this.handleError));

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
