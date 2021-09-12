import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { getCustomRepository, getRepository, In } from 'typeorm';
import uploadConfig from '../config/upload';
import Transaction from '../entities/Transaction';
import Category from '../entities/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: string;
  category: string;
}

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const pathname = path.join(uploadConfig.directory, filename);
    const readStream = fs.createReadStream(pathname);

    const parsers = csvParse({
      from_line: 2,
    });

    readStream.pipe(parsers);

    const csvTransactions: CSVTransaction[] = [];
    parsers.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value || !category) {
        return;
      }

      csvTransactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parsers.on('end', resolve));

    const categories = csvTransactions.map(transaction => transaction.category);
    const findCategories = await this.createNewCategories(categories);

    const transactions = await this.createNewTransactions(
      csvTransactions,
      findCategories,
    );

    await fs.promises.unlink(pathname);

    return transactions;
  }

  private async createNewCategories(categories: string[]): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);

    const existentCategories = await categoriesRepository.find({
      where: { title: In(categories) },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    const addCategoriesTitle = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoriesTitle.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    const findCategories = [...newCategories, ...existentCategories];

    return findCategories;
  }

  private async createNewTransactions(
    csvTransactions: CSVTransaction[],
    findCategories: Category[],
  ): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.create(
      csvTransactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: parseFloat(transaction.value),
        category: findCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    transactionsRepository.save(transactions);

    return transactions;
  }
}

export default ImportTransactionsService;
