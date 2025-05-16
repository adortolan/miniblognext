import { createLoginUser, loginUser, logoutUser } from "../app/lib/actions";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("../app/lib/firebase/config", () => {
  const mockSignOut = jest.fn();
  return {
    auth: {
      signOut: mockSignOut,
    },
  };
});

jest.mock("firebase/auth", () => {
  const mockCreateUserWithEmailAndPassword = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockSignInWithEmailAndPassword = jest.fn();
  return {
    getAuth: jest.fn(() => ({
      // Mock da instância de autenticação, se necessário
    })),
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    updateProfile: mockUpdateProfile,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  };
});

describe("Actions", () => {
  //criar um teste para a função createLoginUser
  it("Deve retornar erro de senhas não conferem", async () => {
    const formData = new FormData();
    formData.append("email", "teste@test.com");
    formData.append("name", "Teste");
    formData.append("password", "123");
    formData.append("passwordConfirm", "123456");

    const result = await createLoginUser({}, formData);
    expect(result).toEqual({
      message: "As senhas não conferem",
    });
    expect(result).toHaveProperty("message");
  });

  it("Deve criar um usuário com sucesso", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: {
        uid: "123456",
        displayName: "Teste",
        email: "teste@teste.com",
      },
    });

    (updateProfile as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("email", "teste@test.com");
    formData.append("name", "Teste");
    formData.append("password", "123456");
    formData.append("passwordConfirm", "123456");

    const result = await createLoginUser({}, formData);
    expect(result).toEqual({
      message: "Usuário criado com sucesso",
    });
  });

  it("Deve apresentar erro ao criar o usuário", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("Tente mais tarde")
    );

    (updateProfile as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("email", "teste@test.com");
    formData.append("name", "Teste");
    formData.append("password", "123456");
    formData.append("passwordConfirm", "123456");

    const result = await createLoginUser({}, formData);
    expect(result).toEqual({
      message: "Erro ao criar usuário: Tente mais tarde",
    });
  });

  it("Deve fazer o logout e deletar o cookie", async () => {
    const mockDelete = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      delete: mockDelete,
    });

    const result = await logoutUser();
    expect(result).toEqual({
      message: "Logout realizado com sucesso",
    });
    expect(result).toHaveProperty("message");
  });

  it("Deve fazer o login com sucesso", async () => {
    const formData = new FormData();
    formData.append("email", "teste@teste.com");
    formData.append("password", "123456");

    (cookies as jest.Mock).mockReturnValue({
      set: jest.fn(),
    });

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: {
        getIdToken: jest.fn().mockResolvedValue("token"),
      },
    });

    const result = await loginUser({}, formData);

    expect(result).toEqual({
      message: "Login realizado com sucesso",
    });
    expect(result).toHaveProperty("message");
  });
});
