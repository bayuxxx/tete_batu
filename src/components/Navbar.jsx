import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Improved smooth scroll function
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    // Remove the # if it exists in the sectionId
    const targetId = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
    const element = document.querySelector(targetId);
    
    if (element) {
      // Get the navbar height dynamically to ensure accurate scrolling
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: offsetTop - navbarHeight,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg font-['Poppins'] fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Hideaway Tetebatu</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="hover:text-green-200 transition duration-300"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="hover:text-green-200 transition duration-300"
            >
              About
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection(e, 'gallery')}
              className="hover:text-green-200 transition duration-300"
            >
              Gallery
            </a>
            <a 
              href="#activities" 
              onClick={(e) => scrollToSection(e, 'activities')}
              className="hover:text-green-200 transition duration-300"
            >
              Activities
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:text-green-200 transition duration-300"
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none hover:text-green-200 transition duration-300"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                  } 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, 'home')}
                className="hover:text-green-200 transition duration-300 py-2"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className="hover:text-green-200 transition duration-300 py-2"
              >
                About
              </a>
              <a 
                href="#gallery" 
                onClick={(e) => scrollToSection(e, 'gallery')}
                className="hover:text-green-200 transition duration-300 py-2"
              >
                Gallery
              </a>
              <a 
                href="#activities" 
                onClick={(e) => scrollToSection(e, 'activities')}
                className="hover:text-green-200 transition duration-300 py-2"
              >
                Activities
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="hover:text-green-200 transition duration-300 py-2"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;