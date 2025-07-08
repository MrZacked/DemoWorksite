'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: 
    linear-gradient(180deg, 
      rgba(0, 0, 0, 0.8) 0%, 
      rgba(15, 15, 25, 0.9) 50%, 
      rgba(10, 10, 20, 0.9) 100%
    ),
    url('/images/layer-base.png');
  background-size: cover, cover;
  background-position: center, center;
  background-attachment: fixed;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(10, 10, 20, 0.9));
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
  background: linear-gradient(135deg, var(--color-secondary), var(--color-warning));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GameCard = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: var(--color-bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GameImage = styled(motion.div)<{ $backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

const GameOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
  z-index: 2;
`;

const GameGenre = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  width: fit-content;
`;

const GameTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const GameDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const GameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const GamePrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
`;

const GameActions = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)<{ variant: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    color: var(--color-bg-primary);
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ExpandedModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  background: var(--color-bg-secondary);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const featuredGames = [
  {
    id: 1,
    title: "Cyberpunk 2087",
    description: "An immersive open-world RPG set in a dystopian future where technology and humanity collide.",
    genre: "RPG",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    rating: 9.2,
    price: "$59.99",
    status: "Coming Soon",
    fullDescription: "Experience the next evolution of cyberpunk gaming with cutting-edge ray tracing, AI-driven NPCs, and a branching narrative that adapts to your choices. Built with Unreal Engine 5, this game pushes the boundaries of what's possible in interactive entertainment."
  },
  {
    id: 2,
    title: "Void Chronicles",
    description: "Journey through cosmic mysteries in this mind-bending space exploration adventure.",
    genre: "Adventure",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
    rating: 8.8,
    price: "$49.99",
    status: "Available Now",
    fullDescription: "Explore vast alien worlds, solve ancient puzzles, and uncover the secrets of a lost civilization. With procedurally generated content and multiplayer co-op, no two playthroughs are the same."
  },
  {
    id: 3,
    title: "Neon Runners",
    description: "High-speed racing meets cyberpunk aesthetics in this adrenaline-fueled arcade racer.",
    genre: "Racing",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800",
    rating: 9.0,
    price: "$39.99",
    status: "Beta Available",
    fullDescription: "Race through neon-lit cityscapes with customizable vehicles and dynamic weather systems. Features both single-player campaigns and competitive multiplayer modes with cross-platform support."
  },
  {
    id: 4,
    title: "Quantum Legends",
    description: "Master the power of quantum mechanics in this innovative puzzle-platformer.",
    genre: "Puzzle",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
    rating: 8.5,
    price: "$29.99",
    status: "Available Now",
    fullDescription: "Manipulate time, space, and reality itself as you navigate through mind-bending levels. This award-winning indie title features hand-crafted visuals and an emotionally resonant soundtrack."
  }
];

const GameSpotlight: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionContainer id="games" ref={ref}>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Featured Games
          </SectionTitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <GameGrid>
            {featuredGames.map((game) => (
              <motion.div key={game.id} variants={cardVariants}>
                <GameCard
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <GameImage 
                    $backgroundImage={game.image}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <GameOverlay>
                    <GameGenre>{game.genre}</GameGenre>
                    <GameTitle>{game.title}</GameTitle>
                    <GameDescription>{game.description}</GameDescription>
                    <GameMeta>
                      <GameRating>
                        <span>⭐</span>
                        <span>{game.rating}</span>
                      </GameRating>
                      <GamePrice>{game.price}</GamePrice>
                    </GameMeta>
                    <GameActions
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActionButton
                        variant="primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Play Now
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Wishlist
                      </ActionButton>
                    </GameActions>
                  </GameOverlay>
                </GameCard>
              </motion.div>
            ))}
          </GameGrid>
        </motion.div>
      </ContentWrapper>

      <AnimatePresence>
        {selectedGame && (
          <ExpandedModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedGame(null)}>
                ×
              </CloseButton>
              {featuredGames.find(g => g.id === selectedGame) && (
                <>
                  <ModalImage 
                    $backgroundImage={featuredGames.find(g => g.id === selectedGame)!.image} 
                  />
                  <ModalBody>
                    <h2>{featuredGames.find(g => g.id === selectedGame)!.title}</h2>
                    <p>{featuredGames.find(g => g.id === selectedGame)!.fullDescription}</p>
                    <GameActions style={{ marginTop: '2rem' }}>
                      <ActionButton variant="primary">
                        Add to Cart - {featuredGames.find(g => g.id === selectedGame)!.price}
                      </ActionButton>
                      <ActionButton variant="secondary">
                        Add to Wishlist
                      </ActionButton>
                    </GameActions>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </ExpandedModal>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};

export default GameSpotlight; 