import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-view-all-order',
  templateUrl: './view-all-order.component.html',
  styleUrls: ['./view-all-order.component.css']
})
export class ViewAllOrderComponent implements OnInit {

  errorMessage?:string;
  products:Products[]=[];
  

  constructor(public router:Router) { }

  ngOnInit(): void {
  }


}
