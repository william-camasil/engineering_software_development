"use client";

import axios from "axios";

const API_URL = "http://localhost:5000";

export type TasksDataResponseType = {
  title: string;
  id: number;
  status_id: number;
  created_at: string;
  deleted_at: string | null;
  description: string;
  user_id: number;
  updated_at: string;
};

// Obter as tarefas
export const obtainTasks = async (): Promise<TasksDataResponseType[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    console.log("response: ", response.data);
    return response.data; // Ajustado para corresponder ao formato do retorno
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw new Error("Erro ao obter dados da API");
  }
};

// Criar uma nova tarefa
export const createTask = async (
  title: string,
  description: string,
  id: number // Recebe o ID como parâmetro
): Promise<TasksDataResponseType> => {
  try {
    // Chama a API para criar a tarefa, agora com o ID passado
    const response = await axios.post(`${API_URL}/tasks`, {
      id, // Passa o ID gerado no frontend
      title,
      description,
      status_id: 1, // status_id 1 significa "não concluída"
    });
    console.log("Tarefa criada: ", response.data);
    return response.data; // Retorna a tarefa criada com o ID correto
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw new Error("Erro ao criar tarefa");
  }
};

// Editar uma tarefa existente
export const editTask = async (
  id: number,
  title: string,
  description: string
): Promise<TasksDataResponseType> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, {
      title,
      description,
    });
    console.log("Tarefa editada: ", response.data);
    return response.data; // Retorna a tarefa atualizada
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw new Error("Erro ao editar tarefa");
  }
};

// Atualizar o status de uma tarefa
export const editTaskStatus = async (
  id: number,
  status_id: number
): Promise<TasksDataResponseType> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, {
      status_id,
    });
    console.log("Status da tarefa atualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o status da tarefa:", error);
    throw new Error("Erro ao atualizar status");
  }
};

// Deletar uma tarefa
export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    console.log("Tarefa deletada: ", id);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw new Error("Erro ao deletar tarefa");
  }
};
