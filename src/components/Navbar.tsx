import React, { useState, useEffect } from 'react';

import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  url: string;
}
const Navbar: React.FC<NavbarProps> = ({ url }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [url]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Combos', path: '/combos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-aeternum-medium/90 backdrop-blur-md py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-aeternum-accent hover:text-aeternum-highlight transition-all duration-300 ${
                  url === link.path ? 'text-aeternum-highlight' : ''
                }`}
              >
                <span className="relative group">
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-aeternum-highlight transition-all duration-300 group-hover:w-full ${
                      url === link.path ? 'w-full' : ''
                    }`}
                  ></span>
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-aeternum-accent hover:text-aeternum-highlight transition-colors duration-300"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-aeternum-medium/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? 'max-h-[300px] border-t border-aeternum-accent/10'
            : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-4 px-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`text-aeternum-accent hover:text-aeternum-highlight transition-all duration-300 ${
                url === link.path ? 'text-aeternum-highlight' : ''
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
