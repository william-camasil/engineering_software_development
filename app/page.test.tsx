import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./page";
import { login } from "./services/authService";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

jest.mock("./services/authService");
jest.mock("next/navigation");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Login", () => {
  it("renders Login form", () => {
    render(<LoginPage />);

    screen.getByPlaceholderText("Digite seu e-mail");
    screen.getByPlaceholderText("Digite sua senha");
    screen.getByText("Acessar");
  });

  it("calls login function on submit with correct credentials", async () => {
    render(<LoginPage />);

    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const loginButton = screen.getByText("Acessar");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    login.mockResolvedValueOnce({ email: "test@example.com" });

    fireEvent.click(loginButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("shows error message when login fails", async () => {
    window.alert = jest.fn();

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const loginButton = screen.getByText("Acessar");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    login.mockRejectedValueOnce(new Error("Credenciais inválidas"));

    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Erro ao fazer login. Tente novamente.")
      )
    );
  });

  it("navigates to the register page when 'Cadastrar novo usuário' is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    usePathname.mockReturnValue("/");

    render(<LoginPage />);

    const registerButton = screen.getByText("Cadastrar novo usuário");

    fireEvent.click(registerButton);

    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});
