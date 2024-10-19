'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Check if it's a Telegram WebApp
        const isTelegram = 'Telegram' in window
        
        if (isTelegram) {
          const tg = (window as any).Telegram.WebApp
          // Send user data to your backend
          const response = await fetch('/api/telegram-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: tg.initDataUnsafe.user,
              startParam: tg.startParam,
            }),
          })
          
          if (response.ok) {
            setIsAuthorized(true)
          }
        } else {
          // For browser, you might want to check a stored token or session
          const token = localStorage.getItem('authToken')
          if (token) {
            // Verify token with your backend
            const response = await fetch('/api/verify-token', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (response.ok) {
              setIsAuthorized(true)
            }
          }
        }
      } catch (error) {
        console.error('Authorization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthorization()
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      router.push('/products')
    }
  }, [isAuthorized, router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (isAuthorized) {
    return null // This will be briefly shown before redirecting
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Swipe Joy</h1>
        <p className="text-xl mb-8">Connect with Telegram communities</p>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4">
        <a
          className="flex items-center gap-2 text-secondary hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}