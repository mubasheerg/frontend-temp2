import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-customer-view-product',
  templateUrl: './customer-view-product.component.html',
  styleUrls: ['./customer-view-product.component.css'],
})
export class CustomerViewProductComponent implements OnInit {
  constructor(
    private router: Router,
    public productsService: ProductsService,
    private cartService:CartService) {}

  products: Products[] = [];
  public errorMessage: string = '';
  public searches: string = '';
  public customerId:number=0;
  ngOnInit(): void {
    this.customerId=Number(localStorage.getItem('userId'));
    console.log(this.customerId);
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  addToCart(prod:Products) {
    const cart:Cart=new Cart();
    const customer:Customer=new Customer();
    customer.custId=this.customerId;
    const product:Products=new Products();
    product.prodId=prod.prodId;
    cart.customer=customer;
    cart.product=product;
    console.log(cart);
    this.cartService.addCart(cart).subscribe(response=>{
      window.alert(response);
      console.log(response);
    });
  }
  buy() {}
}
