import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Hideaway Tetebatu</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src="/bg.jpeg" alt="Tetebatu Landscape" className="rounded-lg shadow-md w-full h-auto" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-4">
              Nestled in the foothills of Mount Rinjani in Lombok, Hideaway Tetebatu offers a serene escape from the bustling tourist areas. Surrounded by lush rice terraces, tropical forests, and traditional villages, this hidden gem provides an authentic glimpse into the natural beauty and cultural heritage of Indonesia.
            </p>
            <p className="text-lg mb-4">
              Our eco-friendly resort combines traditional architecture with modern comforts, creating the perfect base for exploring the wonders of Tetebatu and its surroundings.
            </p>
            <div className="mt-4">
              <a href="#activities" className="text-green-700 font-semibold hover:underline">
                Discover our activities →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;