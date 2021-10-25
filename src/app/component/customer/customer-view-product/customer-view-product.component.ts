import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/orderItem';
import { Products } from 'src/app/models/products';
import { Stocks } from 'src/app/models/stocks';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { StocksService } from 'src/app/services/stocks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-view-product',
  templateUrl: './customer-view-product.component.html',
  styleUrls: ['./customer-view-product.component.css'],
})
export class CustomerViewProductComponent implements OnInit {
  modalOptions: NgbModalOptions;
  quantity: number = 0;
  orderedItems: OrderItem[] = [];
  products: Products[] = [];
  stock: Stocks = new Stocks();
  public errorMessage: string = '';
  public searches: string = '';
  public customerId: number = 0;
  public orderId: number = 0;
  order: Order = new Order();
  constructor(
    public orderItemService: OrderItemService,
    public productsService: ProductsService,
    private orderService: OrderService,
    private stocksService: StocksService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }
  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('userId'));
    if (this.customerId == null) {
      this.router.navigate(['login']);
    }
    console.log(this.customerId);
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  buy(content: any, product: Products) {
    this.orderId = Number(localStorage.getItem('orderId'));
    this.modalService.open(content, this.modalOptions).result.then(
      () => {
        this.stocksService
          .getCountByProdId(product.prodId)
          .subscribe((data) => {
            this.stock = data;
            if (this.stock.count >= this.quantity) {
              console.log('inside if');
              const orderItem: OrderItem = new OrderItem();
              orderItem.quantity = this.quantity;
              const order: Order = new Order();
              order.orderId = this.orderId;
              orderItem.order = order;
              orderItem.product = product;
              this.orderItemService
                .addOrderItem(orderItem)
                .subscribe((data) => {
                  this.getOrderedItems();
                  this.getOrderById();
                  console.log(data);
                });
            } else {
              Swal.fire(
                'Wrong',
                'Entered quantity is greater than stocks',
                'error'
              );
            }
          });
      },
      (reason) => {}
    );
  }

  getOrderedItems() {
    this.orderItemService.getOrderedItems(this.orderId).subscribe((data) => {
      this.orderedItems = data;
      console.log(data);
    });
  }
  getQuantity(quantity: number) {
    this.quantity = quantity;
    return true;
  }
  getOrderById() {
    this.orderService.getOrderById(this.orderId).subscribe((data) => {
      this.order = data;
      console.log(data);
    });
  }
  orderSuccess() {
    Swal.fire('Success', 'Ordered Succesfully', 'success');
  }
}
