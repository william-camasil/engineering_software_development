"use client";

import axios from "axios";

const API_URL = "http://localhost:8123/api/v1";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    if (!response) {
      throw new Error("Credenciais inválidas");
    }

    return response.data;
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

    const newUser = {
      username: email,
      email,
      full_name: email,
      password,
    };

    const userResponse = await axios.post(`${API_URL}/user`, newUser);

    return userResponse.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};
