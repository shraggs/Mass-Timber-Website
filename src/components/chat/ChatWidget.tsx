'use client';

import { useState } from 'react';
import { ChatToggleButton } from './ChatToggleButton';
import { ChatPanel } from './ChatPanel';
import { useChat } from './useChat';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      {isOpen && (
        <ChatPanel
          messages={messages}
          input={input}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}
