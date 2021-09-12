import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../entities/Transaction';

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const emptyBalance = { income: 0, outcome: 0, total: 0 } as Balance;

    const transactions = await this.find();

    const balanceCalculated = transactions.reduce((_balance, transaction) => {
      if (transaction.type === 'income') {
        _balance.income += transaction.value;
        return _balance;
      }

      _balance.outcome += transaction.value;
      return _balance;
    }, emptyBalance);

    balanceCalculated.total =
      balanceCalculated.income - balanceCalculated.outcome;

    return balanceCalculated;
  }
}

export default TransactionsRepository;
