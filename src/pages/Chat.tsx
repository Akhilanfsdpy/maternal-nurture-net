
import React from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Health Assistant</h1>
            <p className="text-gray-600 mt-2">
              Chat with our AI assistant about maternal and newborn health questions
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
