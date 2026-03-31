
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const menuItems = [
  { label: '~/about', href: '#about', id: 'about' },
  { label: '~/projects', href: '#projects', id: 'projects' },
  { label: '~/experience', href: '#experience', id: 'experience' },
  { label: '~/community', href: '#community', id: 'community' },
  { label: '~/recs', href: '#recommendations', id: 'recommendations' },
  { label: '~/writing', href: '#writing', id: 'writing' },
  { label: '~/contact', href: '#contact', id: 'contact' },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionIds = useMemo(() => menuItems.map((m) => m.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <a
            href="#home"
            className="font-mono text-sm flex items-center gap-0"
          >
            <span className="text-[hsl(var(--terminal-green))] font-bold">
              shubh
            </span>
            <span className="text-muted-foreground">@</span>
            <span className="text-[hsl(var(--terminal-purple))]">
              portfolio
            </span>
            <span className="text-muted-foreground">:~</span>
            <span className="text-[hsl(var(--terminal-cyan))]">$</span>
            <span className="terminal-cursor ml-1 hidden sm:inline-block" />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-mono text-xs px-3 py-1.5 transition-colors duration-150 rounded-sm ${
                  activeSection === item.id
                    ? 'text-[hsl(var(--terminal-green))] bg-[hsl(var(--terminal-green))]/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden font-mono text-sm text-muted-foreground hover:text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-background/98 backdrop-blur-sm z-40">
          <div className="flex flex-col items-start px-8 pt-8 gap-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-base py-3 transition-colors duration-150 ${
                  activeSection === item.id
                    ? 'text-[hsl(var(--terminal-green))]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-[hsl(var(--terminal-green))] mr-2">
                  &gt;
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
