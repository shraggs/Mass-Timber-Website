'use client';

import { useEffect, useRef, useState } from 'react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

interface Position {
  right: number;
  bottom: number;
}

const STORAGE_KEY = 'chat-button-position-v2';
const LEGACY_STORAGE_KEY = 'chat-button-position';
const HOLD_DURATION_MS = 2000;
const DRAG_THRESHOLD_PX = 6;
const BUTTON_SIZE = 56;
const EDGE_MARGIN = 16;
const DEFAULT_OFFSET = 24;

function clampToViewport(pos: Position): Position {
  if (typeof window === 'undefined') return pos;
  const maxRight = window.innerWidth - BUTTON_SIZE - EDGE_MARGIN;
  const maxBottom = window.innerHeight - BUTTON_SIZE - EDGE_MARGIN;
  return {
    right: Math.max(EDGE_MARGIN, Math.min(pos.right, maxRight)),
    bottom: Math.max(EDGE_MARGIN, Math.min(pos.bottom, maxBottom)),
  };
}

function getDefaultPosition(): Position {
  return { right: DEFAULT_OFFSET, bottom: DEFAULT_OFFSET };
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [dragArmed, setDragArmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number; right: number; bottom: number } | null>(null);
  const movedDuringPressRef = useRef(false);

  // Load persisted position on mount
  useEffect(() => {
    // Wipe legacy absolute-pixel position so it can't drag the button into the middle
    try { localStorage.removeItem(LEGACY_STORAGE_KEY); } catch { /* ignore */ }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? (JSON.parse(raw) as Position) : null;
      const valid = stored && typeof stored.right === 'number' && typeof stored.bottom === 'number';
      setPosition(clampToViewport(valid ? stored : getDefaultPosition()));
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
    pointerDownRef.current = { x: e.clientX, y: e.clientY, right: position.right, bottom: position.bottom };
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
      // Pointer moves right/down -> right/bottom offsets shrink
      setPosition(
        clampToViewport({
          right: pointerDownRef.current.right - dx,
          bottom: pointerDownRef.current.bottom - dy,
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
      style={{ right: position.right, bottom: position.bottom, touchAction: 'none' }}
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
