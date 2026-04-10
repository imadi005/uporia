'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
  
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  
    const data = await res.json()
    console.log('📦 Response:', data) // ✅ log this!
  
    if (!res.ok) {
      console.warn('❌ API returned error:', data)
      setError(data.error || 'Something went wrong')
      return
    }
  
    localStorage.setItem('uphoria_token', data.token)
    console.log('✅ Login successful, redirecting to dashboard')
    router.push('/dashboard')
  }
  
  
  return (
    <form onSubmit={handleLogin} className="space-y-5 w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-white text-center">Welcome Back 👋</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-black/30 text-white focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-black/30 text-white focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
      >
        Log In
      </button>
    </form>
  )
}
