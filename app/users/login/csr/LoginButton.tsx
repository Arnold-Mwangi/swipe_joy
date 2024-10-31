'use client';

import React from 'react';
import "../../spinner.css"

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className="w-full btn glass font-semibold py-2 px-4 rounded-md shadow-sm"
      disabled={isLoading}
    >
 {isLoading ? (
        <div className="flex items-center justify-center text-accent-content">
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
