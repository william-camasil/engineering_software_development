"use client";

import Image from "next/image";
import noneTasks from "../assets/images/noneTasks/noneTasks.png";
import editItem from "../assets/images/editItem/editItem.png";
import deleteItem from "../assets/images/deleteItem/deleteItem.png";
import moreItem from "../assets/images/moreItem/moreItem.png";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import {
  obtainTasks,
  createTask,
  editTask,
  editTaskStatus,
  deleteTask,
  TasksDataResponseType,
} from "../services/tasksService";
import Header from "../components/header";

const DashboardPage = () => {
  const [tasks, setTasks] = useState<TasksDataResponseType[]>([]);
  const [newTask, setNewTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  useEffect(() => {
    handleObtainData();
  }, []);

  const handleObtainData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtainTasks();
      setTasks(response);

      const updatedCompletedTasks = response.map(
        (task) => task.status_id === 2
      );
      setCompletedTasks(updatedCompletedTasks);
    } catch (error) {
      setError(`Erro ao carregar os dados. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const lastTaskId =
          tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;

        const nextId = lastTaskId + 1;

        const task = await createTask(newTask, "Descrição padrão", nextId);

        setTasks((prevTasks) => [...prevTasks, task]);
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          false,
        ]);
        setNewTask("");
      } catch (error) {
        setError("Erro ao criar tarefa.");
      }
    }
  };

  const handleCompleteTask = async (index: number) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);

    const updatedTasks = [...tasks];
    updatedTasks[index].status_id = updatedCompletedTasks[index] ? 2 : 1;
    setTasks(updatedTasks);

    try {
      const taskId = tasks[index].id;
      const updatedTask = await editTaskStatus(
        taskId,
        updatedTasks[index].status_id
      );
      console.log("Tarefa atualizada:", updatedTask);
    } catch (error) {
      setError("Erro ao atualizar o status da tarefa.");
    }
  };

  const handleDeleteTask = async (index: number) => {
    try {
      const taskId = tasks[index].id;
      console.log(`taskID: ${taskId}`);
      await deleteTask(taskId);

      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);

      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
    } catch (error) {
      setError("Erro ao excluir tarefa.");
    }
  };

  const handleEditTask = (index: number) => {
    setEditingTaskIndex(index);
    setNewTask(tasks[index].title);
  };

  const handleSaveTask = async () => {
    if (newTask.trim() !== "" && editingTaskIndex !== null) {
      try {
        const updatedTask = await editTask(
          tasks[editingTaskIndex].id,
          newTask,
          "Descrição editada"
        );
        const updatedTasks = [...tasks];
        updatedTasks[editingTaskIndex] = updatedTask;
        setTasks(updatedTasks);
        setNewTask("");
        setEditingTaskIndex(null);
      } catch (error) {
        setError("Erro ao editar tarefa.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.taskContainer}>
        <div className={styles.taskContainerSize}>
          <div className={styles.taskInput}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicione uma nova tarefa"
            />
            <button
              className={styles.imageButton}
              onClick={
                editingTaskIndex !== null ? handleSaveTask : handleAddTask
              }
            >
              <Image
                className={styles.buttonIcon}
                src={moreItem}
                alt={editingTaskIndex !== null ? "Salvar" : "Criar"}
                width={48}
                height={48}
              />
              {editingTaskIndex !== null ? "Salvar" : "Criar"}
            </button>
          </div>

          <div className={styles.taskList}>
            <div className={styles.stats}>
              <div>
                <p className={styles.statsTitle}>Tarefas criadas</p>
                <p className={styles.statsCreatedResult}>{tasks.length}</p>
              </div>
              <div>
                <p className={styles.statsTitle}>Concluídas</p>
                <p className={styles.statsCompletedResult}>
                  {completedTasks.filter((task) => task).length}
                </p>
              </div>
            </div>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            {tasks.length === 0 ? (
              <div className={styles.noTasks}>
                <Image
                  src={noneTasks}
                  alt="Sem tarefa"
                  width={48}
                  height={48}
                />
                <b>Você ainda não tem tarefas cadastradas</b>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className={`${styles.taskItem} ${
                    completedTasks[index] ? styles.completed : ""
                  } ${editingTaskIndex === index ? styles.editing : ""}`}
                >
                  <div
                    className={`${styles.checkboxContainer} ${
                      completedTasks[index] ? styles.checked : ""
                    }`}
                    onClick={() => handleCompleteTask(index)}
                  >
                    <div className={styles.circle}>
                      {completedTasks[index] && (
                        <span className={styles.checkmark}>✔</span>
                      )}
                    </div>
                  </div>
                  <p>{task.title}</p>
                  <button onClick={() => handleEditTask(index)}>
                    <Image src={editItem} alt="Editar" width={24} height={24} />
                  </button>
                  <button onClick={() => handleDeleteTask(index)}>
                    <Image
                      src={deleteItem}
                      alt="Excluir"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
