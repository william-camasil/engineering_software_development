import { render, screen } from "@testing-library/react";
import RegisterPage from "./page";

jest.mock("next/navigation");

describe("RegisterPage", () => {
  it("renders Register form", () => {
    render(<RegisterPage />);

    screen.getByText("Registro");
  });
});
