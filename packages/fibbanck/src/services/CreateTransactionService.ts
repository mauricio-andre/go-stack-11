import Transaction from '../entities/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDto {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDto): Transaction {
    const validTypes = ['income', 'outcome'];
    const balance = this.transactionsRepository.getBalance();

    if (!validTypes.some(x => x === type)) {
      throw Error('Invalid operation type');
    }

    if (type === 'outcome' && balance.total < value) {
      throw Error('There is not enough balance for this operation');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
