'use client'; // This marks the component as client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginButton from './LoginButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true) // Clear previous error messages

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { jwt, refreshToken } = await response.json();
        localStorage.setItem('authToken', jwt);
        localStorage.setItem('refreshToken', refreshToken); 
        router.push('../../components/products');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.' + error);
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-error">{error}</div>} {/* Display error message */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-4 py-2 border-b-2 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-4 py-2 border-b-2 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <LoginButton isLoading={isLoading}/> {/* CSR Button */}
    </form>
  );
};

export default LoginForm;
