
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, url: 'https://github.com/lonexreb', label: 'GitHub' },
  {
    icon: Linkedin,
    url: 'https://linkedin.com/in/shubhankar-tripathy',
    label: 'LinkedIn',
  },
  { icon: Twitter, url: 'https://twitter.com/shubhtrips', label: 'Twitter' },
  { icon: Mail, url: 'mailto:shubh@paloa.ai', label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground/80">shubhankar tripathy</span>
            <span className="mx-2 text-border">|</span>
            <span>building the agent-first world</span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-terminal-cyan transition-colors duration-150"
                aria-label={link.label}
              >
                <link.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center sm:text-left">
          <p className="font-mono text-[11px] text-muted-foreground/60">
            &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
