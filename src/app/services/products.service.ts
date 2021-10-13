import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Products } from '../models/products';

const productsURL = 'http://localhost:9001/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${productsURL}/getAllProducts`);
  }

  getProductsByName(prodName: string): Observable<Products> {
    return this.http.get<Products>(
      `${productsURL}/getProductsByName/${prodName}`
    );
  }

  getProductsByCategory(category: string): Observable<Products> {
    return this.http.get<Products>(
      `${productsURL}/getProductsByCategory/${category}`
    );
  }

  getProductsById(prodId: number): Observable<Products> {
    return this.http.get<Products>(`${productsURL}/getProduct/Id/${prodId}`);
  }

  deleteProducts(prodId: number): Observable<Products> {
    return this.http.delete(`${productsURL}/deleteProduct/${prodId}`);
  }

  addProducts(products: Products): Observable<Products> {
    return this.http.post<Products>(productsURL, products, this.httpOptions);
  }

  updateProducts(products: Products): Observable<Products> {
    return this.http.put<Products>(
      `${productsURL}/updateProduct`,
      products,
      this.httpOptions
    );
  }
}
