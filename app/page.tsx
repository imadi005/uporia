'use client'
import { useState, useEffect } from 'react'
import StartupBoot from './StartupBoot'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (booted) router.push('/dashboard')
  }, [booted, router])

  return <StartupBoot onComplete={() => setBooted(true)} />
}