"use client";

import axios from "axios";

const API_URL = "http://localhost:5000";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`);

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

export const register = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    const response = await axios.get(`${API_URL}/users?email=${email}`);
    if (response.data.length > 0) {
      throw new Error("Este email já está cadastrado");
    }

    const newUser = { email, password };
    const userResponse = await axios.post(`${API_URL}/users`, newUser);

    return userResponse.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};
