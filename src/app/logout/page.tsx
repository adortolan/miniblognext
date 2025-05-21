"use client";

import { useActionState, useEffect } from "react";
import { logoutUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const [state, formAction] = useActionState(logoutUser, {
    message: "",
  });

  useEffect(() => {
    if (state && state.message === "Logout realizado com sucesso") {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
          Você tem certeza que deseja sair?
        </h2>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-3">
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold
                shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                Sair
              </button>
            </div>
          </form>
        </div>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full cursor-pointer rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold
                shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
