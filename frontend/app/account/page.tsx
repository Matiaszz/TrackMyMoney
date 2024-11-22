"use client";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/auth";
import { redirect } from "next/navigation";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        redirect("/auth/login");
        return;
      }

      try {
        const data = await getUserInfo(token);
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar informações do usuário:", err);
        // erro aqui
        redirect("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h2>Você não está logado</h2>
        <button onClick={() => redirect("/login")}>Login</button>
        <button onClick={() => redirect("/register")}>Cadastrar</button>
      </div>
    );
  }

  // Verifica se os dados estão presentes antes de exibir
  return (
    <div>
      <h2>Informações do Usuário</h2>
      <p>
        <strong>Nome:</strong> {user.first_name || "Não fornecido"}{" "}
        {user.last_name || "Não fornecido"}
      </p>
      <p>
        <strong>Email:</strong> {user.email || "Não fornecido"}
      </p>
      <p>
        <strong>Username:</strong> {user.username || "Não fornecido"}
      </p>
    </div>
  );
};

export default AccountPage;
