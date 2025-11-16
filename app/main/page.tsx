import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

// Server-only page - no client-side code
interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// Server-side data fetching function
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // Always fetch fresh data on the server
  })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function MainPage() {
  // Server-side authentication check using auth()
  const session = await auth()

  // Redirect to signin if no session
  if (!session) {
    redirect("/signin")
  }

  // Server-side data fetching
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Posts (Server-Side Rendered)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 12).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
              <div className="mt-4 text-xs text-gray-500">
                Post ID: {post.id} | User ID: {post.userId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

