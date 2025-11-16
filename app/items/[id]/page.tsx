import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        cache: "no-store",
      }
    )
    if (!res.ok) {
      return null
    }
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }

  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The post with ID {id} does not exist.
            </p>
            <Link
              href="/main"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 inline-block"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Link
            href="/main"
            className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
          >
            ← Back to Posts
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
          <div className="text-gray-500 text-sm mb-6">
            Post ID: {post.id} | User ID: {post.userId}
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  )
}

