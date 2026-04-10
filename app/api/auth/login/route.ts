import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = [
  {
    email: 'test@uphoria.com',
    passwordHash: bcrypt.hashSync('test123', 10),
  },
]

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = users.find((u) => u.email === email)
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  return NextResponse.json({ token })
}
