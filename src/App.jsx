import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Activities from './components/Activities';
//import css
import './app.css';

function App() {
  return (
    <div className="font-sans text-gray-900">
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
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                  <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 w-full">Send Message</button>
              </form>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-bold mb-4">Resort Information</h3>
                <div className="mb-4">
                  <p className="font-semibold">Address:</p>
                  <p>Hideaway Tetebatu Resort, Jl. Tetebatu, Lombok, Indonesia</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Phone:</p>
                  <p>+62 123 4567 890</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Email:</p>
                  <p>info@hideawaytetebatu.com</p>
                </div>
                <div>
                  <p className="font-semibold">Follow Us:</p>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-green-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hideaway Tetebatu</h3>
              <p>Your perfect escape into nature and culture</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-200">Home</a></li>
                <li><a href="#about" className="hover:text-green-200">About</a></li>
                <li><a href="#gallery" className="hover:text-green-200">Gallery</a></li>
                <li><a href="#activities" className="hover:text-green-200">Activities</a></li>
                <li><a href="#contact" className="hover:text-green-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to receive updates and special offers</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-900" />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition duration-300">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Hideaway Tetebatu. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal for viewing media */}
      
    </div>
  );
}

export default App;