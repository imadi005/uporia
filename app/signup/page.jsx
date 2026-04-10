'use client'
import SignupForm from './SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] text-white px-4">
      <div className="w-full max-w-md bg-zinc-900/60 border border-white/[0.07] p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <SignupForm />
      </div>
    </div>
  )
}