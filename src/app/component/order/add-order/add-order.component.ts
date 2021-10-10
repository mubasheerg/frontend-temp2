import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { Products } from 'src/app/models/products';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(public orderService:OrderService,public formBuilder:FormBuilder,public router:Router,public activatedRoute:ActivatedRoute) { }

  addOrderForm?:FormGroup;
  order?:Order;
  products?:Products
  customer?:Customer
  customerId?:number;
  errorMessage?:string;
  date=new Date();

  ngOnInit(): void {
    this.addOrderForm=this.formBuilder.group({
    amount:['',[Validators.required]],
    prodId:[this.activatedRoute.snapshot.params['prodId']],
    custId:[this.activatedRoute.snapshot.params['custId']],
    })
  }

  addOrders(){
    console.log(this.order=this.addOrderForm?.value);
    this.order=this.addOrderForm?.value;
    this.orderService.addOrders(this.addOrderForm?.value)
    .subscribe(
      res=>{
        console.log(res);
        console.log("Ordered succesfully");
      },
      error=>
      {
        this.successNotification();
        console.log("Error in adding order"+error)
        this.back();
      }
    )
  }

  successNotification(){
    Swal.fire('Success','Ordered Successfully','success')
  }
  back(){
    this.router.navigate(['customer-dashboard'])
  }
}
