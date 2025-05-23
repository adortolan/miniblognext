import {
  createLoginUser,
  createPost,
  deletePost,
  loginUser,
  logoutUser,
} from "../app/lib/actions";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { cookies } from "next/headers";
import { addDoc, deleteDoc } from "firebase/firestore";
import { verifyIdToken } from "../app/lib/firebase/admin";
import { revalidatePath } from "next/cache";

// Mock do verifyIdToken
jest.mock("../app/lib/firebase/admin", () => ({
  verifyIdToken: jest.fn(),
}));

// Mock do addDoc do Firestore
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  Timestamp: { now: jest.fn(() => "mocked-timestamp") },
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

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

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

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

  it("Deve criar um post", async () => {
    // Mock do retorno do addDoc
    (addDoc as jest.Mock).mockResolvedValue({ id: "123456" });

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "token" }),
    });

    (verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123456",
    });

    const formData = new FormData();
    formData.append("titulo", "Teste");
    formData.append("conteudo", "Teste");
    formData.append("image", "https://example.com/image.jpg");
    formData.append("tags", "Teste");

    const result = await createPost({}, formData);
    expect(result).toEqual({
      message: "Post criado com sucesso",
    });
    expect(result).toHaveProperty("message");
  });

  it("Deve retornar mesagem de Usuário não está logado", async () => {
    // Mock do retorno do addDoc
    (addDoc as jest.Mock).mockResolvedValue({ id: "123456" });

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "" }),
    });

    (verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123456",
    });

    const formData = new FormData();
    formData.append("titulo", "Teste");
    formData.append("conteudo", "Teste");
    formData.append("image", "https://example.com/image.jpg");
    formData.append("tags", "Teste");

    const result = await createPost({}, formData);
    expect(result).toEqual({
      message: "Usuário não está logado",
    });
    expect(result).toHaveProperty("message");
  });

  it("Deve retornar mesagem de URL da imagem inválida", async () => {
    // Mock do retorno do addDoc
    (addDoc as jest.Mock).mockResolvedValue({ id: "123456" });

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "" }),
    });

    (verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123456",
    });

    const formData = new FormData();
    formData.append("titulo", "Teste");
    formData.append("conteudo", "Teste");
    formData.append("image", "Teste");
    formData.append("tags", "Teste");

    const result = await createPost({}, formData);
    expect(result).toEqual({
      message: "URL da imagem inválida: Invalid URL: Teste",
    });
    expect(result).toHaveProperty("message");
  });

  it("deve deletar o post e revalidar os caminhos", async () => {
    // Arrange
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);

    // Act
    const result = await deletePost("postIdTeste");

    // Assert
    expect(deleteDoc).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("userposts");
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(result).toEqual({ message: "Post deletado com sucesso" });
  });

  it("deve retornar mensagem de erro ao falhar", async () => {
    (deleteDoc as jest.Mock).mockRejectedValue(new Error("Falha ao deletar"));

    const result = await deletePost("postIdTeste");

    expect(result).toEqual({
      message: "Erro ao deletar post: Falha ao deletar",
    });
  });
});
