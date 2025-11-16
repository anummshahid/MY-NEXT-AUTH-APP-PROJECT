import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"
import SignOutButton from "./SignOutButton"

// Server component Navbar using auth()
export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              My App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-gray-700 font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <SignOutButton />
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
