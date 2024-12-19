import { Order } from './order';
import { Products } from './products';

export class OrderItem {
  id?: number;
  quantity?: number;
  price?: number;
  createdOn?: Date;
  order?: Order;
  product?: Products;
}
