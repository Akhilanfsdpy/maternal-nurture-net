
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Baby, VideoIcon, Bell, MessageCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome to MaternaLink Health Monitoring System",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-cream/20 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden animate-fade-in">
        {/* Animation Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-health-blue to-health-light-blue p-8 relative overflow-hidden flex items-center justify-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome to MaternaLink</h2>
            <p className="text-white/90 mb-8 text-center max-w-md mx-auto">
              Your comprehensive maternal and baby health monitoring platform
            </p>
            
            {/* Animated elements */}
            <div className="flex justify-center items-center">
              <div className="relative w-64 h-64">
                {/* Mother figure */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full flex items-center justify-center animate-pulse-subtle">
                  <Heart className="h-16 w-16 text-white" />
                </div>
                
                {/* Baby figure */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-pulse-subtle" style={{ animationDelay: '1s' }}>
                  <Baby className="h-12 w-12 text-white" />
                </div>
                
                {/* Connection line */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white/40 rounded-full animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Feature icons */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <VideoIcon className="h-6 w-6 text-white" />
                </div>
                <p className="text-white/80 text-xs">Video Consults</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <p className="text-white/80 text-xs">Health Alerts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <p className="text-white/80 text-xs">AI Assistant</p>
              </div>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        {/* Login Form Side */}
        <div className="lg:w-1/2 bg-white p-8 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-health-blue to-health-light-blue flex items-center justify-center shadow-sm mx-auto">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold mt-4">Sign In to MaternaLink</h1>
            <p className="text-gray-500 mt-2">Access your personalized health dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-health-blue hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md transition-shadow duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? 
              <Button 
                variant="link" 
                className="text-health-blue hover:text-health-light-blue ml-1"
                onClick={() => navigate('/')}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
