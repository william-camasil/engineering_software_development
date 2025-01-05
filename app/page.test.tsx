// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import LoginPage from "./page";
// import { login } from "./services/authService";
// import { useRouter } from "next/navigation";

// Mockar as funções externas
jest.mock("./services/authService");
jest.mock("next/navigation");

describe("LoginPage", () => {
  it("renders Login form", () => {
    render(<LoginPage />);

    // Verificar se os elementos da tela estão presentes
    screen.getByPlaceholderText("Digite seu e-mail");
    screen.getByPlaceholderText("Digite sua senha");
    screen.getByText("Acessar");
  });

  // it("handles login successfully and redirects", async () => {
  //   // Mockar o comportamento da função login
  //   login.mockResolvedValueOnce({ success: true });

  //   // Mockar o redirecionamento
  //   const pushMock = jest.fn();
  //   useRouter.mockReturnValue({ push: pushMock });

  //   render(<LoginPage />);

  //   // Preencher o formulário
  //   fireEvent.change(screen.getByPlaceholderText("Username"), {
  //     target: { value: "user" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Password"), {
  //     target: { value: "password" },
  //   });

  //   // Clicar no botão de login
  //   fireEvent.click(screen.getByText("Entrar"));

  //   // Esperar o redirecionamento
  //   await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard"));
  // });

  // it("handles login failure and shows error", async () => {
  //   // Mockar o erro da função login
  //   login.mockRejectedValueOnce(new Error("Login failed"));

  //   render(<LoginPage />);

  //   // Preencher o formulário com dados incorretos
  //   fireEvent.change(screen.getByPlaceholderText("Username"), {
  //     target: { value: "user" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Password"), {
  //     target: { value: "wrongpassword" },
  //   });

  //   // Clicar no botão de login
  //   fireEvent.click(screen.getByText("Entrar"));

  //   // Esperar que o erro seja mostrado
  //   await waitFor(() =>
  //     expect(window.alert).toHaveBeenCalledWith("Erro ao fazer login. Tente novamente.")
  //   );
  // });
});
