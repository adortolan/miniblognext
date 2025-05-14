import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/login/page";

// Mock do useRouter do Next.js
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const mensagem = screen.getByText("Entre com a sua conta");
    expect(mensagem).toBeInTheDocument();
  });

  it("renders a button", () => {
    render(<Page />);

    const button = screen.getByRole("button", { name: /Entrar/i });
    expect(button).toBeInTheDocument();
  });

  it("validates the email input", () => {
    render(<Page />);

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });
  it("validates the password input", () => {
    render(<Page />);

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
