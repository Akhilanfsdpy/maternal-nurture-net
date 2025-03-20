
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="py-8 px-4 sm:px-6 flex items-center justify-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-health-pink to-health-blue bg-clip-text text-transparent">
            Maternal Nurture Net
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Maternal Nurture Net. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
