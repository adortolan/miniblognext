/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostById, updatePost } from "@/app/lib/actions";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ postid: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { postid } = await params;

  const post = await getPostById(postid);
  if (!post) return notFound();

  return (
    <main className="max-w-xl mx-auto py-14">
      <h1 className="text-2xl font-bold mb-6">Editar Post</h1>
      <form
        className="space-y-4"
        action={async (formData: any) => {
          "use server";
          await updatePost(post.id, formData);
          redirect("/userposts");
        }}
      >
        <div>
          <label className="block mb-1 font-medium">Título</label>
          <input
            name="titulo"
            defaultValue={post.titulo}
            className="w-full border rounded px-3 py-2 bg-gray-600 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Conteúdo</label>
          <textarea
            name="conteudo"
            defaultValue={post.conteudo}
            className="w-full border rounded px-3 py-2 bg-gray-600 text-white"
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Imagem (URL)</label>
          <input
            name="image"
            defaultValue={post.image}
            className="w-full border rounded px-3 py-2 bg-gray-600 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Tags (separadas por vírgula)
          </label>
          <input
            name="tags"
            defaultValue={post.tagsArray?.join(", ")}
            className="w-full border rounded px-3 py-2 bg-gray-600 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar Alterações
        </button>
      </form>
    </main>
  );
}
