import React, { useState, useEffect } from "react";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  transaction_type: string;
  date: string;
}

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/transactions");
        if (!response.ok) {
          throw new Error("Falha ao buscar transações");
        }
        const result = await response.json();
        setTransactions(result); // Supondo que a resposta seja uma lista de transações
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Carregando transações...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Transações</h1>
      {transactions.length === 0 ? (
        <p>Nenhuma transação encontrada.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>{transaction.title}</strong> - {transaction.amount} (
              {transaction.transaction_type}) - {transaction.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionPage;
