
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Import components
import SignUpHeader from '@/components/signup/SignUpHeader';
import PersonalInfoStep from '@/components/signup/PersonalInfoStep';
import PasswordStep from '@/components/signup/PasswordStep';
import UserTypeStep from '@/components/signup/UserTypeStep';
import AnimatedIllustrations from '@/components/signup/AnimatedIllustrations';
import FormNavigation from '@/components/signup/FormNavigation';

// Import hook
import useSignUpForm from '@/components/signup/useSignUpForm';

const SignUp: React.FC = () => {
  const {
    formData,
    step,
    isLoading,
    passwordStrength,
    passwordShaking,
    passwordSmiling,
    babyImageRef,
    motherImageRef,
    handleChange,
    handleUserTypeSelect,
    onAcceptTermsChange,
    nextStep,
    prevStep,
    handleSubmit
  } = useSignUpForm();
  
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-cream/20 to-white flex flex-col justify-center p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden animate-fade-in">
        {/* Left side - Illustration and info */}
        <div className="lg:w-1/2 bg-gradient-to-br from-health-blue to-health-light-blue p-8 text-white relative overflow-hidden">
          <SignUpHeader step={step} />
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          
          {/* Animated mother and baby illustrations */}
          <AnimatedIllustrations 
            passwordShaking={passwordShaking}
            passwordSmiling={passwordSmiling}
            motherImageRef={motherImageRef}
            babyImageRef={babyImageRef}
          />
        </div>
        
        {/* Right side - Form */}
        <div className="lg:w-1/2 bg-white p-8">
          <div className="h-full flex flex-col">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">
                {step === 1 && "Create Your Account"}
                {step === 2 && "Secure Your Account"}
                {step === 3 && "How Will You Use MaternaLink?"}
              </h2>
              <p className="text-gray-500 mt-2">
                {step === 1 && "Please provide your personal information"}
                {step === 2 && "Create a password to protect your account"}
                {step === 3 && "Select your primary role in the health journey"}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <PersonalInfoStep 
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              
              {/* Step 2: Password */}
              {step === 2 && (
                <PasswordStep 
                  formData={formData}
                  handleChange={handleChange}
                  passwordStrength={passwordStrength}
                  passwordShaking={passwordShaking}
                  passwordSmiling={passwordSmiling}
                />
              )}
              
              {/* Step 3: User Type */}
              {step === 3 && (
                <UserTypeStep 
                  formData={formData}
                  handleUserTypeSelect={handleUserTypeSelect}
                  onAcceptTermsChange={onAcceptTermsChange}
                />
              )}
              
              {/* Form Navigation */}
              <FormNavigation 
                step={step}
                isLoading={isLoading}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
