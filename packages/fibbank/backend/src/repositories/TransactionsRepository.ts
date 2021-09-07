import Transaction from '../entities/Transaction';

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const emptyBalance = { income: 0, outcome: 0, total: 0 } as Balance;
    const balanceCalculated = this.transactions.reduce(
      (_balance, transaction) => {
        if (transaction.type === 'income') {
          _balance.income += transaction.value;
          return _balance;
        }

        _balance.outcome += transaction.value;
        return _balance;
      },
      emptyBalance,
    );

    balanceCalculated.total =
      balanceCalculated.income - balanceCalculated.outcome;

    return balanceCalculated;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
