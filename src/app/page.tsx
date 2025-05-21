/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { listPosts } from "./lib/actions";

export default async function Home() {
  const posts = await listPosts();

  return (
    <main className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {posts.map((post) => (
          <div
            key={post.userId}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src={post.image}
              alt={post.titulo}
              className="mb-4 h-48 w-full rounded-lg object-cover"
              width={450}
              height={450}
            />
            <h2 className="text-xl font-semibold">{post.titulo}</h2>
            <p className="mt-2 text-gray-600">{post.conteudo}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tagsArray.map((tag: any) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
