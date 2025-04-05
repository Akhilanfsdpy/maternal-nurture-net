
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

export interface VerificationStep {
  id: number;
  name: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  description: string;
}

interface VerificationProgressProps {
  progress: number;
  steps: VerificationStep[];
}

const VerificationProgress: React.FC<VerificationProgressProps> = ({
  progress,
  steps,
}) => {
  const getStepIcon = (step: VerificationStep) => {
    switch (step.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full border border-gray-300" />;
    }
  };

  return (
    <div className="space-y-4 mt-4 verification-progress-container">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Verification in progress</span>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
      
      <div className="space-y-3 verification-steps">
        {steps.map(step => (
          <div 
            key={step.id} 
            className={`flex items-start p-2 rounded-md verification-step ${
              step.status === 'success' ? 'bg-green-50' :
              step.status === 'error' ? 'bg-red-50' :
              step.status === 'processing' ? 'bg-blue-50' : 'bg-gray-50'
            }`}
          >
            <div className="mr-3 mt-0.5">
              {getStepIcon(step)}
            </div>
            <div>
              <h4 className={`text-sm font-medium ${
                step.status === 'success' ? 'text-green-700' :
                step.status === 'error' ? 'text-red-700' :
                step.status === 'processing' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                {step.name}
              </h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationProgress;
