import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Activities from '../components/Activities';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="text-gray-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Activities Section */}
      <Activities />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />     
    </div>
  );
}

export default Home;
