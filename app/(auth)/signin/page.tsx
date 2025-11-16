import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import SignInButtons from "@/components/SignInButtons"

// Server component - NO client-side protection
export default async function SignInPage() {
  // Check session using auth()
  const session = await auth()

  // If session exists → redirect to /
  if (session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>
        <SignInButtons />
      </div>
    </div>
  )
}
