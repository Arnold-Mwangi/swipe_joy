import React from 'react';
import Link from 'next/link';
import LoginForm from './csr/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-inherit">
      <div className="w-full max-w-md p-8 space-y-6 bg-transparent shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <LoginForm />
        <p className="text-center text-sm">
          Don&apos;t have an account?
          <Link href="/users/signUp" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
