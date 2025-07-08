



'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 30, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 255, 136, 0.1);
  padding: 60px 0 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 0, 128, 0.05) 0%, transparent 50%);
    z-index: 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #00ff88;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 12px;
      
      a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 0.95rem;
        
        &:hover {
          color: #00ff88;
          transform: translateX(5px);
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 255, 136, 0.1);
      border-color: #00ff88;
      color: #00ff88;
      transform: translateY(-3px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin: 0;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo>SILER</Logo>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '15px', lineHeight: '1.6' }}>
              Your ultimate destination for gaming news, reviews, and community insights. 
              Stay connected with the pulse of gaming culture.
            </p>
            <SocialLinks>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                📱
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                🐦
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                📺
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                💬
              </motion.a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Gaming</h3>
            <ul>
              <li><a href="#">Latest News</a></li>
              <li><a href="#">Game Reviews</a></li>
              <li><a href="#">Upcoming Releases</a></li>
              <li><a href="#">Esports Coverage</a></li>
              <li><a href="#">Gaming Guides</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Hardware</h3>
            <ul>
              <li><a href="#">GPU Reviews</a></li>
              <li><a href="#">PC Builds</a></li>
              <li><a href="#">Console News</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Buying Guides</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Community</h3>
            <ul>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Discord Server</a></li>
              <li><a href="#">User Reviews</a></li>
              <li><a href="#">Submit News</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © 2024 Siler Gaming Hub. All rights reserved.
          </Copyright>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Terms of Service
            </a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Cookie Policy
            </a>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 