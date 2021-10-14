import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { CartService } from 'src/app/services/cart.service';
import { CustomerViewProductComponent } from '../../customer/customer-view-product/customer-view-product.component';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  constructor(public router: Router, public cartService: CartService) {}

  cart: Cart[] = [];
  custId: number = 0;
  productList: number[] = [];
  public isChecked: boolean = false;
  ngOnInit(): void {
    this.custId = Number(localStorage.getItem('userId'));
    this.cartService.getCartByID(this.custId).subscribe((data) => {
      console.log(data);
      this.cart = data;
      console.log(this.cart);
    });
  }

  buy(checkBox: boolean, id: number) {
    console.log(checkBox);
    console.log(id);
    // console.log(event);
    if(checkBox){
      this.productList.push(id);
    }else{
      this.productList.splice(this.productList.indexOf(id),1);
    }

    console.log(this.productList);
  }
}
