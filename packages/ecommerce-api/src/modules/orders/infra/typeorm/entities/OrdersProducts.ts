import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';

import Product from '@modules/products/infra/typeorm/entities/Product';

class OrdersProducts {
  id: string;

  order: Order;

  product: Product;

  productId: string;

  orderId: string;

  price: number;

  quantity: number;

  createdAt: Date;

  updatedAt: Date;
}

export default OrdersProducts;
