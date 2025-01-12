import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "./page";
import { useRouter } from "next/navigation";
import { register } from "../services/authService";

jest.mock("../services/authService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("RegisterPage", () => {
  it("renders the register form with email, password and confirm password inputs", () => {
    render(<RegisterPage />);

    expect(
      screen.getByPlaceholderText("Digite seu e-mail")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repita a senha")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("should call the register function on form submission", async () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    register.mockResolvedValueOnce(undefined);

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Repita a senha");
    const submitButton = screen.getByText("Cadastrar");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show an error alert if the registration fails", async () => {
    register.mockRejectedValueOnce(new Error("Registration failed"));

    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Repita a senha");
    const submitButton = screen.getByText("Cadastrar");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Erro ao registrar. Tente novamente. Error: Registration failed"
      );
    });
  });
});
