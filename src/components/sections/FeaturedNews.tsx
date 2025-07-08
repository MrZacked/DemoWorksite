'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled.section`
  padding: 2rem 2rem 6rem;
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NewsCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
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
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: var(--color-primary);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
    
    &::before {
      left: 100%;
    }
  }
`;

const NewsImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 255, 136, 0.2) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${NewsCard}:hover &::after {
    opacity: 1;
  }
`;

const NewsCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-bg-primary);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NewsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
  line-height: 1.3;
`;

const NewsExcerpt = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const NewsMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
`;

const ViewAllButton = styled(motion.button)`
  display: block;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  color: var(--color-primary);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
  }
`;



const featuredNews = [
  {
    id: 1,
    title: "Epic Games Unveils Revolutionary Unreal Engine 6",
    excerpt: "The latest iteration promises photorealistic graphics and AI-powered development tools that will reshape game creation.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    date: "2 hours ago",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "PlayStation 6 Leaked Specifications Surface Online",
    excerpt: "Industry insiders reveal stunning performance metrics and backward compatibility features for Sony's next-gen console.",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800",
    date: "4 hours ago",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Esports Championship Series Announces $50M Prize Pool",
    excerpt: "The largest tournament in gaming history will feature teams from around the globe competing across multiple titles.",
    category: "Esports",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800",
    date: "6 hours ago",
    readTime: "4 min read"
  },
  {
    id: 4,
    title: "Virtual Reality Breakthrough: Neural Interface Gaming",
    excerpt: "Scientists achieve direct brain-to-game connection, opening possibilities for immersive experiences beyond imagination.",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800",
    date: "8 hours ago",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Indie Game 'Quantum Realms' Breaks Steam Records",
    excerpt: "Small development team creates viral sensation with innovative time-manipulation mechanics and stunning art direction.",
    category: "Indie",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    date: "12 hours ago",
    readTime: "3 min read"
  },
  {
    id: 6,
    title: "Gaming Industry Revenue Surpasses $300 Billion",
    excerpt: "Market analysis reveals unprecedented growth driven by mobile gaming and subscription services worldwide.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800",
    date: "1 day ago",
    readTime: "4 min read"
  }
];

const FeaturedNews: React.FC = () => {
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
    <SectionContainer id="news" ref={ref}>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Breaking News
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay ahead of the curve with the latest developments in gaming technology, 
            industry trends, and exclusive insider information.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <NewsGrid>
            {featuredNews.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <NewsCard
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NewsImage $backgroundImage={article.image} />
                  <NewsCategory>{article.category}</NewsCategory>
                  <NewsTitle>{article.title}</NewsTitle>
                  <NewsExcerpt>{article.excerpt}</NewsExcerpt>
                  <NewsMetadata>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </NewsMetadata>
                </NewsCard>
              </motion.div>
            ))}
          </NewsGrid>
        </motion.div>

        <ViewAllButton
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All News
        </ViewAllButton>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FeaturedNews; 