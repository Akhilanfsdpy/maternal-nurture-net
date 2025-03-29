
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Baby, LineChart, Bell, Lock, Hospital, MessageCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import Chatbot from '@/components/Chatbot';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Chatbot />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-health-blue/5 to-health-light-blue/10 -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Introducing MaternaLink
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient">
              Maternal & Newborn Health Monitoring System
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              An integrated platform that combines IoT devices, AI analytics, and secure health data storage to ensure the wellbeing of mothers and newborns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-lg transition-shadow duration-300 text-white rounded-lg"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-health-light-blue text-health-blue hover:bg-health-light-blue/10 rounded-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative animate-fade-in">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-health-blue/20 to-health-light-blue/20 rounded-full animate-pulse-subtle" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-4 bg-gradient-to-br from-health-blue/30 to-health-light-blue/30 rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-8 bg-gradient-to-br from-health-blue/40 to-health-light-blue/40 rounded-full animate-pulse-subtle" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-panel p-8 rounded-full shadow-lg">
                  <Heart className="h-24 w-24 text-health-blue" />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-16 -right-4 glass-panel p-3 rounded-xl shadow-md animate-pulse-subtle">
                <LineChart className="h-8 w-8 text-health-light-blue" />
              </div>
              <div className="absolute bottom-16 -left-4 glass-panel p-3 rounded-xl shadow-md animate-pulse-subtle" style={{ animationDelay: '2s' }}>
                <Baby className="h-8 w-8 text-health-pink" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-health-cream/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Monitoring</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides end-to-end monitoring solutions for maternal and newborn health, from pregnancy through early childhood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Maternal Health Tracking"
              description="Monitor vital signs, track symptoms, and receive personalized insights throughout pregnancy."
              icon={<Heart className="h-6 w-6 text-health-blue" />}
              delay={0}
            />
            <FeatureCard
              title="Newborn Monitoring"
              description="Track your baby's growth, development milestones, and health metrics from birth."
              icon={<Baby className="h-6 w-6 text-health-pink" />}
              delay={100}
            />
            <FeatureCard
              title="AI-Powered Analytics"
              description="Receive early risk detection and personalized health recommendations based on your data."
              icon={<LineChart className="h-6 w-6 text-health-light-blue" />}
              delay={200}
            />
            <FeatureCard
              title="Real-time Alerts"
              description="Get immediate notifications for critical health changes or upcoming appointments."
              icon={<Bell className="h-6 w-6 text-health-blue" />}
              delay={300}
            />
            <FeatureCard
              title="Video Consultations"
              description="Connect with healthcare professionals through secure video calls for remote consultations."
              icon={<Video className="h-6 w-6 text-health-pink" />}
              delay={400}
            />
            <FeatureCard
              title="AI Health Assistant"
              description="Chat with our AI assistant for advice, tips, and answers to your health questions."
              icon={<MessageCircle className="h-6 w-6 text-health-light-blue" />}
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-health-blue to-health-light-blue">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Health Journey?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of families using MaternaLink to ensure better health outcomes for mothers and newborns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-health-blue hover:bg-white/90"
              >
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-health-blue to-health-light-blue flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-semibold">MaternaLink</span>
              </Link>
              <p className="text-gray-600 mb-4 max-w-md">
                An integrated maternal & newborn health monitoring system designed to ensure the wellbeing of mothers and babies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-600 hover:text-health-blue">Dashboard</Link></li>
                <li><Link to="/maternal-health" className="text-gray-600 hover:text-health-blue">Maternal Health</Link></li>
                <li><Link to="/newborn-health" className="text-gray-600 hover:text-health-blue">Newborn Health</Link></li>
                <li><Link to="/chat" className="text-gray-600 hover:text-health-blue">Chat Assistant</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-health-blue">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-blue">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-blue">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-blue">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MaternaLink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
