import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Dummy check - simulate duplicate user
    if (email === 'admin@uporia.com') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    console.log('🔐 New signup:', { name, email, password })

    // Later: Save user to DB, hash password, send verification email

    return NextResponse.json({ message: 'Signup successful' })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
