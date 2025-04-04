
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  userType: string;
}

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    userType: 'parent', // parent, doctor, caregiver
  });
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordShaking, setPasswordShaking] = useState(false);
  const [passwordSmiling, setPasswordSmiling] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const babyImageRef = useRef<HTMLImageElement>(null);
  const motherImageRef = useRef<HTMLImageElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'password') {
      // Simple password strength checker
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
    
    // Check password match for animation
    if (name === 'confirmPassword' && formData.password) {
      if (value !== formData.password && value.length > 3) {
        setPasswordShaking(true);
        setPasswordSmiling(false);
        setTimeout(() => setPasswordShaking(false), 600);
      } else if (value === formData.password && value.length > 3) {
        setPasswordSmiling(true);
        setPasswordShaking(false);
        setTimeout(() => setPasswordSmiling(false), 600);
      }
    }
  };

  const handleUserTypeSelect = (type: string) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
  };

  const onAcceptTermsChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast({
          title: "Please fill in all fields",
          description: "First name, last name, and email are required",
          variant: "destructive"
        });
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (!formData.password || formData.password.length < 8) {
        toast({
          title: "Password is too short",
          description: "Password must be at least 8 characters",
          variant: "destructive"
        });
        
        if (babyImageRef.current) {
          babyImageRef.current.classList.add('head-shake');
          setTimeout(() => {
            babyImageRef.current?.classList.remove('head-shake');
          }, 600);
        }
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please ensure both passwords match",
          variant: "destructive"
        });
        
        if (babyImageRef.current) {
          babyImageRef.current.classList.add('head-shake');
          setTimeout(() => {
            babyImageRef.current?.classList.remove('head-shake');
          }, 600);
        }
        return false;
      }
      
      if (passwordStrength < 3) {
        toast({
          title: "Password is too weak",
          description: "Please include uppercase, numbers, and special characters",
          variant: "destructive"
        });
        
        if (babyImageRef.current) {
          babyImageRef.current.classList.add('head-shake');
          setTimeout(() => {
            babyImageRef.current?.classList.remove('head-shake');
          }, 600);
        }
        return false;
      }
      
      // Show happy animation for success
      if (babyImageRef.current && motherImageRef.current) {
        babyImageRef.current.classList.add('head-nod');
        motherImageRef.current.classList.add('head-nod');
        setTimeout(() => {
          babyImageRef.current?.classList.remove('head-nod');
          motherImageRef.current?.classList.remove('head-nod');
        }, 600);
      }
      
      return true;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: "Terms acceptance required",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to MaternaLink! You can now log in.",
      });
      navigate('/login');
    }, 1500);
  };

  return {
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
  };
};

export default useSignUpForm;
