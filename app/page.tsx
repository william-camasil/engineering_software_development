"use client";

// pages/login.js
// import Image from "next/image";
// import { login } from "./services/authService";
import styles from "./login.module.css"; // Importando o arquivo CSS
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // const response = await login(username, password);
      // Redirecionar para o dashboard após o login bem-sucedido
      router.push("/dashboard");
    } catch (error) {
      alert(`Erro ao fazer login. Tente novamente. ${error}`);
    }
  };

  const handleRegister = async () => {
    try {
      // const response = await login(username, password);
      // Redirecionar para o dashboard após o login bem-sucedido
      router.push("/register");
    } catch (error) {
      alert(`Erro ao fazer login. Tente novamente. ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Logo com texto abaixo */}
        {/* <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
          <p className={styles.logoText}>Minha Aplicação</p>
        </div> */}

        {/* Formulário de login */}
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className={styles.input}
            required
          />

          {/* Botões */}
          {/* <button type="submit" className={styles.loginButton}>
            Acessar
          </button> */}

          <button onClick={handleLogin} className={styles.loginButton}>
            Acessar
          </button>

          {/* Link para cadastro de novo usuário */}
          <a className={styles.registerButton} onClick={handleRegister}>
            Cadastrar novo usuário
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
