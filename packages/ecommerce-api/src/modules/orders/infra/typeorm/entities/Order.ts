import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

class Order {
  id: string;

  customerId: string;

  customer: Customer;

  orderProducts: OrdersProducts[];

  createdAt: Date;

  updatedAt: Date;
}

export default Order;
