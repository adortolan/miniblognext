/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/app/lib/firebase/config";
import { cookies } from "next/headers";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { getDocs, doc, setDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { getUserId } from "./getUserId";
import type { Posts } from "@/interfaces/posts";

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

  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
  if (tagsArray.length > 5) {
    return {
      message: "Máximo de 5 tags",
    };
  }

  const userId = await getUserId();
  if (!userId) {
    console.error("Usuário não está logado");
    return { message: "Usuário não está logado" };
  }

  // criar um insert de post no banco de dados firebase
  const postRef = collection(db, "posts");
  const postData = {
    userId: userId,
    titulo,
    conteudo,
    image,
    tagsArray,
    createdAt: Timestamp.now(),
  };

  try {
    await addDoc(postRef, postData);
    console.log("Post created:", postData);
    revalidatePath("userposts");
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
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

  const postsSnapshot = await getDocs(postsQuery);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsList as Posts[];
}

export async function deletePost(postId: string) {
  const postRef = doc(db, "posts", postId);
  try {
    await deleteDoc(postRef);
    revalidatePath("userposts");
    revalidatePath("/");

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

  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
  if (tagsArray.length > 5) {
    return {
      message: "Máximo de 5 tags",
    };
  }

  const userId = await getUserId();
  if (!userId) {
    console.error("Usuário não está logado");
    return { message: "Usuário não está logado" };
  }

  // criar um insert de post no banco de dados firebase
  const postRef = doc(db, "posts", postId);
  const postData = {
    userId: userId,
    titulo,
    conteudo,
    image,
    tagsArray,
    createdAt: Timestamp.now(),
  };

  try {
    await setDoc(postRef, postData);
    console.log("Post updated:", postData);
    revalidatePath("userposts");
    revalidatePath("/");
  } catch (error: any) {
    return {
      message: `Erro ao atualizar post: ${error.message}`,
    };
  }
  return { message: "Post atualizado com sucesso" };
}

export async function getPostsByUserId() {
  const userId = await getUserId();
  if (!userId) {
    console.error("Usuário não está logado");
    return null;
  }

  const postsRef = collection(db, "posts");
  const userPostsRef = query(
    postsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const postsSnapshot = await getDocs(userPostsRef);
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsList as Posts[];
}

export async function getPostById(postId: string): Promise<Posts | null> {
  const postRef = doc(db, "posts", postId);
  const postSnapshot = await getDoc(postRef);
  if (!postSnapshot.exists()) {
    return null;
  }
  return { id: postSnapshot.id, ...postSnapshot.data() } as Posts;
}
