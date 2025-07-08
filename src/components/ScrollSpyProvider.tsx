'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface ScrollSpyContextType {
  activeSection: string;
  scrollProgress: number;
  isScrolling: boolean;
  scrollDirection: 'up' | 'down';
  scrollToSection: (sectionId: string) => void;
}

const ScrollSpyContext = createContext<ScrollSpyContextType | undefined>(undefined);

export const useScrollSpy = () => {
  const context = useContext(ScrollSpyContext);
  if (!context) {
    throw new Error('useScrollSpy must be used within a ScrollSpyProvider');
  }
  return context;
};

interface ScrollSpyProviderProps {
  children: React.ReactNode;
}

export const ScrollSpyProvider: React.FC<ScrollSpyProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fixed smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navigation height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Initialize scroll effects and observers
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Section observers for scroll spy
    const sections = ['hero', 'news', 'reviews', 'community'];
    const observers = new Map();

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
          }
        );
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    // Optimized scroll tracking
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / documentHeight, 1);
      
      setScrollProgress(progress);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      observers.forEach(observer => observer.disconnect());
    };
  }, [lastScrollY]);

  const contextValue: ScrollSpyContextType = {
    activeSection,
    scrollProgress,
    isScrolling,
    scrollDirection,
    scrollToSection
  };

  return (
    <ScrollSpyContext.Provider value={contextValue}>
      {children}
    </ScrollSpyContext.Provider>
  );
}; 