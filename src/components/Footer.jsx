import React from "react";

function Footer() {
  return (
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
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-900"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Hideaway Tetebatu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
