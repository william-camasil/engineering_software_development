"use client";

import axios from "axios";

const API_URL = "http://localhost:5000";

// Função para fazer login
export const login = async (email: string, password: string) => {
  try {
    // Envia a requisição para a API de usuários filtrando pelo email
    const response = await axios.get(`${API_URL}/users?email=${email}`);

    // Verifica se o usuário existe e se a senha corresponde
    const user = response.data.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Função para registrar um novo usuário
export const register = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    // Verifica se o email já está cadastrado
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    if (response.data.length > 0) {
      throw new Error("Este email já está cadastrado");
    }

    // Cria um novo usuário
    const newUser = { email, password };
    const userResponse = await axios.post(`${API_URL}/users`, newUser);

    return userResponse.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};
