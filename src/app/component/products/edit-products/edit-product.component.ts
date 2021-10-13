import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { Stocks } from 'src/app/models/stocks';
import { ProductsService } from 'src/app/services/products.service';
import { StocksService } from 'src/app/services/stocks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  editProductForm?: FormGroup;
  products?: Products;
  errorMessage?: string;
  ProductsExists?: string;
  stockId?: number;
  stock: Stocks;
  count: number;
  prodId?: number;
  date = new Date();
  public product: Products = new Products();
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public productsService: ProductsService,
    public stockService: StocksService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.prodId = this.activatedRoute.snapshot.params['prodId'];
    this.stockId = this.activatedRoute.snapshot.params['count'];
    console.log('prodId:', this.prodId);
    console.log('count', this.stockId);
    this.productsService.getProductsById(this.prodId).subscribe((data) => {
      this.product = data;
      console.log(this.product);
      this.stockService.getStocksById(this.stockId).subscribe((data) => {
        this.stock = data;
        console.log(this.stock);
      });
    });
  }
  updateProducts() {
    this.productsService.updateProducts(this.product).subscribe((data) => {
      console.log(data);
      this.successNotification();
    });
    this.stockService.updateStocks(this.stock).subscribe((data) => {
      console.log(data);
    });
  }
  updateStock() {
    this.stockService.updateStocks(this.stock).subscribe((data) => {
      console.log(data);
    });
  }
  back() {
    this.router.navigate(['view-all-products']);
  }

  successNotification() {
    Swal.fire('Success', 'Product updated successfully', 'success');
  }
}
