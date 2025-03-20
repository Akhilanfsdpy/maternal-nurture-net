import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';

const Index: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="pt-24 pb-20 px-6">
        <section className="max-w-6xl mx-auto py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-health-blue to-health-pink bg-clip-text text-transparent">
              Empowering Maternal & Newborn Health
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive digital solutions for mothers and healthcare providers to monitor, track, and enhance maternal and newborn well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-health-blue to-health-pink text-white" size="lg" asChild>
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Pregnancy Tracking"
              description="Track maternal health metrics, appointments, and important milestones during pregnancy."
              icon="activity"
            />
            <FeatureCard 
              title="Newborn Care"
              description="Monitor your baby's growth, vaccinations, and developmental milestones with expert guidance."
              icon="baby"
            />
            <FeatureCard 
              title="Health Records"
              description="Securely store and access medical records, prescriptions, and test results in one place."
              icon="fileText"
            />
            <FeatureCard 
              title="Nutritional Guidance"
              description="Get personalized diet plans and nutritional advice for optimal health during pregnancy and postpartum."
              icon="apple"
            />
            <FeatureCard 
              title="Expert Support"
              description="Connect with healthcare professionals for timely advice and support through secure messaging."
              icon="users"
            />
            <FeatureCard 
              title="Educational Resources"
              description="Access a library of verified articles, videos, and courses on maternal and newborn health."
              icon="bookOpen"
            />
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Maternal Nurture Net</h3>
              <p className="text-gray-600">Comprehensive digital solutions for maternal and newborn health management.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Pregnancy Tracking</li>
                <li>Newborn Care</li>
                <li>Health Records</li>
                <li>Nutritional Guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Blog</li>
                <li>Community</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>HIPAA Compliance</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} Maternal Nurture Net. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
