import Logout from "@/app/logout/page";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import { useActionState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  (useActionState as jest.Mock).mockReturnValue([{ message: "" }, jest.fn()]);
  // iniciar useRouter

  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
  });
});

describe("Logout", () => {
  it("Deve renderizar o componente Logout", () => {
    const { getByText } = render(<Logout />);

    expect(getByText("Você tem certeza que deseja sair?")).toBeInTheDocument();
  });

  it("Deve chamar o router.push quando o logout for realizado com sucesso", async () => {
    const formAction = jest.fn();
    (useActionState as jest.Mock).mockReturnValue([
      { message: "Logout realizado com sucesso" },
      formAction,
      false,
    ]);

    const router = useRouter();
    const { getByText } = render(<Logout />);
    const button = getByText("Sair");
    fireEvent.click(button);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/login");
    });
  });

  it("Deve cancelar o logout e voltar para a página inicial", () => {
    const router = useRouter();
    const { getByText } = render(<Logout />);
    const button = getByText("Cancelar");
    fireEvent.click(button);

    expect(router.push).toHaveBeenCalledWith("/");
  });
});
