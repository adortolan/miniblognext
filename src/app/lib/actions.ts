"use server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase/config";

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
