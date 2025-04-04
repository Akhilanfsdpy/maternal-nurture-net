
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  isLoading: boolean;
  prevStep: () => void;
  nextStep: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  step,
  isLoading,
  prevStep, 
  nextStep 
}) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      {step > 1 ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
        >
          Back
        </Button>
      ) : (
        <div className="text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-health-blue hover:underline">Log in</Link>
        </div>
      )}
      
      {step < 3 ? (
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md transition-shadow duration-300"
        >
          Continue <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md transition-shadow duration-300"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
