'use client';

import { useState, useCallback } from 'react';
import { ChatToggleButton } from './ChatToggleButton';
import { ChatPanel } from './ChatPanel';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm the IW Mass Timber assistant. I can help you find contractors, learn about training programs, explore projects, or answer questions about mass timber construction. What can I help you with?",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: input.trim(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error('Chat request failed');

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = '';

        const assistantId = `assistant-${Date.now()}`;
        setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;
            const currentContent = assistantContent;
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { id: assistantId, role: 'assistant', content: currentContent },
            ]);
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again or contact info@iwmasstimber.com for assistance.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

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
