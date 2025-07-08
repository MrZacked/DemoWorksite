 

'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../ScrollSpyProvider';

const NavigationContainer = styled(motion.nav)<{ $isScrolled: boolean; $scrollProgress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.$isScrolled 
    ? 'rgba(10, 10, 15, 0.95)' 
    : 'rgba(10, 10, 15, 0.8)'};
  backdrop-filter: blur(20px);
  border-bottom: ${props => props.$isScrolled 
    ? '1px solid rgba(255, 255, 255, 0.1)' 
    : '1px solid transparent'};
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$scrollProgress * 100}%;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    transition: width 0.1s ease;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -0.02em;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  position: relative;
  font-weight: 500;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-text-primary);
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLine = styled.div<{ $isOpen: boolean; $index: number }>`
  width: 24px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
  
  ${props => props.$isOpen && props.$index === 0 && 'transform: rotate(45deg) translate(5px, 5px);'}
  ${props => props.$isOpen && props.$index === 1 && 'opacity: 0;'}
  ${props => props.$isOpen && props.$index === 2 && 'transform: rotate(-45deg) translate(7px, -6px);'}
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled.a<{ $isActive?: boolean }>`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: ${props => props.$isActive ? '4px' : '0'};
    height: 20px;
    background: var(--color-primary);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-primary);
    padding-left: 1rem;
  }
`;

const CTAButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border: none;
  border-radius: 8px;
  color: var(--color-bg-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
  }
`;

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, scrollProgress, scrollToSection } = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'News', href: '#news', sectionId: 'news' },
    { label: 'Reviews', href: '#reviews', sectionId: 'reviews' },
    { label: 'Community', href: '#community', sectionId: 'community' },
  ];

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <NavigationContainer $isScrolled={isScrolled} $scrollProgress={scrollProgress}>
      <NavContent>
        <Logo>SILER</Logo>
        
        <NavMenu>
          {navItems.map((item) => (
            <NavLink 
              key={item.label} 
              href={item.href}
              $isActive={activeSection === item.sectionId}
              onClick={(e) => handleNavClick(e, item.sectionId)}
            >
              {item.label}
            </NavLink>
          ))}
          <CTAButton>Join Beta</CTAButton>
        </NavMenu>

        <MobileMenuButton 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <MenuLine $isOpen={isMobileMenuOpen} $index={0} />
          <MenuLine $isOpen={isMobileMenuOpen} $index={1} />
          <MenuLine $isOpen={isMobileMenuOpen} $index={2} />
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink 
                key={item.label} 
                href={item.href}
                $isActive={activeSection === item.sectionId}
                onClick={(e) => handleNavClick(e, item.sectionId)}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <CTAButton>Join Beta</CTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default Navigation; 