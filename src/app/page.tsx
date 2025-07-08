
'use client';

import React from 'react';
import styled from 'styled-components';
import Hero from '@/components/sections/Hero';
import FeaturedNews from '@/components/sections/FeaturedNews';
import GameSpotlight from '@/components/sections/GameSpotlight';
import TechReviews from '@/components/sections/TechReviews';
import CommunitySection from '@/components/sections/CommunitySection';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { ScrollSpyProvider } from '@/components/ScrollSpyProvider';
import ParallaxBackground from '@/components/ParallaxBackground';

const MainContainer = styled.main`
  position: relative;
  overflow-x: hidden;
`;

const Section = styled.section<{ $hasParallax?: boolean }>`
  position: relative;
  min-height: ${props => props.$hasParallax ? 'auto' : 'fit-content'};
  
  &.hero-section {
    height: 100vh;
    min-height: 600px;
  }
`;

export default function HomePage() {
  return (
    <ScrollSpyProvider>
      <MainContainer>
        <Navigation />
        <Section id="hero" className="hero-section" $hasParallax>
          <ParallaxBackground section="hero" />
          <Hero />
        </Section>
        
        <Section id="news" $hasParallax>
          <ParallaxBackground section="news" />
          <FeaturedNews />
        </Section>
        
        <Section id="reviews">
          <GameSpotlight />
          <TechReviews />
        </Section>
        
        <Section id="community" $hasParallax>
          <ParallaxBackground section="community" />
          <CommunitySection />
        </Section>
        
        <Footer />
      </MainContainer>
    </ScrollSpyProvider>
  );
} 