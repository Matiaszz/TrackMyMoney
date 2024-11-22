"use client";
import { useState } from "react";
import { register } from "../services/auth";
import { login } from "../services/auth";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      console.log("User registered:", data);
      await login({ username: formData.username, password: formData.password });
      alert("Registrado e logado com sucesso!");
    } catch (err) {
      alert("Erro, não foi registrado");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-black"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        className="text-black"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        className="text-black"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
