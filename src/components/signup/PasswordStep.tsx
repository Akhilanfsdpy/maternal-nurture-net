
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, X, Smile, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStepProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength: number;
  passwordShaking: boolean;
  passwordSmiling: boolean;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ 
  formData, 
  handleChange, 
  passwordStrength,
  passwordShaking,
  passwordSmiling 
}) => {
  return (
    <div className="space-y-6 flex-1">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />
          {passwordStrength > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {passwordStrength < 3 ? (
                <Frown className="h-5 w-5 text-yellow-500" />
              ) : (
                <Smile className="h-5 w-5 text-green-500" />
              )}
            </div>
          )}
        </div>
        
        {/* Password strength indicator */}
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Password Strength</span>
            <span>
              {passwordStrength === 0 && "Very Weak"}
              {passwordStrength === 1 && "Weak"}
              {passwordStrength === 2 && "Medium"}
              {passwordStrength === 3 && "Strong"}
              {passwordStrength === 4 && "Very Strong"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-300",
                passwordStrength === 0 && "w-0",
                passwordStrength === 1 && "w-1/4 bg-red-500",
                passwordStrength === 2 && "w-2/4 bg-yellow-500",
                passwordStrength === 3 && "w-3/4 bg-blue-500",
                passwordStrength === 4 && "w-full bg-green-500"
              )}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-xs text-gray-500">
            {formData.password.length >= 8 ? 
              <Check className="h-3 w-3 mr-1 text-green-500" /> : 
              <X className="h-3 w-3 mr-1 text-gray-300" />}
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            {/[A-Z]/.test(formData.password) ? 
              <Check className="h-3 w-3 mr-1 text-green-500" /> : 
              <X className="h-3 w-3 mr-1 text-gray-300" />}
            <span>Uppercase letter</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            {/[0-9]/.test(formData.password) ? 
              <Check className="h-3 w-3 mr-1 text-green-500" /> : 
              <X className="h-3 w-3 mr-1 text-gray-300" />}
            <span>Number</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            {/[^A-Za-z0-9]/.test(formData.password) ? 
              <Check className="h-3 w-3 mr-1 text-green-500" /> : 
              <X className="h-3 w-3 mr-1 text-gray-300" />}
            <span>Special character</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          {formData.confirmPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {formData.password === formData.confirmPassword ? (
                <Smile className="h-5 w-5 text-green-500" />
              ) : (
                <Frown className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        
        {formData.password && formData.confirmPassword && (
          <div className="flex items-center mt-1 text-xs">
            {formData.password === formData.confirmPassword ? (
              <>
                <Check className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-600">Passwords match</span>
              </>
            ) : (
              <>
                <X className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-600">Passwords don't match</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStep;
