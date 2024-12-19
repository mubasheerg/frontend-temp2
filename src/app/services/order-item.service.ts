import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { OrderItem } from '../models/orderItem';

const orderItemURL = 'http://localhost:9001/orderItem';
@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(orderItemURL, orderItem, this.httpOptions);
  }

  getOrderedItems(id: number): Observable<any> {
    return this.http.get<OrderItem>(`${orderItemURL}/${id}`);
  }
}
