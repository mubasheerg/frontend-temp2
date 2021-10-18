import { Customer } from './customer';

export class Order {
  orderId?: number;
  amount?: number;
  orderedOn?: Date;
  customer?: Customer;
}
