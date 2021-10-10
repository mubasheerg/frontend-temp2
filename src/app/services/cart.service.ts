import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cart } from '../models/cart';

const cartURL="http://localhost:9001/cart"
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllCartDetails():Observable<Cart[]>
  {
    return this.http.get<Cart[]>(`${cartURL}`);
  }

  deleteCart(cartId:number):Observable<Cart>
  {
    return this.http.delete(`${cartURL}/${cartId}`);
  }

  addCart(cart:Cart):Observable<Cart>
  {
    return this.http.post<Cart>(cartURL,cart,this.httpOptions);
  }

  getCartByID(cartId:number):Observable<Cart>
  {
    return this.http.get<Cart>(`${cartURL}/${cartId}`);
  }

  updateCart(cart:Cart):Observable<Cart>
  {
    return this.http.put<Cart>(cartURL,cart,this.httpOptions);
  }
}
