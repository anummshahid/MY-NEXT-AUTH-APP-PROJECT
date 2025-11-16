"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/signin" })
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      Sign Out
    </button>
  )
}

