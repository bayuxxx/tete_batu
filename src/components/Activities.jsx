import React from 'react';

const Activities = () => {
  return (
    <section id="activities" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/bg.jpeg" alt="Hiking" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Guided Hiking Tours</h3>
              <p className="text-gray-700">Explore the stunning landscapes around Tetebatu with our experienced local guides who will show you hidden waterfalls, rice terraces, and tropical forests.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/bg.jpeg" alt="Cultural Experience" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cultural Experiences</h3>
              <p className="text-gray-700">Immerse yourself in local traditions with cultural workshops, traditional music performances, and visits to artisan villages.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="/bg.jpeg" alt="Culinary Adventure" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Culinary Adventures</h3>
              <p className="text-gray-700">Learn to prepare traditional Sasak dishes using fresh, local ingredients in our cooking classes led by our resort's skilled chefs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;