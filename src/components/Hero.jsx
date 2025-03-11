import React from 'react';
import '../style/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Discover Hideaway Tetebatu</h1>
          <p className="hero-description">A hidden paradise in the heart of nature</p>
          <a href="#about" className="hero-button">
            Explore Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;