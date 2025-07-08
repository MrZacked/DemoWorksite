'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const CommunityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    border-color: var(--color-primary);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const CardDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CardButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg-primary);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
`;

const NewsletterSection = styled(motion.div)`
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary));
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 128, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const NewsletterTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const NewsletterDescription = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const NewsletterForm = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
  font-size: 1rem;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: var(--color-text-muted);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border: none;
  border-radius: 8px;
  color: var(--color-bg-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
  }
`;

const ParticleEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)<{ top: string; left: string; delay: number }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 3px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: particleFloat 6s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-30px) scale(1.5);
      opacity: 1;
    }
  }
`;

const communityFeatures = [
  {
    icon: '🎮',
    title: 'Gaming Forums',
    description: 'Connect with fellow gamers, share strategies, and discuss your favorite titles in our active community forums.',
    action: 'Join Discussion'
  },
  {
    icon: '🏆',
    title: 'Tournaments',
    description: 'Compete in weekly tournaments across multiple games and climb the leaderboards to earn exclusive rewards.',
    action: 'View Tournaments'
  },
  {
    icon: '📺',
    title: 'Live Streams',
    description: 'Watch live gameplay, tutorials, and reviews from our content creators and community members.',
    action: 'Watch Now'
  },
  {
    icon: '🎯',
    title: 'Achievements',
    description: 'Unlock badges and achievements by participating in community activities and completing challenges.',
    action: 'View Progress'
  }
];

const communityStats = [
  { number: '2.5M+', label: 'Active Members' },
  { number: '15K+', label: 'Daily Posts' },
  { number: '500+', label: 'Live Streams' },
  { number: '99%', label: 'Satisfaction Rate' }
];

const CommunitySection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 6
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionContainer id="community" ref={ref}>
      <ParticleEffect>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            top={particle.top}
            left={particle.left}
            delay={particle.delay}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 0.5 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </ParticleEffect>

      <ContentWrapper>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Join Our Community
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with millions of gamers worldwide and be part of the most vibrant gaming community on the internet.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <StatsContainer>
            {communityStats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatCard>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </StatsContainer>

          <CommunityGrid>
            {communityFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <CommunityCard>
                  <CardIcon>{feature.icon}</CardIcon>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                  <CardButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {feature.action}
                  </CardButton>
                </CommunityCard>
              </motion.div>
            ))}
          </CommunityGrid>

          <motion.div variants={itemVariants}>
            <NewsletterSection>
              <NewsletterTitle>Stay in the Loop</NewsletterTitle>
              <NewsletterDescription>
                Get the latest gaming news, exclusive content, and early access to new features delivered straight to your inbox.
              </NewsletterDescription>
              <NewsletterForm>
                <EmailInput type="email" placeholder="Enter your email address" />
                <SubscribeButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </SubscribeButton>
              </NewsletterForm>
            </NewsletterSection>
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CommunitySection; 