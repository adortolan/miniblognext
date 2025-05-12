import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Teste from "../app/Teste";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Teste />);

    const heading = screen.getByRole("heading", { level: 1 });
    const home = screen.getByText("Home");

    expect(home).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
