
import React from 'react';
import { useChatLogic } from '@/hooks/useChatLogic';
import ChatMessages from './ChatMessages';
import ToolsPanel from './ToolsPanel';
import ChatForm from './ChatForm';

const ChatInterface: React.FC = () => {
  const {
    input,
    setInput,
    messages,
    isTyping,
    showTools,
    showAISystem,
    messagesEndRef,
    handleSubmit,
    handleVoiceTranscription,
    toggleTools
  } = useChatLogic();

  return (
    <div className="flex flex-col h-[600px]">
      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        showAISystem={showAISystem}
        messagesEndRef={messagesEndRef}
      />
      
      {showTools && <ToolsPanel />}
      
      <ChatForm 
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        showTools={showTools}
        toggleTools={toggleTools}
      />
    </div>
  );
};

export default ChatInterface;
