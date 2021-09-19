import React, { useEffect, useState } from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import Header from '../../components/Header';
import api from '../../services/api';
import formatDate from '../../utils/formatDate';
import formatValue from '../../utils/formatValue';
import { Card, CardContainer, Container, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  createdAt: Date;
  created_at: Date; // eslint-disable-line
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');

      if (!response.data?.transactions) {
        return;
      }

      const newTransactions: Transaction[] = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          createdAt: formatDate(
            transaction.createdAt || transaction.created_at,
          ),
        }),
      );

      setTransactions(newTransactions);

      const { income, outcome, total } = response.data.balance;
      const newBalance: Balance = {
        income: formatValue(income),
        outcome: formatValue(outcome),
        total: formatValue(total),
      };

      setBalance(newBalance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />

      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={incomeImg} alt="Income" />
            </header>

            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>

          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcomeImg} alt="Outcome" />
            </header>

            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>

          <Card total>
            <header>
              <p>Total</p>
              <img src={totalImg} alt="Total" />
            </header>

            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
