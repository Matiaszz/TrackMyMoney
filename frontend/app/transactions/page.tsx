"use client";
import {
  Transaction,
  transactionTypeNames,
  useFetchTransactions,
} from "../utils/fetch";

const TransactionsPage = () => {
  const { transactions, loading, error } = useFetchTransactions();

  return (
    <div className="gap-6">
      <h1>Transações</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction: Transaction) => (
              <li key={transaction.id}>
                <strong>{transaction.title}</strong> - {transaction.amount} (
                {transactionTypeNames[transaction.transaction_type]}) -{" "}
                {transaction.date}
              </li>
            ))
          ) : (
            <li>Não há transações disponíveis</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TransactionsPage;
