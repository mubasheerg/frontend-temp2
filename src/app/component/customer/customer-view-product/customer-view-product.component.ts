import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/orderItem';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

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
  public errorMessage: string = '';
  public searches: string = '';
  public customerId: number = 0;
  public orderId: number = 0;
  order: Order = new Order();
  constructor(
    public orderItemService: OrderItemService,
    public productsService: ProductsService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private cartService: CartService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }
  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('userId'));
    console.log(this.customerId);
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  addToCart(prod: Products) {
    const cart: Cart = new Cart();
    const customer: Customer = new Customer();
    customer.custId = this.customerId;
    const product: Products = new Products();
    product.prodId = prod.prodId;
    cart.customer = customer;
    cart.product = product;
    console.log(cart);
    this.cartService.addCart(cart).subscribe((response) => {
      window.alert(response);
      console.log(response);
    });
  }
  buy(content: any, product: Products) {
    this.orderId = Number(localStorage.getItem('orderId'));
    this.modalService.open(content, this.modalOptions).result.then(
      () => {
        const orderItem: OrderItem = new OrderItem();
        orderItem.quantity = this.quantity;
        const order: Order = new Order();
        order.orderId = this.orderId;
        orderItem.order = order;
        orderItem.product = product;
        this.orderItemService.addOrderItem(orderItem).subscribe((data) => {
          this.getOrderedItems();
          this.getOrderById();
          console.log(data);
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
}
