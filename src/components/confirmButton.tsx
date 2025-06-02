"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

export function ConfirmButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Você tem certeza que deseja excluir?")) {
          e.preventDefault();
        }
      }}
    >
      <TrashIcon className="h-5 w-5 inline-block mr-1 text-red-500 hover:opacity-40" />
    </button>
  );
}
