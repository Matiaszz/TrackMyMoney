"use client";
import { useState } from "react";
import { login } from "../../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log("User registered:", data);
      await login({ username: formData.username, password: formData.password });
      alert("logado com sucesso!");
    } catch (err) {
      alert("Erro, não foi logado");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        placeholder="Usuário"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        className="text-black"
        type="password"
        placeholder="Senha"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
