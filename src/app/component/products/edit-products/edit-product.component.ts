import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  editProductForm?:FormGroup
  products?:Products;
  errorMessage?:string
  ProductsExists?:string;
  prodId?:number;
  date=new Date();
  public product:Products=new Products();
  constructor(public activatedRoute:ActivatedRoute,public formBuilder:FormBuilder,public productsService:ProductsService,public router:Router) { }

  ngOnInit(): void {
    this.prodId=this.activatedRoute.snapshot.params['prodId'];
    console.log('prodId:',this.prodId);
    this.productsService.getProductsById(this.prodId).subscribe(data=>{
      this.product=data;
      console.log(this.product);
    });

  }
  updateProducts(){
      this.productsService.updateProducts(this.product).subscribe(data=>{
        window.alert(data);
      });
  }
  back()
  {
    this.router.navigate(['viewaall-products'])
  }

successNotification(){
  Swal.fire('Success', 'Product updated successfully', 'success')
}
}
