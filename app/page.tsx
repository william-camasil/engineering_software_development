"use client";

import { useState } from "react";
import { login } from "./services/authService";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Header from "./components/header";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      if (user && user.user_id) {
        localStorage.setItem("user_id", user.user_id.toString());
      }

      router.push("/dashboard");
    } catch (error) {
      alert(`Erro ao fazer login. Tente novamente. ${error}`);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleLogin}>
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

          <a className={styles.registerButton} onClick={handleRegister}>
            Cadastrar novo usuário
          </a>

          <button type="submit" className={styles.loginButton}>
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
