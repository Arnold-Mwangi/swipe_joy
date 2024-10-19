'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

interface TelegramWebApp {
  initDataUnsafe: {
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
  startParam: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Check if it's a Telegram WebApp
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
          const tg = window.Telegram.WebApp
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
          } else {
            setAuthError('Telegram authentication failed')
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
            } else {
              setAuthError('Token verification failed')
            }
          } else {
            // No token found, user is not authorized
            setAuthError('No authentication token found')
          }
        }
      } catch (error) {
        console.error('Authorization error:', error)
        setAuthError('An error occurred during authorization')
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Swipe Joy</h1>
        <p className="text-xl mb-8 ">Connect with Telegram communities</p>
        {authError && (
          <p className="text-error mb-4">{authError}</p>
        )}
        {isAuthorized ? (
          <p className="text-success mb-4">You are authorized. Redirecting to products...</p>
        ) : (
          <Link href="/login" className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Login
          </Link>
        )}
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4 bg-accent-content shadow-md">
        <a
          className="flex items-center gap-2 text-secondary hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-accent hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-neutral-content hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
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