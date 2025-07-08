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
  background: 
    linear-gradient(135deg, 
      rgba(0, 0, 0, 0.7) 0%, 
      rgba(20, 20, 30, 0.8) 50%, 
      rgba(10, 10, 20, 0.9) 100%
    ),
    url('/images/dungeon.jpg');
  background-size: cover, cover;
  background-position: center, center;
  background-attachment: fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 40%, rgba(100, 149, 237, 0.05) 0%, transparent 60%),
      radial-gradient(circle at 70% 60%, rgba(138, 43, 226, 0.03) 0%, transparent 40%);
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    background-attachment: scroll;
  }
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
  background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedReview = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-accent);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
  }
`;

const FeaturedImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
`;

const FeaturedContent = styled.div`
  padding: 2rem;
`;

const ReviewCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  line-height: 1.3;
`;

const ReviewExcerpt = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReviewScore = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ScoreValue = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-accent);
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
`;

const SidebarReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarReview = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    border-color: var(--color-primary);
    box-shadow: 0 10px 25px rgba(0, 255, 136, 0.1);
  }
`;

const SidebarImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 120px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const SidebarTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
  line-height: 1.3;
`;

const SidebarScore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SidebarScoreValue = styled.span`
  font-weight: 700;
  color: var(--color-primary);
`;

const SidebarDate = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-muted);
`;

const MoreReviewsButton = styled(motion.button)`
  display: block;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--color-accent);
  border-radius: 12px;
  color: var(--color-accent);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-accent);
    color: var(--color-bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  right: -200px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  z-index: 1;
`;

const techReviews = {
  featured: {
    title: "ROG Strix RTX 4090: The Ultimate Gaming Beast",
    excerpt: "ASUS delivers the most powerful consumer graphics card ever made, pushing 4K gaming to its absolute limits with ray tracing perfection.",
    category: "Graphics Cards",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800",
    score: 9.5,
    date: "3 days ago",
    author: "Alex Chen"
  },
  sidebar: [
    {
      title: "PlayStation 5 Pro Review: Worth the Upgrade?",
      score: 8.8,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
      date: "1 week ago"
    },
    {
      title: "Steam Deck OLED: Handheld Gaming Perfected",
      score: 9.2,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400",
      date: "2 weeks ago"
    },
    {
      title: "Razer DeathAdder V3 Pro: Wireless Precision",
      score: 8.5,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      date: "3 weeks ago"
    },
    {
      title: "LG OLED C3: The Gaming Display Champion",
      score: 9.0,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      date: "1 month ago"
    }
  ]
};

const TechReviews: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
    <SectionContainer id="reviews" ref={ref}>
      <BackgroundGlow />
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Tech Reviews
          </SectionTitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ReviewsGrid>
            <motion.div variants={itemVariants}>
              <FeaturedReview>
                <FeaturedImage $backgroundImage={techReviews.featured.image} />
                <FeaturedContent>
                  <ReviewCategory>{techReviews.featured.category}</ReviewCategory>
                  <ReviewTitle>{techReviews.featured.title}</ReviewTitle>
                  <ReviewExcerpt>{techReviews.featured.excerpt}</ReviewExcerpt>
                  <ReviewScore>
                    <ScoreValue>{techReviews.featured.score}</ScoreValue>
                    <ScoreLabel>Outstanding</ScoreLabel>
                  </ReviewScore>
                  <ReviewMeta>
                    <span>By {techReviews.featured.author}</span>
                    <span>{techReviews.featured.date}</span>
                  </ReviewMeta>
                </FeaturedContent>
              </FeaturedReview>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SidebarReviews>
                {techReviews.sidebar.map((review, index) => (
                  <SidebarReview key={index}>
                    <SidebarImage $backgroundImage={review.image} />
                    <SidebarTitle>{review.title}</SidebarTitle>
                    <SidebarScore>
                      <SidebarScoreValue>{review.score}</SidebarScoreValue>
                      <span>/10</span>
                    </SidebarScore>
                    <SidebarDate>{review.date}</SidebarDate>
                  </SidebarReview>
                ))}
              </SidebarReviews>
            </motion.div>
          </ReviewsGrid>
        </motion.div>

        <MoreReviewsButton
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Reviews
        </MoreReviewsButton>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default TechReviews; 