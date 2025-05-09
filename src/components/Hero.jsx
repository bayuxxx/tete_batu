import React, { useEffect, useState } from "react";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);

  // Handle scroll effect for the scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Set text loaded with slight delay for animation sequence
    const timer = setTimeout(() => {
      setTextLoaded(true);
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [scrolled]);

  // Function to scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="hero-container">
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className={`hero-badge ${textLoaded ? "fade-in-up" : ""}`}>
              <span>Welcome to</span>
            </div>
            
            <h1 className={`hero-title ${textLoaded ? "fade-in-up" : ""}`} style={{animationDelay: "0.2s"}}>
              <span className="text-green-400">Hideaway</span> Tetebatu
            </h1>
            
            <p className={`hero-description ${textLoaded ? "fade-in-up" : ""}`} style={{animationDelay: "0.4s"}}>
              Experience the untouched beauty of Lombok's hidden paradise
            </p>
            
            <div className={`hero-buttons ${textLoaded ? "fade-in-up" : ""}`} style={{animationDelay: "0.6s"}}>
              <button className="hero-button primary-btn" onClick={scrollToAbout}>
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-decorations">
        <div className="decoration-circle top-left"></div>
        <div className="decoration-circle bottom-right"></div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
        }
        
        .hero-section {
          position: relative;
          height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url('/bg.jpeg');
          animation: scaleBackground 20s infinite alternate ease-in-out;
        }
        
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-content {
          text-align: center;
          padding: 1rem;
          max-width: 800px;
          z-index: 10;
        }
        
        .hero-badge {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-title {
          font-size: 2.5rem;
          line-height: 1.2;
          font-weight: 800;
          color: white;
          margin-bottom: 1.25rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-description {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .hero-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 1.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .primary-btn {
          background-color: #059669;
          color: white;
          box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);
        }
        
        .primary-btn:hover {
          background-color: #047857;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(5, 150, 105, 0.5);
        }
        
        
        
        /* Decorative elements */
        .hero-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }
        
        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(to right, rgba(5, 150, 105, 0.2), rgba(16, 185, 129, 0.2));
          filter: blur(40px);
        }
        
        .top-left {
          width: 300px;
          height: 300px;
          top: -100px;
          left: -100px;
        }
        
        .bottom-right {
          width: 350px;
          height: 350px;
          bottom: -150px;
          right: -150px;
        }
        
        /* Animations */
        @keyframes scaleBackground {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive styles */
        @media (min-width: 640px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .hero-description {
            font-size: 1.375rem;
          }
        }
        
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 4.5rem;
          }
          
          .hero-badge {
            font-size: 1rem;
            padding: 0.625rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;