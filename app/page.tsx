import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-gray-600 mb-8">
            You are successfully authenticated. Explore the protected pages
            below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/main"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
            >
              View Posts (Static)
            </Link>
            <Link
              href="/1"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
            >
              View Item (Dynamic)
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

