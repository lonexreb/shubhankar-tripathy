
import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={18} />, url: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={18} />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram size={18} />, url: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-secondary/70 py-12 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2">Portfolio</h3>
            <p className="text-foreground/60 text-sm">
              Creating digital experiences with purpose
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <div className="mb-4 md:mb-0">
            © {currentYear} Portfolio. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
