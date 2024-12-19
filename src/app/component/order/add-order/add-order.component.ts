import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addOrders() {}

  successNotification() {
    Swal.fire('Success', 'Ordered Successfully', 'success');
  }
  back() {
    this.router.navigate(['customer-dashboard']);
  }
}
