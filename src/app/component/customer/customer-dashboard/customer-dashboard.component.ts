import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  viewAllOrders() {
    this.router.navigate(['viewAllOrders']);
  }

  viewAllProducts() {
    this.router.navigate(['viewAllProducts']);
  }
}
