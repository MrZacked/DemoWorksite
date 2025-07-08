'use client';

import { useEffect, useState } from 'react';

interface PerformanceConfig {
  enableReducedMotion: boolean;
  enableHighPerformance: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export const usePerformanceOptimization = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>({
    enableReducedMotion: false,
    enableHighPerformance: true,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check device capabilities
    const isHighPerformanceDevice = () => {
      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      return memory >= 4 && cores >= 4;
    };

    // Check connection speed
    const getConnectionSpeed = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        return connection.effectiveType === '4g' || connection.effectiveType === '3g' 
          ? 'fast' 
          : 'slow';
      }
      return 'unknown';
    };

    setConfig({
      enableReducedMotion: mediaQuery.matches,
      enableHighPerformance: isHighPerformanceDevice(),
      connectionSpeed: getConnectionSpeed()
    });

    // Listen for changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({ ...prev, enableReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return config;
}; 