'use client';

import React from 'react';
import "../../spinner.css"

interface SignupButtonProps {
  isLoading: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className="w-full btn glass font-semibold py-2 px-4 rounded-md shadow-sm"
      disabled={isLoading}
    >
 {isLoading ? (
        <div className="flex items-center justify-center text-accent-content">
          <div className="loader mr-2"></div> 
          signing in...
        </div>
      ) : (
        'signup'
      )}
    </button>
  );
};

export default SignupButton;
