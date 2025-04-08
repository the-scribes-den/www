import React from 'react';

const Layout = ({ children, title = "The Scribe's Den" }) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta 
          name="description" 
          content="Welcome to The Scribe's Den - a collaborative workspace for writers, editors, and literary enthusiasts. Discover our services, community, and resources."
        />
        <meta 
          name="keywords" 
          content="Scribe's Den, writing services, editing, creative writing, literary community, writing workspace"
        />
        <meta name="author" content="The Scribe's Den" />
        <meta name="theme-color" content="#6b5b95" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thescribesden.com/" />
        <meta property="og:title" content={title} />
        <meta 
          property="og:description" 
          content="Welcome to The Scribe's Den - a collaborative workspace for writers, editors, and literary enthusiasts."
        />
        <meta 
          property="og:image" 
          content="https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thescribesden.com/" />
        <meta property="twitter:title" content={title} />
        <meta 
          property="twitter:description" 
          content="Welcome to The Scribe's Den - a collaborative workspace for writers, editors, and literary enthusiasts."
        />
        <meta 
          property="twitter:image" 
          content="https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        />
        
        <title>{title}</title>
        
        {/* Favicon */}
        <link 
          rel="icon" 
          href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48c3R5bGU+LmEsLmR7ZmlsbDojNmI1Yjk1O30uYntmaWxsOiNlMWQ5YzQ[...]"
        />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Font Awesome Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      
      <div className="site-wrapper">
        {children}
        <Footer />
      </div>
    </>
  );
};

// Footer Component (Inline to avoid import issues)
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

export default Layout;
