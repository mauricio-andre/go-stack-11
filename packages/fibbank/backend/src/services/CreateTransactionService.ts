import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../entities/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../entities/Category';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const validTypes = ['income', 'outcome'];
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionsRepository.getBalance();

    if (!validTypes.some(x => x === type)) {
      throw new AppError('Invalid operation type');
    }

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('There is not enough balance for this operation');
    }

    const categoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    let categoryId = categoryExists?.id;
    if (!categoryId) {
      const createCategory = new CreateCategoryService();
      const { id: newCategoryId } = await createCategory.execute({
        title: category,
      });

      categoryId = newCategoryId;
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      categoryId,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
