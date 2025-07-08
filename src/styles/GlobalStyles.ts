"use client";

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Additional Global Styles */
  
  /* Parallax Performance Optimizations */
  html {
    scroll-behavior: smooth;
  }
  
  body {
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Layer optimization for parallax backgrounds */
  [data-parallax-layer] {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  
  /* Content sections optimized for parallax */
  .content-section {
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    will-change: auto;
    transform: translateZ(0);
  }
  
  /* Selection Colors */
  ::selection {
    background: var(--color-primary);
    color: var(--color-bg-primary);
  }
  
  ::-moz-selection {
    background: var(--color-primary);
    color: var(--color-bg-primary);
  }
  
  /* Focus Styles */
  *:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  /* Selective Transitions - Only for interactive elements */
  button, a, input, select, textarea {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Glass Morphism Utility Classes */
  .glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px var(--glass-shadow);
  }
  
  .glass-dark {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  
  /* Gaming UI Effects */
  .neon-glow {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor;
  }
  
  .cyber-border {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
      border-radius: inherit;
      padding: 2px;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: subtract;
      -webkit-mask-composite: xor;
    }
  }
  
  /* Optimized Animation Keyframes */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeInScale {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
  
  /* Performance-conscious utility classes */
  .animate-pulse {
    animation: pulse 2s infinite;
    will-change: opacity;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
    will-change: transform;
  }
  
  .animate-slide-up {
    animation: slideInUp 0.6s ease-out;
    will-change: transform, opacity;
  }
  
  .animate-fade-scale {
    animation: fadeInScale 0.6s ease-out;
    will-change: transform, opacity;
  }
  
  .animate-glitch {
    animation: glitch 0.3s;
    will-change: transform;
  }
  
  /* Parallax utility classes */
  .parallax-optimized {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  .content-overlay {
    position: relative;
    z-index: 10;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
  }
  
  /* Responsive Typography */
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .text-base { font-size: 1rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-3xl { font-size: 1.875rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
  .text-6xl { font-size: 3.75rem; }
  
  /* Media Queries */
  @media (max-width: 768px) {
    .text-6xl { font-size: 2.5rem; }
    .text-5xl { font-size: 2rem; }
    .text-4xl { font-size: 1.75rem; }
    
    /* Reduce parallax effects on mobile for better performance */
    [data-parallax-layer] {
      transform: none !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    [data-parallax-layer] {
      transform: none !important;
    }
  }
`;

export default GlobalStyles; 