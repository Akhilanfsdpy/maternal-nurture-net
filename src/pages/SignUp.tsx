
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  Baby, 
  User, 
  Mail, 
  Lock, 
  Check, 
  X,
  ChevronRight,
  Smile,
  Frown
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
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
  const isMobile = useIsMobile();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-cream/20 to-white flex flex-col justify-center p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden animate-fade-in">
        {/* Left side - Illustration and info */}
        <div className="lg:w-1/2 bg-gradient-to-br from-health-blue to-health-light-blue p-8 text-white relative overflow-hidden">
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
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          
          {/* Animated mother and baby illustrations */}
          <div className="absolute bottom-8 right-8 flex items-end">
            <div className="relative w-32 h-32 mr-4">
              <img 
                src="/mother-illustration.svg" 
                alt="Mother" 
                className="w-full h-full object-contain"
                ref={motherImageRef}
              />
            </div>
            <div className="relative w-24 h-24">
              <img 
                src="/baby-illustration.svg" 
                alt="Baby" 
                className={cn(
                  "w-full h-full object-contain transition-all",
                  passwordShaking ? "head-shake" : "",
                  passwordSmiling ? "head-nod" : ""
                )}
                ref={babyImageRef}
              />
            </div>
          </div>
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
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Step 2: Password */}
              {step === 2 && (
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
              )}
              
              {/* Step 3: User Type */}
              {step === 3 && (
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
                        onCheckedChange={(checked) => {
                          setFormData(prev => ({
                            ...prev,
                            acceptTerms: checked === true
                          }));
                        }}
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
              )}
              
              {/* Form Navigation */}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
