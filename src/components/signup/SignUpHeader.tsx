
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignUpHeaderProps {
  step: number;
}

const SignUpHeader: React.FC<SignUpHeaderProps> = ({ step }) => {
  return (
    <div className="relative z-10">
      <div className="mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold font-display">MaternaLink</span>
            <span className="text-xs text-white/80 -mt-1">Health Monitoring System</span>
          </div>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Start Your Health Journey</h1>
      <p className="text-white/90 mb-8 max-w-md">
        Join MaternaLink to track, monitor, and optimize your maternal and child health. Our comprehensive platform provides everything you need for a healthy journey.
      </p>
      
      <div className="space-y-6">
        {/* Animated steps */}
        <div className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all duration-300",
          step === 1 ? "bg-white/20" : "bg-white/10"
        )}>
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            step === 1 ? "bg-white text-health-blue" : "bg-white/20 text-white"
          )}>
            1
          </div>
          <div>
            <h3 className="font-medium">Personal Information</h3>
            <p className="text-sm text-white/70">Tell us who you are</p>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all duration-300",
          step === 2 ? "bg-white/20" : "bg-white/10"
        )}>
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            step === 2 ? "bg-white text-health-blue" : "bg-white/20 text-white"
          )}>
            2
          </div>
          <div>
            <h3 className="font-medium">Secure Your Account</h3>
            <p className="text-sm text-white/70">Create a strong password</p>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all duration-300",
          step === 3 ? "bg-white/20" : "bg-white/10"
        )}>
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            step === 3 ? "bg-white text-health-blue" : "bg-white/20 text-white"
          )}>
            3
          </div>
          <div>
            <h3 className="font-medium">Role Selection</h3>
            <p className="text-sm text-white/70">How will you use MaternaLink?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpHeader;
