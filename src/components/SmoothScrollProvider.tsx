

'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const performance = usePerformanceOptimization();
  
  useEffect(() => {
    // Skip smooth scrolling for reduced motion or low performance devices
    if (performance.enableReducedMotion || !performance.enableHighPerformance) {
      return;
    }

    const lenis = new Lenis({
      duration: performance.connectionSpeed === 'slow' ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: performance.connectionSpeed === 'slow' ? 0.8 : 1,
      touchMultiplier: performance.connectionSpeed === 'slow' ? 1.5 : 2,
      infinite: false,
    });

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [performance]);

  return <>{children}</>;
}; 