import Image from "next/image";
import { deletePost, getPostsByUserId } from "../lib/actions";
import Link from "next/link";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export default async function UserPostsPage() {
  const userPosts = await getPostsByUserId();

  return (
    <main className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Meus Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {!userPosts || userPosts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          userPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold">{post.titulo}</h2>
                <Image
                  src={post.image}
                  alt={post.titulo}
                  width={450}
                  height={450}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
                <p>{post.conteudo}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tagsArray.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <Link href={`/userposts/${post.id}`}>
                  <PencilSquareIcon className="h-5 w-5 inline-block mr-1 text-blue-500 hover:opacity-40" />
                </Link>
                <form
                  action={async () => {
                    "use server";
                    const id = post.id;
                    await deletePost(id);
                  }}
                >
                  <button type="submit">
                    <TrashIcon className="h-5 w-5 inline-block mr-1 text-red-500 hover:opacity-40" />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
