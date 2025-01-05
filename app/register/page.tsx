"use client";

import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = () => {
    // Processo de registro
    router.push("/login");
  };

  return (
    <div>
      <h1>Registro</h1>
      <form>
        {/* Adicione seu formulário de registro aqui */}
        <button onClick={handleRegister}>Registrar</button>
        <button type="button" onClick={() => router.push("/login")}>
          Voltar para Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
