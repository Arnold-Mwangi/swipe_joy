'use client';

import React from 'react';
import "./spinner.css"

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className="w-full btn btn-neutral text-primary font-semibold py-2 px-4 rounded-md shadow-sm hover:btn btn-secondary transition duration-300"
      disabled={isLoading}
    >
 {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="loader mr-2"></div> 
          Logging in...
        </div>
      ) : (
        'Login'
      )}
    </button>
  );
};

export default LoginButton;
