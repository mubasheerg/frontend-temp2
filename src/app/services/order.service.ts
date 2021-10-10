import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from '../models/order';

const orderURL="http://localhost:9001/order"
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllOrders():Observable<Order[]>
  {
    return this.http.get<Order[]>(`${orderURL}`);
  }

  deleteOrders(orderId:number):Observable<Order>
  {
    return this.http.delete(`${orderURL}/${orderId}`);
  }

  addOrders(order:Order):Observable<Order>
  {
    return this.http.post<Order>(orderURL,order,this.httpOptions);
  }

  getOrderById(orderId:number):Observable<Order>
  {
    return this.http.get<Order>(`${orderURL}/${orderId}`);
  }

  updateOrder(order:Order):Observable<Order>
  {
    return this.http.put<Order>(orderURL,order,this.httpOptions);
  }

}
