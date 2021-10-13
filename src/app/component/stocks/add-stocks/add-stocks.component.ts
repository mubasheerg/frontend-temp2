import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { Stocks } from 'src/app/models/stocks';
import { ProductsService } from 'src/app/services/products.service';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.css'],
})
export class AddStocksComponent implements OnInit {
  AddStockForm = new FormGroup({
    product: new FormControl(''),
    stock: new FormControl(''),
  });
  constructor(
    private router: Router,
    public productsService: ProductsService,
    public stockService: StocksService
  ) {}

  products: Products[] = [];
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }
  addStock() {
    const stock: Stocks = new Stocks();
    stock.count = this.stock.value;
    const product: Products = new Products();
    product.prodId = this.product.value.split('-').shift();
    console.log(product);
    stock.product = product;
    console.log(stock);
    this.stockService.addStocks(stock).subscribe((response) => {
      console.log(response);
    });
  }
  get product() {
    return this.AddStockForm.get('product');
  }
  get stock() {
    return this.AddStockForm.get('stock');
  }
}
