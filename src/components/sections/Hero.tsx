'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
`;

const BackgroundCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, 
    var(--color-primary) 0%,
    var(--color-accent) 30%,
    var(--color-secondary) 60%,
    var(--color-warning) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400% 400%;
  animation: gradientShift 3s ease-in-out infinite;
  letter-spacing: -0.02em;
  line-height: 0.9;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const SubTitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  font-weight: 300;
  line-height: 1.4;
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border: none;
  border-radius: 12px;
  color: var(--color-bg-primary);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 255, 136, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  color: var(--color-primary);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg-primary);
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 255, 136, 0.3);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
`;

const ScrollMouse = styled.div`
  width: 24px;
  height: 40px;
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 1px;
    animation: scrollWheel 2s infinite;
  }
  
  @keyframes scrollWheel {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(16px); }
  }
`;

const FloatingElement = styled(motion.div)<{ top: string; left: string; delay: number }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 4px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 50%;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

function GameController() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI * 0.1;
    }
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[3, 0, 0]} scale={[0.8, 0.8, 0.8]}>
        <boxGeometry args={[1, 0.6, 0.3]} />
        <meshStandardMaterial 
          color="#00ff88" 
          transparent 
          opacity={0.8}
          emissive="#003322"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function GameCube() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.3}>
      <mesh position={[-3, -1, 0]} scale={[0.6, 0.6, 0.6]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#ff0080" 
          transparent 
          opacity={0.7}
          emissive="#330011"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

const Hero: React.FC = () => {
  const performance = usePerformanceOptimization();
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    top: string;
    left: string;
    delay: number;
  }>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    performance.enableReducedMotion ? ["0%", "0%"] : ["0%", "30%"]
  );
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.7], 
    [1, performance.enableReducedMotion ? 1 : 0.3]
  );

  // Adaptive floating elements based on device performance
  const floatingElementsCount = useMemo(() => {
    if (performance.enableReducedMotion) return 0;
    if (!performance.enableHighPerformance) return 4;
    return performance.connectionSpeed === 'slow' ? 6 : 8;
  }, [performance]);

  useEffect(() => {
    if (floatingElementsCount > 0) {
      const elements = Array.from({ length: floatingElementsCount }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3
      }));
      setFloatingElements(elements);
    }
  }, [floatingElementsCount]);

  return (
    <HeroContainer ref={containerRef}>
      {/* Floating Background Elements */}
      {floatingElements.map(element => (
        <FloatingElement
          key={element.id}
          top={element.top}
          left={element.left}
          delay={element.delay}
        />
      ))}

      {/* 3D Background - Conditional rendering for performance */}
      {performance.enableHighPerformance && !performance.enableReducedMotion && (
        <BackgroundCanvas>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ 
              antialias: performance.connectionSpeed === 'fast', 
              alpha: false, 
              powerPreference: "high-performance" 
            }}
            dpr={performance.connectionSpeed === 'fast' ? [1, 1.5] : [0.5, 1]}
            performance={{ min: 0.8 }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff88" />
            
            <GameController />
            <GameCube />
            
            <Environment preset="night" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={performance.connectionSpeed !== 'slow'} 
              autoRotateSpeed={0.3}
              enableDamping
              dampingFactor={0.05}
            />
          </Canvas>
        </BackgroundCanvas>
      )}

      {/* Hero Content */}
      <HeroContent 
        className="hero-content" 
        style={performance.enableReducedMotion ? {} : { y, opacity }}
      >
        <MainTitle
          initial={performance.enableReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: performance.enableReducedMotion ? 0 : 1, 
            delay: performance.enableReducedMotion ? 0 : 0.2 
          }}
        >
          NEXUS
        </MainTitle>
        
        <SubTitle
          initial={performance.enableReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: performance.enableReducedMotion ? 0 : 1, 
            delay: performance.enableReducedMotion ? 0 : 0.5 
          }}
        >
          Where Gaming Legends Are Born. Discover the latest news, reviews, and insights 
          from the cutting edge of interactive entertainment.
        </SubTitle>
        
        <CTAContainer
          initial={performance.enableReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: performance.enableReducedMotion ? 0 : 1, 
            delay: performance.enableReducedMotion ? 0 : 0.8 
          }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const newsSection = document.getElementById('news');
              if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Now
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }}
          >
            Watch Trailer
          </SecondaryButton>
        </CTAContainer>
      </HeroContent>

      {/* Scroll Indicator */}
      {!performance.enableReducedMotion && (
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <ScrollMouse />
          <span>Scroll to explore</span>
        </ScrollIndicator>
      )}
    </HeroContainer>
  );
};

export default Hero; 