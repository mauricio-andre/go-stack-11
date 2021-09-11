class Transaction {
  id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  categoryId: string;

  createdAt: Date;

  updatedAt: Date;
}

export default Transaction;
