"use client";
import { useEffect, useState } from "react";

export interface Transaction {
  id: number;
  title: string;
  transaction_type: string;
  amount: string;
  date: string;
}

export const transactionTypeNames: { [key: string]: string } = {
  HE: "Saúde",
  EE: "Gastos Essenciais",
  IN: "Investimentos",
  LE: "Lazer",
  ED: "Educação",
  OT: "Outros",
};

export const useFetchTransactions = () => {
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

  return { transactions, loading, error };
};
