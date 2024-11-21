"use client";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  title: string;
  transaction_type: string;
  amount: string;
  date: string;
}
const transactionTypeNames: { [key: string]: string } = {
  HE: "Saúde",
  EE: "Gastos Essenciais",
  IN: "Investimentos",
  LE: "Lazer",
  ED: "Educação",
  OT: "Outros",
};
const DashnoardPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/transactions/")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setError("Falha ao carregar transações.");
        setLoading(false);
      });
  }, []);

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
            transactions.map((transaction) => (
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

export default DashnoardPage;
