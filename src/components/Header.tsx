
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Baby, LineChart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Dashboard', path: '/dashboard', icon: <LineChart className="h-4 w-4 mr-1" /> },
    { name: 'Maternal Health', path: '/maternal-health', icon: <Heart className="h-4 w-4 mr-1" /> },
    { name: 'Newborn Health', path: '/newborn-health', icon: <Baby className="h-4 w-4 mr-1" /> },
    { name: 'Chat Assistant', path: '/chat', icon: <MessageCircle className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-health-blue to-health-light-blue flex items-center justify-center shadow-sm">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold font-display">MaternaLink</span>
            <span className="text-xs text-gray-500 -mt-1">Health Monitoring System</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group flex items-center',
                location.pathname === link.path
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-700 hover:text-primary hover:bg-primary/5'
              )}
            >
              {link.icon}
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm rounded-lg border-health-light-blue text-health-blue hover:bg-health-light-blue/10"
          >
            Log In
          </Button>
          <Button 
            size="sm" 
            className="text-sm rounded-lg bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md transition-shadow duration-300"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center',
                  location.pathname === link.path
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                )}
              >
                {link.icon && React.cloneElement(link.icon, { className: 'h-5 w-5 mr-3' })}
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 flex flex-col space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-center border-health-light-blue text-health-blue hover:bg-health-light-blue/10"
            >
              Log In
            </Button>
            <Button 
              className="w-full justify-center bg-gradient-to-r from-health-blue to-health-light-blue hover:shadow-md transition-shadow duration-300"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
