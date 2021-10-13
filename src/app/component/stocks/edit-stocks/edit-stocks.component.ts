import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-stocks',
  templateUrl: './edit-stocks.component.html',
  styleUrls: ['./edit-stocks.component.css'],
})
export class EditStocksComponent implements OnInit {
  constructor(public productsService: ProductsService) {}
  products: Products[] = [];

  ngOnInit(): void {}
  viewAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
