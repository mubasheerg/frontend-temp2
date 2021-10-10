import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  viewAllProducts()
  {
    this.router.navigate(['viewAllProducts'])
  }

  viewAllOrders()
  {
    this.router.navigate(['viewAllOrders'])
  }

  viewAllStocks()
  {
    this.router.navigate(['viewAllStocks'])
  }

}
