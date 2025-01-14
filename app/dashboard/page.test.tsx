import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "./page";
import * as tasksService from "../services/tasksService";

jest.mock("../services/tasksService");

jest.mock("../services/authService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => "1"),
    },
    writable: true,
  });

  (tasksService.obtainTasks as jest.Mock).mockReset();
  (tasksService.createTask as jest.Mock).mockReset();
  (tasksService.editTask as jest.Mock).mockReset();
  (tasksService.deleteTask as jest.Mock).mockReset();
});

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
    (tasksService.obtainTasks as jest.Mock).mockReset();
    (tasksService.createTask as jest.Mock).mockReset();
    (tasksService.editTask as jest.Mock).mockReset();
    (tasksService.deleteTask as jest.Mock).mockReset();
  });

  it("exibe as tarefas corretamente após a requisição bem-sucedida", async () => {
    (tasksService.obtainTasks as jest.Mock).mockResolvedValue(mockData);

    render(<DashboardPage />);

    await waitFor(() => screen.getByText("Task 1"));
    await waitFor(() => screen.getByText("Task 2"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
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

    render(<DashboardPage />);

    const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
    fireEvent.change(input, { target: { value: "New Task" } });
    const button = screen.getByText("Criar");
    fireEvent.click(button);

    await waitFor(() => screen.getByText("New Task"));

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("edita uma tarefa corretamente", async () => {
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
    (tasksService.editTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Edited Task",
      description: "Edited Description",
      status_id: 1,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      user_id: 1,
    });

    render(<DashboardPage />);

    await waitFor(() => screen.getByText("Task 1"));

    const editButton = screen.getByTestId("editButton");
    fireEvent.click(editButton);

    const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
    fireEvent.change(input, { target: { value: "Edited Task" } });

    const saveButton = screen.getByText("Salvar");
    fireEvent.click(saveButton);

    await waitFor(() => screen.getByText("Edited Task"));

    expect(screen.getByText("Edited Task")).toBeInTheDocument();
  });

  it("marca uma tarefa como concluída", async () => {
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
    (tasksService.editTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status_id: 2,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      user_id: 1,
    });

    render(<DashboardPage />);

    await waitFor(() => screen.getByText("Task 1"));

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => screen.getByText("Task 1"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("deleta uma tarefa corretamente", async () => {
    window.confirm = jest.fn().mockReturnValue(true);
  
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
  
    (tasksService.deleteTask as jest.Mock).mockResolvedValue(undefined);
  
    render(<DashboardPage />);
  
    await waitFor(() => screen.getByText("Task 1"));
  
    const deleteButton = screen.getByTestId("excluirButton");
  
    fireEvent.click(deleteButton);
  
    await waitFor(() => {
      expect(screen.queryByText("Task 1")).toBeNull(); 
    });
  
    expect(tasksService.deleteTask).toHaveBeenCalledWith(1); 
  }); 
  
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

    render(<DashboardPage />);

    const input = screen.getByPlaceholderText("Adicione uma nova tarefa");
    fireEvent.change(input, { target: { value: "New Task" } });
    const button = screen.getByText("Criar");
    fireEvent.click(button);

    await waitFor(() =>
      screen.getByText("Erro ao criar tarefa. Error: Erro ao criar tarefa")
    );
  });

  it("exibe a mensagem de erro caso a requisição falhe", async () => {
    (tasksService.obtainTasks as jest.Mock).mockRejectedValue(
      new Error("Erro ao carregar os dados")
    );

    render(<DashboardPage />);

    await waitFor(() =>
      screen.getByText(
        "Erro ao carregar os dados. Tente novamente. Error: Erro ao carregar os dados"
      )
    );
  });

  it("exibe a mensagem de carregamento enquanto a requisição está em andamento", async () => {
    (tasksService.obtainTasks as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );

    render(<DashboardPage />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("exibe a mensagem 'Você ainda não tem tarefas cadastradas' se não houver dados", async () => {
    (tasksService.obtainTasks as jest.Mock).mockResolvedValue([]);

    render(<DashboardPage />);

    await waitFor(() =>
      screen.getByText("Você ainda não tem tarefas cadastradas")
    );
  });
});
