import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  constructor(public orderService: OrderService, private router: Router) {}
  custId: number = 0;
  ngOnInit(): void {
    this.custId = Number(localStorage.getItem('userId'));
    console.log(this.custId);
  }
  addorderbutton() {
    const order: Order = new Order();
    const customer: Customer = new Customer();
    customer.custId = this.custId;
    order.customer = customer;
    this.orderService.addOrders(order).subscribe((data) => {
      console.log(data);
      localStorage.setItem('orderId',data);
    });
    this.router.navigate(['customer-view-product']);
  }
}
