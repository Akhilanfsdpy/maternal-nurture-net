
import React from 'react';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';
import AlertPreferences from '@/components/alerts/AlertPreferences';
import PrescriptionScanner from '@/components/prescriptions/PrescriptionScanner';
import MedicationTracker from '@/components/prescriptions/MedicationTracker';

const Alerts: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Chatbot />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Alerts & Medications</h1>
              <p className="text-gray-500">Manage your alerts preferences and track medications</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AlertPreferences />
            <PrescriptionScanner />
          </div>
          
          <div className="mb-6">
            <MedicationTracker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alerts;
