import React from 'react';
import SignupForm from './csr/SignupForm';
import Link from 'next/link';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-inherit">
      <div className="w-full max-w-md p-8 space-y-6 bg-transparent shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <SignupForm />
        <p className="text-center text-sm">
          Already have an account?
          <Link href="/users/login" className="text-primary hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
