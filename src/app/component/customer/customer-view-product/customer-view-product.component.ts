import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-customer-view-product',
  templateUrl: './customer-view-product.component.html',
  styleUrls: ['./customer-view-product.component.css'],
})
export class CustomerViewProductComponent implements OnInit {
  constructor(
    private router: Router,
    public productsService: ProductsService
  ) {}
  products: Products[] = [];
  public errorMessage: string = '';
  public searches: string = '';

  ngOnInit(): void {}
  viewAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  addToCart() {}
  buy() {}
}
