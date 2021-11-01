import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { Stocks } from 'src/app/models/stocks';
import { ProductsService } from 'src/app/services/products.service';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css'],
})
export class ViewAllProductComponent implements OnInit {
  errorMessage?: string;
  products: Products[] = [];
  show?: boolean;
  searchProductsForm?: FormGroup;
  prodId?: number;
  public productIdList: Number[] = [];
  public stockList: Stocks[] = [];
  constructor(
    public productsService: ProductsService,
    public router: Router,
    public formBuiler: FormBuilder,
    private stockService: StocksService
  ) {}

  ngOnInit(): void {
    this.viewAllProducts();
    this.searchProductsForm = this.formBuiler.group({
      prodId: ['', Validators.required],
    });
  }

  viewAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
      for (var i = 0; i < this.products.length; i++) {
        console.log(this.products[i].prodId);
        this.productIdList.push(Number(this.products[i].prodId));
      }
      console.log(this.productIdList);
      this.stockService
        .getStocksByProductId(this.productIdList)
        .subscribe((response) => {
          this.stockList = response;
          console.log(this.stockList);
        });
    });
  }

  viewProductsByName(prodName: string) {
    this.productsService.getProductsByName(prodName).subscribe((data: any) => {
      console.log(data);
    });
  }

  addProducts() {
    this.router.navigate(['add-products']);
  }

  editProducts(prodId: number, count: number) {
    this.router.navigate(['edit-products', prodId, count]);
  }
}
