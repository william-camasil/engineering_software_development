"use client";

import axios from "axios";

const API_URL = "http://localhost:8123/api/v1";

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

export const obtainTasks = async (
  user_id: number
): Promise<TasksDataResponseType[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks?user_id=${user_id}`);
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw new Error("Erro ao obter dados da API");
  }
};

export const createTask = async (
  title: string,
  description: string,
  id: number,
  user_id: number
): Promise<TasksDataResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, {
      id,
      title,
      description,
      status_id: 1,
      user_id,
    });
    console.log("Tarefa criada: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw new Error("Erro ao criar tarefa");
  }
};

export const editTask = async (
  id: number,
  status_id: number,
  title: string,
  description: string
): Promise<TasksDataResponseType> => {
  try {
    console.log(`status_id: `, status_id);

    const response = await axios.put(`${API_URL}/tasks/?task_id=${id}`, {
      title,
      description,
      status_id,
    });
    console.log("Tarefa editada: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw new Error("Erro ao editar tarefa");
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/?task_id=${id}`);
    console.log("Tarefa deletada: ", id);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw new Error("Erro ao deletar tarefa");
  }
};
