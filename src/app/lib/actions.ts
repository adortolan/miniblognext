/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/app/lib/firebase/config";
import { cookies } from "next/headers";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { verifyIdToken } from "@/app/lib/firebase/admin";
import { getDocs, doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function createLoginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const name = formData.get("name") as string;

  if (password !== passwordConfirm) {
    return { message: "As senhas não conferem" };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    console.log("User created:", user);
  } catch (error: any) {
    return {
      message: `Erro ao criar usuário: ${error.message}`,
    };
  }

  return { message: "Usuário criado com sucesso" };
}

export async function loginUser(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    console.log("User logged in token:", token);
  } catch (error: any) {
    return {
      message: `Erro ao fazer login: ${error.message}`,
    };
  }
  return { message: "Login realizado com sucesso" };
}

export async function logoutUser() {
  try {
    await auth.signOut();
    const cookieStore = cookies();
    (await cookieStore).delete("token");

    console.log("User logged out");
  } catch (error: any) {
    return {
      message: `Erro ao fazer logout: ${error.message}`,
    };
  }
  return { message: "Logout realizado com sucesso" };
}

export async function createPost(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  const titulo = formData.get("titulo") as string;
  const conteudo = formData.get("conteudo") as string;
  const image = formData.get("image") as string;
  const tags = formData.get("tags") as string;

  try {
    new URL(image);
  } catch (error: any) {
    return {
      message: `URL da imagem inválida: ${error.message}`,
    };
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return { message: "Usuário não está logado" };
  }

  let decodedToken: any;

  //criar uma promisse para verificar o token
  // e retornar o uid do usuário
  // e verificar se o token é válido

  try {
    decodedToken = await verifyIdToken(token);
  } catch (error: any) {
    const cookieStore = cookies();
    (await cookieStore).delete("token");
    return {
      message: `Erro ao verificar token: ${error.message}`,
    };
  }

  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
  if (tagsArray.length > 5) {
    return {
      message: "Máximo de 5 tags",
    };
  }

  // criar um insert de post no banco de dados firebase
  const postRef = collection(db, "posts");
  const postData = {
    userId: decodedToken.uid,
    titulo,
    conteudo,
    image,
    tagsArray,
    createdAt: Timestamp.now(),
  };

  try {
    await addDoc(postRef, postData);
    console.log("Post created:", postData);
    revalidatePath("/");
  } catch (error: any) {
    return {
      message: `Erro ao criar post: ${error.message}`,
    };
  }
  return { message: "Post criado com sucesso" };
}

export async function listPosts() {
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(postsRef);
  const postsList = postsSnapshot.docs.map((doc) => doc.data());
  return postsList;
}
export async function deletePost(postId: string) {
  const postRef = doc(db, "posts", postId);
  try {
    await deleteDoc(postRef);
    console.log("Post deleted:", postId);
  } catch (error: any) {
    return {
      message: `Erro ao deletar post: ${error.message}`,
    };
  }
  return { message: "Post deletado com sucesso" };
}
export async function updatePost(
  postId: string,
  formData: FormData
): Promise<{ message: string }> {
  const titulo = formData.get("titulo") as string;
  const conteudo = formData.get("conteudo") as string;
  const image = formData.get("image") as string;
  const tags = formData.get("tags") as string;

  try {
    new URL(image);
  } catch (error: any) {
    return {
      message: `URL da imagem inválida: ${error.message}`,
    };
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return { message: "Usuário não está logado" };
  }

  let decodedToken: any;

  try {
    decodedToken = await verifyIdToken(token);
  } catch (error: any) {
    const cookieStore = cookies();
    (await cookieStore).delete("token");
    return {
      message: `Erro ao verificar token: ${error.message}`,
    };
  }

  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
  if (tagsArray.length > 5) {
    return {
      message: "Máximo de 5 tags",
    };
  }

  // criar um insert de post no banco de dados firebase
  const postRef = doc(db, "posts", postId);
  const postData = {
    userId: decodedToken.uid,
    titulo,
    conteudo,
    image,
    tagsArray,
    createdAt: Timestamp.now(),
  };

  try {
    await setDoc(postRef, postData);
    console.log("Post updated:", postData);
  } catch (error: any) {
    return {
      message: `Erro ao atualizar post: ${error.message}`,
    };
  }
  return { message: "Post atualizado com sucesso" };
}

export async function getPost(postId: string) {
  const postRef = doc(db, "posts", postId);
  const postSnapshot = await getDoc(postRef);
  if (postSnapshot.exists()) {
    return postSnapshot.data();
  } else {
    return null;
  }
}
