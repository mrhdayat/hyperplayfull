"use client";

import { useCallback, useRef, useEffect } from "react";

// Pre-synthesized minimal UI sounds using Web Audio API
export const useAudio = () => {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to bypass browser autoplay policies
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const playHover = useCallback(() => {
    if (!audioCtx.current) return;

    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.current.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, audioCtx.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.current.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  const playClick = useCallback(() => {
    if (!audioCtx.current) return;

    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.current.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0, audioCtx.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.current.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.2);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.2);
  }, []);

  return { playHover, playClick };
};
