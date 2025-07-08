'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

const ParallaxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const ParallaxLayer = styled.div<{ 
  $backgroundImage: string; 
  $zIndex: number;
  $speed: number;
  $opacity?: number;
}>`
  position: absolute;
  top: -20%;
  left: -10%;
  width: 120%;
  height: 140%;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${props => props.$opacity || 1};
  z-index: ${props => props.$zIndex};
  will-change: transform;
  transform: translate3d(0, 0, 0);
  
  @media (max-width: 768px) {
    background-size: cover;
    background-position: center center;
  }
  
  @media (max-width: 480px) {
    top: -30%;
    left: -20%;
    width: 140%;
    height: 160%;
  }
`;

const OverlayGradient = styled.div<{ $colors: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$colors};
  z-index: 5;
  pointer-events: none;
  opacity: 0.4;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  
  @media (max-width: 768px) {
    opacity: 0.5;
  }
`;

interface ParallaxBackgroundProps {
  section: 'hero' | 'news' | 'reviews' | 'community';
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ section }) => {
  const performance = usePerformanceOptimization();
  const baseLayerRef = useRef<HTMLDivElement>(null);
  const middleLayerRef = useRef<HTMLDivElement>(null);
  const frontLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const updateParallax = useCallback(() => {
    if (performance.enableReducedMotion) return;
    
    const scrollY = window.scrollY;
    
    if (baseLayerRef.current) {
      baseLayerRef.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
    }
    if (middleLayerRef.current && performance.enableHighPerformance) {
      middleLayerRef.current.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
    }
    if (frontLayerRef.current && performance.connectionSpeed !== 'slow') {
      frontLayerRef.current.style.transform = `translate3d(0, ${scrollY * 0.6}px, 0)`;
    }
    if (overlayRef.current) {
      overlayRef.current.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
    }
  }, [performance]);

  useEffect(() => {
    if (performance.enableReducedMotion) return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
        setTimeout(() => { ticking = false; }, 16); // ~60fps throttle
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateParallax, performance.enableReducedMotion]);

  const getLayersForSection = (section: string) => {
    switch (section) {
      case 'hero':
        return {
          base: { image: '/images/layer-base.png', speed: 1.6, zIndex: 1, opacity: 0.9 },
          middle: { image: '/images/layer-middle.png', speed: 2.5, zIndex: 2, opacity: 0.8 },
          front: { image: '/images/layer-front.png', speed: 5.7, zIndex: 3, opacity: 0.7 },
          overlay: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(160, 82, 45, 0.2) 50%, rgba(205, 133, 63, 0.1) 100%)'
        };
      case 'news':
        return {
          base: { image: '/images/dungeon.jpg', speed: 1.6, zIndex: 1, opacity: 0.9 },
          middle: { image: '/images/layer-base.png', speed: 2.5, zIndex: 2, opacity: 0.8 },
          front: { image: '/images/layer-middle.png', speed: 5.7, zIndex: 3, opacity: 0.7 },
          overlay: 'linear-gradient(135deg, rgba(25, 25, 112, 0.4) 0%, rgba(65, 105, 225, 0.3) 50%, rgba(100, 149, 237, 0.2) 100%)'
        };
      case 'community':
        return {
          base: { image: '/images/dungeon.jpg', speed: 1.6, zIndex: 1, opacity: 0.9 },
          middle: { image: '/images/layer-base.png', speed: 2.5, zIndex: 2, opacity: 0.8 },
          front: { image: '/images/ground.png', speed: 5.7, zIndex: 3, opacity: 0.7 },
          overlay: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(100, 149, 237, 0.15) 50%, rgba(138, 43, 226, 0.1) 100%)'
        };
      default:
        return {
          base: { image: '/images/layer-base.png', speed: 1.6, zIndex: 1, opacity: 0.9 },
          middle: { image: '/images/layer-middle.png', speed: 2.5, zIndex: 2, opacity: 0.8 },
          front: { image: '/images/layer-front.png', speed: 5.7, zIndex: 3, opacity: 0.7 },
          overlay: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(40, 40, 40, 0.2) 100%)'
        };
    }
  };

  const layers = getLayersForSection(section);

  // Conditionally render based on performance
  if (performance.enableReducedMotion) {
    return (
      <ParallaxContainer>
        <ParallaxLayer
          $backgroundImage={layers.base.image}
          $zIndex={layers.base.zIndex}
          $speed={0}
          $opacity={layers.base.opacity}
        />
        <OverlayGradient $colors={layers.overlay} />
      </ParallaxContainer>
    );
  }

  return (
    <ParallaxContainer>
      {/* Base layer - fastest movement (furthest back) */}
      <ParallaxLayer
        ref={baseLayerRef}
        $backgroundImage={layers.base.image}
        $zIndex={layers.base.zIndex}
        $speed={layers.base.speed}
        $opacity={layers.base.opacity}
      />
      
      {/* Middle layer - medium movement */}
      {performance.enableHighPerformance && (
        <ParallaxLayer
          ref={middleLayerRef}
          $backgroundImage={layers.middle.image}
          $zIndex={layers.middle.zIndex}
          $speed={layers.middle.speed}
          $opacity={layers.middle.opacity}
        />
      )}
      
      {/* Front layer - slowest movement (closest to viewer) */}
      {performance.connectionSpeed !== 'slow' && (
        <ParallaxLayer
          ref={frontLayerRef}
          $backgroundImage={layers.front.image}
          $zIndex={layers.front.zIndex}
          $speed={layers.front.speed}
          $opacity={layers.front.opacity}
        />
      )}
      
      {/* Color overlay for section theming */}
      <OverlayGradient 
        ref={overlayRef}
        $colors={layers.overlay} 
      />
    </ParallaxContainer>
  );
};

export default ParallaxBackground; 