import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Stocks } from '../models/stocks';

const stocksURL = 'http://localhost:9001/stocks';
@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllStocks(): Observable<Stocks[]> {
    return this.http.get<Stocks[]>(`${stocksURL}`);
  }

  deleteStocks(stockId: number): Observable<Stocks> {
    return this.http.delete(`${stocksURL}/${stockId}`);
  }

  addStocks(stocks: Stocks): Observable<Stocks> {
    return this.http.post<Stocks>(stocksURL, stocks, this.httpOptions);
  }

  updateStocks(stocks: Stocks): Observable<Stocks> {
    return this.http.put<Stocks>(stocksURL, Stocks, this.httpOptions);
  }

  getStocksById(stockId: number): Observable<Stocks> {
    return this.http.get<Stocks>(`${stocksURL}/${stockId}`);
  }
  getStocksByProductId(productList: Number[]): Observable<any> {
    return this.http.post(`${stocksURL}/count`, productList);
  }
}
