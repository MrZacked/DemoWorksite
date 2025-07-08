import React from 'react';
import Hero from '@/components/sections/Hero';
import FeaturedNews from '@/components/sections/FeaturedNews';
import GameSpotlight from '@/components/sections/GameSpotlight';
import TechReviews from '@/components/sections/TechReviews';
import CommunitySection from '@/components/sections/CommunitySection';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { ScrollSpyProvider } from '@/components/ScrollSpyProvider';
import ParallaxBackground from '@/components/ParallaxBackground';

export default function HomePage() {
  return (
    <ScrollSpyProvider>
      <main>
        <Navigation />
        <section id="hero" style={{ position: 'relative' }}>
          <ParallaxBackground section="hero" />
          <Hero />
        </section>
        <section id="news" className="content-section" style={{ position: 'relative' }}>
          <ParallaxBackground section="news" />
          <FeaturedNews />
        </section>
        <section id="reviews" className="content-section">
          <GameSpotlight />
          <TechReviews />
        </section>
        <section id="community" className="content-section" style={{ position: 'relative' }}>
          <ParallaxBackground section="community" />
          <CommunitySection />
        </section>
        <Footer />
      </main>
    </ScrollSpyProvider>
  );
} 