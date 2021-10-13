import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css'],
})
export class AddCartComponent implements OnInit {
  addcartForm?: FormGroup;
  cart?: Cart;
  errorMessage?: string;
  cartExists?: number;
  date = new Date();

  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.addcartForm = this.formBuilder.group({});
  }

  addCart() {
    console.log((this.cart = this.addcartForm?.value));
    this.cart = this.addcartForm?.value;
    this.cartService.addCart(this.addcartForm?.value).subscribe(
      (res) => {
        console.log(res);
        console.log('Cart added successfully');
      },
      (error) => {
        this.successNotification();
        console.log('Error in adding cart' + error);
        this.back();
      }
    );
  }

  successNotification() {
    Swal.fire('Success', 'Cart added successfully', 'success');
  }
  back() {
    this.router.navigate(['viewAllCart']);
  }
}
