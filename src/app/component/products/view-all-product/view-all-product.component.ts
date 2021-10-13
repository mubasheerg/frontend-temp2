import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { Stocks } from 'src/app/models/stocks';
import { ProductsService } from 'src/app/services/products.service';
import { StocksService } from 'src/app/services/stocks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css'],
})
export class ViewAllProductComponent implements OnInit {
  errorMessage?: string;
  public products: Products[] = [];
  show?: boolean;
  searchProductsForm?: FormGroup;
  prodId?: number;
  searchProductId: boolean = false;
  searches?: any;
  tt: boolean = true;
  txtValue: any = null;
  public productIdList: Number[] = [];
  public stockList:Stocks[]=[];
  constructor(
    public productsService: ProductsService,
    public router: Router,
    public formBuiler: FormBuilder,
    private stockService:StocksService
  ) {}

  ngOnInit(): void {
    this.viewAllProducts();
    //this.getStocks();
    this.searchProductsForm = this.formBuiler.group({
      prodId: ['', Validators.required],
    });
  }

  viewAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
      for (var i=0;i<this.products.length;i++) {
        console.log(this.products[i].prodId)
        this.productIdList.push(Number(this.products[i].prodId));
      }
      console.log(this.productIdList);
      this.stockService.getStocksByProductId(this.productIdList).subscribe(response=>{
        this.stockList=response;
        console.log(this.stockList);
      })
    });
  }

  //to delete products
  deleteProducts(prodId: any) {
    console.log('Product Id to delete' + prodId);
    this.productsService.deleteProducts(prodId).subscribe(
      (response) => {
        console.log('response' + response);
      },
      (error) => {
        console.log('Product with id ' + prodId + 'deleted successfully');
        this.viewAllProducts();
        console.log(error);
      }
    );
  }

  //to search by name
  viewProductsByName(prodName: string) {
    this.productsService.getProductsByName(prodName).subscribe((data: any) => {
      console.log(data);
    });
  }

  searchProducts() {
    console.log(this.searchProductId);
    console.log(this.searchProductsForm?.get('prodId')?.value);
    if (this.txtValue == null) {
      this.viewAllProducts();
    } else {
      this.productsService
        .getProductsById(this.searchProductsForm?.get('prodId')?.value)
        .subscribe((res) => {
          this.products = [];
          this.products[0] = res;
          console.log(this.products[0]);
          if (this.products[0] == null) {
            this.tt = false;
            this.errorMessage = 'No data found';
            this.viewAllProducts();
          } else {
            this.errorMessage = '';
            this.tt = true;
          }
        });
    }
  }

  addProducts() {
    this.router.navigate(['add-products']);
  }

  getProductsById() {}
  showAdminop() {
    this.router.navigate(['adminDashboard']);
  }

  alertConfirmation(prodId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.deleteProducts(prodId);
        this.viewAllProducts();
        Swal.fire('Removed!', 'Product removed successfully!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product not deleted', 'error');
      }
    });
  }

  editProducts(prodId: number,count:number) {
    this.router.navigate(['edit-products', prodId,count]);
  }
}
