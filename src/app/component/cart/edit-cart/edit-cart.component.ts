import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css'],
})
export class EditCartComponent implements OnInit {
  editcartForm?: FormGroup;
  cart?: Cart;
  errorMessage?: string;
  cartId: number;
  date = new Date();

  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.cartId = this.activatedRoute.snapshot.params['cartId'];
    console.log('cartId:', this.cartId);
  }

  updateCart() {
    this.cartService.updateCart(this.editcartForm?.value).subscribe(
      (response) => {
        console.log(response);
        console.log('Updated successfully');
      },
      (error) => {
        this.successNotification();
        this.back();
        console.log('Error in updation');
      }
    );
  }
  back() {
    this.router.navigate(['viewAllProducts']);
  }
  successNotification() {
    Swal.fire('Success', 'Product updated successfully', 'success');
  }
}
