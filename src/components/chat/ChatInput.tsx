'use client';

import { useRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-charcoal-900/10 p-3 flex gap-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask about mass timber..."
        rows={1}
        className="flex-1 resize-none rounded-xl border border-charcoal-900/15 px-3 py-2 text-sm text-charcoal-950 placeholder-charcoal-950/40 focus:outline-none focus:border-amber-500 transition-colors"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="shrink-0 w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
          </svg>
        )}
      </button>
    </form>
  );
}
