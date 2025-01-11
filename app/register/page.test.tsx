import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "./page";
import { useRouter } from "next/navigation";
import { register } from "../services/authService";

// Mocking the necessary modules
jest.mock("../services/authService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("RegisterPage", () => {
  it("renders the register form with email, password and confirm password inputs", () => {
    render(<RegisterPage />);

    // Check if the form elements are present
    expect(
      screen.getByPlaceholderText("Digite seu e-mail")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repita a senha")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument(); // Verifying the submit button
  });

  it("should call the register function on form submission", async () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    // Mock the register function to resolve successfully
    register.mockResolvedValueOnce(undefined);

    render(<RegisterPage />);

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const confirmPasswordInput = screen.getByPlaceholderText("Repita a senha");
    const submitButton = screen.getByText("Cadastrar");

    // Simulating user typing and submitting the form
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    // Waiting for async operation to complete
    await waitFor(() => {
      // Asserting that router.push was called
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("should show an error alert if the registration fails", async () => {
    // Mock the register function to reject with an error
    register.mockRejectedValueOnce(new Error("Registration failed"));

    // Mock window.alert
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

    // Waiting for async operation to complete
    await waitFor(() => {
      // Asserting that the error alert is called
      expect(window.alert).toHaveBeenCalledWith(
        "Erro ao registrar. Tente novamente. Error: Registration failed"
      );
    });
  });
});
