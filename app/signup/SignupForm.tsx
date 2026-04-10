'use client'

import { useState } from 'react'

export default function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
  
      const data = await res.json()
  
      if (res.ok) {
        alert('Signup successful! You can now log in.')
        // redirect to login if you want
      } else {
        alert(data.error || 'Something went wrong.')
      }
    } catch {
      alert('Something went wrong. Try again later.')
    }
  
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-md placeholder:text-zinc-400"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-md placeholder:text-zinc-400"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-md placeholder:text-zinc-400"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-zinc-100 transition"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}
