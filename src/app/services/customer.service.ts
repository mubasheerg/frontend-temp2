import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer';

const customerURL="http://localhost:9001/customer"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getCustomerById(custId:number):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/${custId}`);
  }

  getCustomerByMail(custMail:string):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/getCustomerByMail/${custMail}`);
  }

  getCustomerByPhoneNo(custPhone:string):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/getCustomerByPhoneNo/${custPhone}`);
  }

  getCustomerByName(custName:string):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/getCustomerByPhoneNo/${custName}`);
  }

  getAllCustomers():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${customerURL}`);
  }

  deleteCustomer(custId:number):Observable<Customer>
  {
    return this.http.delete(`${customerURL}/${custId}`);
  }

  addCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(customerURL,customer,this.httpOptions);
  }

  updateCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(customerURL,customer);
  }

  forgotPassword(custMail: string): Observable<Customer> {
    return this.http.put<Customer>(`${customerURL}/forgotpassword/${custMail}`,this.httpOptions);
  }

  customerLogin(custMail:string,custPwd:String):Observable<Customer>
  {
    return this.http.get<Customer>(`${customerURL}/customerLogin/${custMail}/${custPwd}`);
  }

}
