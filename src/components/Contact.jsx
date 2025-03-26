import React from "react";

function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 w-full"
              >
                Send Message
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
