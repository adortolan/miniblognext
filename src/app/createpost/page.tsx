"use client";
import React from "react";
import { createPost } from "../lib/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const Router = useRouter();

  const [state, formAction, pending] = useActionState(createPost, {
    message: "",
  });
  if (state && state.message === "Post criado com sucesso") {
    Router.push("/posts");
  }
  if (state && state.message === "Erro ao criar post") {
    alert("Erro ao criar post");
  }
  if (state && state.message === "Usuário não está logado") {
    Router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Criar Post</h1>
      <form
        action={formAction}
        className="flex flex-col w-full max-w-md p-4 space-y-4"
      >
        <div>
          <label htmlFor="titulo" className="block text-sm/6 font-medium">
            Título
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="titulo"
              name="titulo"
              required
              autoComplete="titulo"
              placeholder="Título do Post"
              className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="conteudo" className="block text-sm/6 font-medium">
            Conteúdo
          </label>
          <div className="mt-2">
            <textarea
              id="conteudo"
              name="conteudo"
              required
              autoComplete="conteudo"
              placeholder="Conteúdo do Post"
              className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm/6 font-medium">
            Imagem
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="image"
              name="image"
              placeholder="URL da Imagem"
              className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm/6 font-medium">
            Tags
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="tags"
              name="tags"
              required
              autoComplete="tags"
              placeholder="Tags do Post"
              className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {state?.message && (
            <div className="text-red-500 text-sm mt-2">{state.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={pending}
        >
          Criar Postagem
        </button>
      </form>
    </div>
  );
}
