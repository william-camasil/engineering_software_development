"use client";

import { useState } from "react";
import { register } from "../services/authService";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import Header from "../components/header";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, confirmPassword);
      setMessage("Usuário registrado com sucesso!");
      setMessageType("success");
      router.push("/");
    } catch (error) {
      setMessage(`Erro ao registrar. Tente novamente. ${error}`);
      setMessageType("error");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repita a senha"
            className={styles.input}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className={styles.loginButton}>
            Cadastrar
          </button>
        </form>

        {message && (
          <div
            className={`${styles.message} ${
              messageType === "success" ? styles.success : styles.error
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
