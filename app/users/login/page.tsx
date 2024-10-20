import React from 'react';
import LoginForm from './CSR/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-inherit">
      <div className="w-full max-w-md p-8 space-y-6 bg-transparent shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <LoginForm /> 
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
