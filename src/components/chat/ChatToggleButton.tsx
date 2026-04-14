'use client';

import { useEffect, useRef, useState } from 'react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

interface Position {
  x: number;
  y: number;
}

const STORAGE_KEY = 'chat-button-position';
const HOLD_DURATION_MS = 2000;
const DRAG_THRESHOLD_PX = 6;
const BUTTON_SIZE = 56;
const EDGE_MARGIN = 16;

function clampToViewport(pos: Position): Position {
  if (typeof window === 'undefined') return pos;
  const maxX = window.innerWidth - BUTTON_SIZE - EDGE_MARGIN;
  const maxY = window.innerHeight - BUTTON_SIZE - EDGE_MARGIN;
  return {
    x: Math.max(EDGE_MARGIN, Math.min(pos.x, maxX)),
    y: Math.max(EDGE_MARGIN, Math.min(pos.y, maxY)),
  };
}

function getDefaultPosition(): Position {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return {
    x: window.innerWidth - BUTTON_SIZE - 24,
    y: window.innerHeight - BUTTON_SIZE - 24,
  };
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [dragArmed, setDragArmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number; buttonX: number; buttonY: number } | null>(null);
  const movedDuringPressRef = useRef(false);

  // Load persisted position on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? (JSON.parse(raw) as Position) : null;
      setPosition(clampToViewport(stored ?? getDefaultPosition()));
    } catch {
      setPosition(getDefaultPosition());
    }

    const onResize = () => setPosition((p) => (p ? clampToViewport(p) : p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const clearHoldTimer = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!position) return;
    pointerDownRef.current = { x: e.clientX, y: e.clientY, buttonX: position.x, buttonY: position.y };
    movedDuringPressRef.current = false;
    setDragArmed(false);
    e.currentTarget.setPointerCapture(e.pointerId);

    holdTimerRef.current = setTimeout(() => {
      setDragArmed(true);
    }, HOLD_DURATION_MS);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pointerDownRef.current) return;
    const dx = e.clientX - pointerDownRef.current.x;
    const dy = e.clientY - pointerDownRef.current.y;
    if (Math.abs(dx) > DRAG_THRESHOLD_PX || Math.abs(dy) > DRAG_THRESHOLD_PX) {
      movedDuringPressRef.current = true;
    }
    if (dragArmed) {
      setIsDragging(true);
      setPosition(
        clampToViewport({
          x: pointerDownRef.current.buttonX + dx,
          y: pointerDownRef.current.buttonY + dy,
        })
      );
    }
  };

  const handlePointerUp = () => {
    const wasDragging = isDragging;
    const wasShortPress = !dragArmed && !movedDuringPressRef.current;
    clearHoldTimer();
    pointerDownRef.current = null;

    if (wasDragging && position) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      } catch {
        /* ignore */
      }
    }

    setDragArmed(false);
    setIsDragging(false);

    if (wasShortPress) {
      onClick();
    }
  };

  const handlePointerCancel = () => {
    clearHoldTimer();
    pointerDownRef.current = null;
    setDragArmed(false);
    setIsDragging(false);
  };

  if (!position) return null;

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ left: position.x, top: position.y, touchAction: 'none' }}
      className={`fixed z-[1001] w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg transition-transform flex items-center justify-center ${
        dragArmed ? 'scale-110 ring-4 ring-amber-300 cursor-grabbing' : 'hover:bg-amber-600 hover:scale-105 cursor-grab'
      }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )}
    </button>
  );
}
