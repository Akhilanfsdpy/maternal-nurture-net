
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Baby, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface UserTypeStepProps {
  formData: {
    userType: string;
    acceptTerms: boolean;
  };
  handleUserTypeSelect: (type: string) => void;
  onAcceptTermsChange: (checked: boolean) => void;
}

const UserTypeStep: React.FC<UserTypeStepProps> = ({ formData, handleUserTypeSelect, onAcceptTermsChange }) => {
  return (
    <div className="space-y-6 flex-1">
      <div className="space-y-4">
        <div 
          className={cn(
            "relative p-4 rounded-lg border-2 transition-all cursor-pointer hover-card-effect",
            formData.userType === 'parent' 
              ? "border-health-blue bg-health-blue/5" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => handleUserTypeSelect('parent')}
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-health-pink/20 flex items-center justify-center">
              <Heart className="h-6 w-6 text-health-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Parent</h3>
              <p className="text-gray-500 text-sm">
                Track pregnancy progress, baby growth milestones, and access personalized health recommendations.
              </p>
            </div>
            {formData.userType === 'parent' && (
              <div className="absolute right-4 top-4 h-5 w-5 bg-health-blue rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
        
        <div 
          className={cn(
            "relative p-4 rounded-lg border-2 transition-all cursor-pointer hover-card-effect",
            formData.userType === 'doctor' 
              ? "border-health-blue bg-health-blue/5" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => handleUserTypeSelect('doctor')}
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-health-light-blue/20 flex items-center justify-center">
              <User className="h-6 w-6 text-health-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Healthcare Provider</h3>
              <p className="text-gray-500 text-sm">
                Monitor patients, schedule appointments, and provide medical recommendations securely.
              </p>
            </div>
            {formData.userType === 'doctor' && (
              <div className="absolute right-4 top-4 h-5 w-5 bg-health-blue rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
        
        <div 
          className={cn(
            "relative p-4 rounded-lg border-2 transition-all cursor-pointer hover-card-effect",
            formData.userType === 'caregiver' 
              ? "border-health-blue bg-health-blue/5" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => handleUserTypeSelect('caregiver')}
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-health-mint/20 flex items-center justify-center">
              <Baby className="h-6 w-6 text-health-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Caregiver</h3>
              <p className="text-gray-500 text-sm">
                Access shared profiles to help track health information, medications, and appointments.
              </p>
            </div>
            {formData.userType === 'caregiver' && (
              <div className="absolute right-4 top-4 h-5 w-5 bg-health-blue rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => onAcceptTermsChange(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="acceptTerms"
              className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the <Link to="#" className="text-health-blue hover:underline">Terms of Service</Link> and <Link to="#" className="text-health-blue hover:underline">Privacy Policy</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeStep;
