
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-subtle' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="text-primary text-xl font-display font-medium">
          <span className="sr-only">Portfolio</span>
          Portfolio
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 link-underline py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 bg-background/95 backdrop-blur-lg transition-all duration-300 ease-out-expo',
          isMenuOpen 
            ? 'top-[60px] opacity-100 min-h-screen' 
            : 'top-[-100%] opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 py-8">
          <ul className="flex flex-col items-center gap-6">
            {menuItems.map((item, index) => (
              <li key={index} className="w-full">
                <a
                  href={item.href}
                  className="block text-center text-lg py-3 text-foreground hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
