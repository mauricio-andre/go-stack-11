import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customerId, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError("Customer doesn't exists");
    }

    const findProducts = await this.productsRepository.findAllById(products);

    const quantityGreaterStock: string[] = [];
    const productIdsNotFount: string[] = [];
    const orderProducts: Product[] = [];
    products.forEach(product => {
      const findProduct = findProducts.find(
        productDatabase => productDatabase.id === product.id,
      );

      if (!findProduct) {
        productIdsNotFount.push(product.id);
        return;
      }

      if (findProduct && findProduct.quantity < product.quantity) {
        quantityGreaterStock.push(
          `[product: ${findProduct.name}, quantity: ${findProduct.quantity}]`,
        );
        return;
      }

      const orderProduct = { ...findProduct, ...product };
      orderProducts.push(orderProduct);
    });

    if (productIdsNotFount.length > 0) {
      throw new AppError(
        `Some products don't exist: ${productIdsNotFount.join(', ')}`,
      );
    }

    if (quantityGreaterStock.length > 0) {
      throw new AppError(
        `Selected quantity greater than available in stock: ${quantityGreaterStock.join(
          ', ',
        )}`,
      );
    }

    const order = await this.ordersRepository.create({
      customer,
      products: orderProducts,
    });

    await this.productsRepository.updateQuantity(orderProducts);

    return order;
  }
}

export default CreateOrderService;
