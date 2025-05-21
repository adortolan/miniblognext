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
    Router.push("/");
  }
  if (state && state.message === "Erro ao criar post") {
    alert("Erro ao criar post");
  }
  if (state && state.message === "Usuário não está logado") {
    Router.push("/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight ">
          Criar Post
        </h2>
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
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
                placeholder="Descreva o título do post"
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
                placeholder="Descreva o conteúdo do post"
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
                placeholder="inserir URL da imagem aqui"
                required
                autoComplete="image"
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
                placeholder="Tags do Post (ex: tag1, tag2, tag3)"
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
            className="w-full cursor-pointer rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold
                shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            disabled={pending}
          >
            Criar Postagem
          </button>
        </form>
      </div>
    </div>
  );
}
