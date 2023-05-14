import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError,Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const serverURL = environment.mainAPI;
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getAllProduct(){
    return  this.http.get(`${serverURL}/api/product/getwithQuantity`).pipe(catchError(this.handleError));
  }

  
  getAllInvoiceCategory(){
    
    return  this.http.get(`${serverURL}/api/invoiceCategory/all`).pipe(catchError(this.handleError));

  }
   
  getAllCustomers(){
    
    return  this.http.get(`${serverURL}/api/customer/all`).pipe(catchError(this.handleError));

  }


  
  createInvoiceCategory(data){
    return this.http.post(`${serverURL}/api/invoiceCategory/add`,data)
  }

  createInvoice(data){
    return this.http.post(`${serverURL}/api/invoice`,data)

  }
  editInvoice(id,data){
    return this.http.put(`${serverURL}/api/invoice/edit/${id}`,data)
  }
  createCustomer(data){
    return this.http.post(`${serverURL}/api/customer/add`,data)

  }
  getInvoiceUsingId(Id){
    return this.http.get(`${serverURL}/api/invoice/${Id}`).pipe(catchError(this.handleError));

  }
  getAllAccounts(){
    return this.http.get(`${serverURL}/api/account/all`).pipe(catchError(this.handleError));
  }

  addInvoiceDueDate(data,Id){
    return this.http.put(`${serverURL}/api/invoice/${Id}`,data)

  }

  
  markInvoiceRecieved(Id){
    return this.http.put(`${serverURL}/api/invoice/${Id}/received`, null)

  }

  addPayment(Id,data){
    return this.http.put(`${serverURL}/api/invoice/${Id}/payment`, data)

  }

  
  getLastInvoice(){
    return this.http.get(`${serverURL}/api/invoice/last`)

  }

  
  getAllInvoiceList(page,limit,search,sortBy,sortOrder){
    const params = {
      search,
      page,
      limit
    };
    if(search){
      return this.http.get(`${serverURL}/api/invoice/search?`,{params:params}).pipe(catchError(this.handleError));

    }
    else{
      if(sortBy){
        return  this.http.get(`${serverURL}/api/invoice?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`).pipe(catchError(this.handleError));
      }
      else{
        return  this.http.get(`${serverURL}/api/invoice?page=${page}&limit=${limit}`).pipe(catchError(this.handleError));
      }
    }
   

  }

  getInvoiceByID(id){
    
    return  this.http.get(`${serverURL}/api/invoice/${id}`).pipe(catchError(this.handleError));

  }

  
  getTotalInvoiceIncome(){
    
    return  this.http.get(`${serverURL}/api/invoice/total`).pipe(catchError(this.handleError));

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
