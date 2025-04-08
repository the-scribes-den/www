import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="/about" className="block hover:text-gray-300 transition-colors">About</a>
            <a href="/services" className="block hover:text-gray-300 transition-colors">Services</a>
            <a href="/resources" className="block hover:text-gray-300 transition-colors">Resources</a>
            <a href="/contact" className="block hover:text-gray-300 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a 
              href="https://twitter.com/thescribesden" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://instagram.com/thescribesden" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://github.com/the-scribes-den" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Newsletter and Copyright */}
        <div>
          <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 w-full text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            © {currentYear} The Scribe's Den. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
