import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

describe("DashboardPage", () => {
  it("renders Register form", () => {
    render(<DashboardPage />);

    screen.getByText("Dashboard");
  });
});
