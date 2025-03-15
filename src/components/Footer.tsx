
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={18} />, url: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={18} />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Mail size={18} />, url: "mailto:shubhankar@example.com", label: "Email" },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-secondary/70 py-12 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2">Shubhankar Tripathy</h3>
            <p className="text-foreground/60 text-sm">
              Data Scientist & Machine Learning Engineer
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
        
        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-wrap gap-6 justify-center">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="text-sm text-foreground/60">
            © {currentYear} Shubhankar Tripathy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
