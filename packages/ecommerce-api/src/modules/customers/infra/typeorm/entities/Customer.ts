import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

class Customer {
  id: string;

  name: string;

  email: string;

  createdAt: Date;

  updatedAt: Date;
}

export default Customer;
