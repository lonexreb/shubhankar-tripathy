import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
  onComplete?: () => void;
}

interface UseTypingAnimationReturn {
  displayText: string;
  isComplete: boolean;
  cursorVisible: boolean;
}

export function useTypingAnimation({
  text,
  speed = 30,
  startDelay = 0,
  enabled = true,
  onComplete,
}: UseTypingAnimationOptions): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const cursorTimerRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const startTyping = useCallback(() => {
    if (!enabled) return;

    indexRef.current = 0;
    setDisplayText('');
    setIsComplete(false);

    const type = () => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayText(text.slice(0, indexRef.current));
        timerRef.current = window.setTimeout(type, speed);
      } else {
        setIsComplete(true);
        onCompleteRef.current?.();
      }
    };

    timerRef.current = window.setTimeout(type, startDelay);
  }, [text, speed, startDelay, enabled]);

  useEffect(() => {
    startTyping();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [startTyping]);

  // Cursor blink
  useEffect(() => {
    cursorTimerRef.current = window.setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => {
      if (cursorTimerRef.current) window.clearInterval(cursorTimerRef.current);
    };
  }, []);

  return { displayText, isComplete, cursorVisible };
}
