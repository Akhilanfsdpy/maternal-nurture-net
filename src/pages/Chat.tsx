
import React from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/chat/ChatInterface';
import EnhancedAISystem from '@/components/chat/EnhancedAISystem';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Health Assistant</h1>
            <p className="text-gray-600 mt-2">
              Chat with our AI assistant about maternal and newborn health questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <ChatInterface />
              </div>
            </div>
            
            <div className="space-y-6">
              <EnhancedAISystem />
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <h3 className="font-medium mb-2">Voice Assistant Features</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-health-blue">•</span>
                    <span>Multiple language support with Google Translate API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-health-blue">•</span>
                    <span>Regional dialect recognition for personalized care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-health-blue">•</span>
                    <span>Offline voice commands for essential functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-health-blue">•</span>
                    <span>RAG technology for reliable medical information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
