import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "./page";
import * as tasksService from "../services/tasksService";

// Mock da função `obtainTasks` para não fazer requisição real à API
jest.mock("../services/tasksService");

jest.mock("../services/authService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("DashboardPage", () => {
  const mockData = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status_id: 1,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      user_id: 1,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status_id: 1,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      user_id: 1,
    },
  ];

  beforeEach(() => {
    // Resetando o mock antes de cada teste
    (tasksService.obtainTasks as jest.Mock).mockReset();
    (tasksService.createTask as jest.Mock).mockReset();
    (tasksService.editTask as jest.Mock).mockReset();
    (tasksService.editTaskStatus as jest.Mock).mockReset();
    (tasksService.deleteTask as jest.Mock).mockReset();
  });

  it("exibe as tarefas corretamente após a requisição bem-sucedida", async () => {
    // Mock da função `obtainTasks` para retornar os dados mockados
    (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockData);

    // Renderiza o componente
    render(<DashboardPage />);

    // Verifica se as tarefas são exibidas na tela
    await waitFor(() => screen.getByText("Task 1"));
    await waitFor(() => screen.getByText("Task 2"));

    // Verifica se as tarefas estão na lista
    screen.getByText("Task 1");
    screen.getByText("Task 2");
  });

  it("adiciona uma nova tarefa com sucesso", async () => {
    const mockTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status_id: 1,
        created_at: "",
        updated_at: "",
        deleted_at: null,
        user_id: 1,
      },
    ];
    (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockTasks);
    (tasksService.createTask as jest.Mock).mockResolvedValue({
      id: 2,
      title: "New Task",
      description: "New Description",
      status_id: 1,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      user_id: 1,
    });

    // Renderiza o componente
    render(<DashboardPage />);

    // Simula a adição de uma nova tarefa
    const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
    fireEvent.change(input, { target: { value: "New Task" } });
    const button = screen.getByText("Criar");
    fireEvent.click(button);

    // Espera pela tarefa ser adicionada
    await waitFor(() => screen.getByText("New Task"));

    // Verifica se a nova tarefa está na lista
    screen.getByText("New Task");
  });

  // it("edita uma tarefa corretamente", async () => {
  //   const mockTasks = [
  //     {
  //       id: 1,
  //       title: "Task 1",
  //       description: "Description 1",
  //       status_id: 1,
  //       created_at: "",
  //       updated_at: "",
  //       deleted_at: null,
  //       user_id: 1,
  //     },
  //   ];
  //   (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockTasks);
  //   (tasksService.editTask as jest.Mock).mockResolvedValue({
  //     id: 1,
  //     title: "Edited Task",
  //     description: "Edited Description",
  //     status_id: 1,
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: null,
  //     user_id: 1,
  //   });

  //   // Renderiza o componente
  //   render(<DashboardPage />);

  //   // Simula a edição da tarefa
  //   const editButton = screen.getByAltText("Editar");
  //   fireEvent.click(editButton);

  //   const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
  //   fireEvent.change(input, { target: { value: "Edited Task" } });

  //   const saveButton = screen.getByText("Salvar");
  //   fireEvent.click(saveButton);

  //   // Espera pela tarefa ser editada
  //   await waitFor(() => screen.getByText("Edited Task"));

  //   // Verifica se a tarefa editada está na lista
  //   screen.getByText("Edited Task");
  // });

  // it("marca uma tarefa como concluída", async () => {
  //   const mockTasks = [
  //     {
  //       id: 1,
  //       title: "Task 1",
  //       description: "Description 1",
  //       status_id: 1,
  //       created_at: "",
  //       updated_at: "",
  //       deleted_at: null,
  //       user_id: 1,
  //     },
  //   ];
  //   (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockTasks);
  //   (tasksService.editTaskStatus as jest.Mock).mockResolvedValue({
  //     id: 1,
  //     title: "Task 1",
  //     description: "Description 1",
  //     status_id: 2,
  //     created_at: "",
  //     updated_at: "",
  //     deleted_at: null,
  //     user_id: 1,
  //   });

  //   // Renderiza o componente
  //   render(<DashboardPage />);

  //   // Simula marcar a tarefa como concluída
  //   const checkbox = screen.getByRole("checkbox");
  //   fireEvent.click(checkbox);

  //   // Espera a tarefa ser marcada como concluída
  //   await waitFor(() => screen.getByText("Task 1"));

  //   // Verifica se a tarefa foi concluída
  //   screen.getByText("Task 1");
  // });

  // it("deleta uma tarefa corretamente", async () => {
  //   const mockTasks = [
  //     {
  //       id: 1,
  //       title: "Task 1",
  //       description: "Description 1",
  //       status_id: 1,
  //       created_at: "",
  //       updated_at: "",
  //       deleted_at: null,
  //       user_id: 1,
  //     },
  //   ];
  //   (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockTasks);
  //   (tasksService.deleteTask as jest.Mock).mockResolvedValue(undefined);

  //   // Renderiza o componente
  //   render(<DashboardPage />);

  //   // Simula a exclusão de uma tarefa
  //   const deleteButton = screen.getByAltText("Excluir");
  //   fireEvent.click(deleteButton);

  //   // Espera a tarefa ser removida da lista
  //   await waitFor(() => expect(screen.queryByText("Task 1")).toBeNull());
  // });

  it("exibe erro ao tentar criar uma tarefa", async () => {
    const mockTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status_id: 1,
        created_at: "",
        updated_at: "",
        deleted_at: null,
        user_id: 1,
      },
    ];
    (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockTasks);
    (tasksService.createTask as jest.Mock).mockRejectedValue(
      new Error("Erro ao criar tarefa")
    );

    // Renderiza o componente
    render(<DashboardPage />);

    // Simula a criação de uma nova tarefa
    const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
    fireEvent.change(input, { target: { value: "New Task" } });
    const button = screen.getByText("Criar");
    fireEvent.click(button);

    // Verifica se a mensagem de erro é exibida
    await waitFor(() => screen.getByText("Erro ao criar tarefa."));
  });

  it("exibe a mensagem de erro caso a requisição falhe", async () => {
    // Mock da função `obtainTasks` para lançar um erro
    (tasksService.obtainTasks as jest.Mock).mockRejectedValue(
      new Error("Erro ao carregar os dados")
    );

    // Renderiza o componente
    render(<DashboardPage />);

    // Verifica se o estado de erro é exibido
    await waitFor(() =>
      screen.getByText("Erro ao carregar os dados. Tente novamente.")
    );
  });

  it("exibe a mensagem de carregamento enquanto a requisição está em andamento", () => {
    // Mock da função `obtainTasks` que retorna uma promise (simulando requisição)
    (tasksService.obtainTasks as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );

    // Renderiza o componente
    render(<DashboardPage />);

    // Verifica se o estado de carregamento é exibido
    screen.getByText("Carregando...");
  });

  // it("exibe a mensagem 'Nenhum dado encontrado' se não houver dados", async () => {
  //   // Mock da função `obtainTasks` para retornar um array vazio
  //   (tasksService.obtainTasks as jest.Mock).mockResolvedValue([]);

  //   // Renderiza o componente
  //   render(<DashboardPage />);

  //   // Verifica se a mensagem 'Nenhum dado encontrado' é exibida
  //   await waitFor(() => screen.getByText("Nenhum dado encontrado."));
  // });
});
