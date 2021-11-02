import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Products } from 'src/app/models/products';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-all-order',
  templateUrl: './view-all-order.component.html',
  styleUrls: ['./view-all-order.component.css'],
})
export class ViewAllOrderComponent implements OnInit {
  viewAllOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((response) => {
      this.viewAllOrders = response;
    });
  }
}
