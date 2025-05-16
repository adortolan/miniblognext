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
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm/6"
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
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm/6"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
