"use client";

import axios from "axios";

const API_URL = "https://burgerlivery-api.vercel.app"; // URL da sua API

// Função de login
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Função de registro
export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};

// FUNCIONOU A CHAMADA
export const obtain = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};
