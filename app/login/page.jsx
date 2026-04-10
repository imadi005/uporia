'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // ✅ Redirect to dashboard or homepage
        router.push('/')
      } else {
        alert(data.error || 'Invalid login')
      }
    } catch {
      alert('Login failed. Try again later.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center">Login to Uporia</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded placeholder:text-zinc-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded placeholder:text-zinc-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-zinc-100 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-sm text-zinc-400 text-center mt-4 space-x-4">
            <Link href="/forgot" className="underline hover:text-white">Forgot Password?</Link>
            <Link href="/signup" className="underline hover:text-white">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
