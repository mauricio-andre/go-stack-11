import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

class Product {
  id: string;

  name: string;

  price: number;

  quantity: number;

  orderProducts: OrdersProducts[];

  createdAt: Date;

  updatedAt: Date;
}

export default Product;
