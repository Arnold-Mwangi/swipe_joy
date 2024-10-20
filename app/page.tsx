'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loader state
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;

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
          });

          if (response.ok) {
            setIsAuthorized(true);
          } else {
            setAuthError('Telegram authentication failed');
            router.push('/users/login'); // Redirect to login if not authorized
          }
        } else {
          const token = localStorage.getItem('authToken');
          const refreshToken = localStorage.getItem('refreshToken');
          console.log("refresh", refreshToken)
          if (token && refreshToken) {
            const response = await fetch('http://localhost:8080/auth/refresh_token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ refreshToken }), // Send the retrieved refresh token
            });
      
            if (response.ok) {
              setIsAuthorized(true);
            } else {
              setAuthError('Token verification failed');
              router.push('/users/login');
            }
          } else {
            setAuthError('No authentication token found');
            router.push('/users/login'); // Redirect if no token is found
          }
        }
      } catch (error) {
        console.error('Authorization error:', error);
        setAuthError('An error occurred during authorization');
        router.push('/users/login');
      } finally {
        setIsLoading(false); // Stop loading after check
      }
    };

    checkAuthorization();
  }, [router]);

  useEffect(() => {
    if (isAuthorized) {
      router.push('/components/products'); // Redirect authorized users to products
    }
  }, [isAuthorized, router]);

  // Show a loader while the app is checking for authorization
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Replace with your actual loader */}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Swipe Joy</h1>
        <p className="text-xl mb-8">Connect with Telegram communities</p>
        {authError && <p className="text-error mb-4">{authError}</p>}
      </main>
    </div>
  );
}
