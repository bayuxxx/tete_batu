import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Activities from '../components/Activities';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 50,
    });
  }, []);

  return (
    <div className="text-gray-900">
      {/* Navigation - No animation for navbar to keep it stable */}
      <Navbar />

      {/* Hero Section */}
      <div data-aos="fade-up">
        <Hero />
      </div>

      {/* About Section */}
      <div data-aos="fade-up" data-aos-delay="100">
        <About />
      </div>

      {/* Gallery Section */}
      <div data-aos="fade-up" data-aos-delay="200">
        <Gallery />
      </div>

      {/* Activities Section */}
      <div data-aos="fade-up" data-aos-delay="100">
        <Activities />
      </div>

      {/* Contact Section */}
      <div data-aos="fade-up" data-aos-delay="200">
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;