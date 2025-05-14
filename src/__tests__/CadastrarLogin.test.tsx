import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/login/cadastrar/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const mensagem = screen.getByText("Cadastre-se para postar");
    expect(mensagem).toBeInTheDocument();
  });

  it("renders a button", () => {
    render(<Page />);

    const botao = screen.getByRole("button", { name: "Cadastrar" });
    expect(botao).toBeInTheDocument();
  });

  it("validates email input", () => {
    render(<Page />);

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });
  it("validates password input", () => {
    render(<Page />);

    const passwordInput = screen.getByLabelText("Senha");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });
  it("validates name input", () => {
    render(<Page />);

    const nameInput = screen.getByLabelText(/Nome/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("type", "text");
  });

  it("validates name is required", () => {
    render(<Page />);

    const nameInput = screen.getByLabelText(/Nome/i);
    expect(nameInput).toBeRequired();
  });
  it("validates email is required", () => {
    render(<Page />);

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeRequired();
  });
  it("validates password is required", () => {
    render(<Page />);

    const passwordInput = screen.getByLabelText("Senha");
    expect(passwordInput).toBeRequired();
  });
});
