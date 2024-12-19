import { Customer } from './customer';
import { Products } from './products';

export class Cart {
  cartId?: number;
  cartAddedOn?: Date;
  cartUpdatedOn?: Date;
  customer?: Customer;
  product?: Products;
}
