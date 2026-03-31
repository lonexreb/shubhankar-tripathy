
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import TerminalWindow from './terminal/TerminalWindow';

const identityCards = [
  {
    title: 'Paloa Labs',
    role: 'Co-Founder & CTO',
    detail: 'Palo Alto, CA',
    color: 'terminal-cyan',
  },
  {
    title: 'Zigsaw',
    role: 'Co-Founder & CEO',
    detail: 'YC AI Hackathon Winner',
    color: 'terminal-green',
  },
  {
    title: 'UMass Amherst',
    role: 'Triple Degree',
    detail: 'CS + Mathematics + Statistics',
    color: 'terminal-purple',
  },
  {
    title: 'Google CSRMP',
    role: 'Fellow',
    detail: '2022B Cohort',
    color: 'terminal-yellow',
  },
  {
    title: 'StatQuest',
    role: 'Co-authoring "All-In ML"',
    detail: 'with Joshua Starmer',
    color: 'terminal-orange',
  },
  {
    title: 'SAIL @ NeurIPS',
    role: 'Podcast Guest',
    detail: 'Can Multi-Agent RL Solve the Stock Market?',
    color: 'terminal-pink',
  },
];

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/lonexreb',
    label: 'GitHub',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/shubhtrips',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/shubhankar-tripathy',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:shubh@paloa.ai',
    label: 'Email',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        {/* Section header */}
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">cat about.md</span>
          </p>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed max-w-3xl">
            Co-Founder & CTO of{' '}
            <span className="font-mono text-[hsl(var(--terminal-cyan))]">
              Paloa Labs
            </span>
            , building at the intersection of AI agents and infrastructure.
            Co-founded{' '}
            <span className="font-mono text-[hsl(var(--terminal-green))]">
              Zigsaw
            </span>{' '}
            (YC AI Hackathon winner for Enterprise Agents). Google CSRMP Fellow.
            Triple degree at UMass Amherst. Research in RL and physics-informed
            neural networks under Prof. Bruno Castro da Silva.
          </p>
        </motion.div>

        {/* Photo gallery */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {[
            {
              src: '/images/AtTuringAwardpng.png',
              caption: 'ACM Awards Ceremony',
            },
            {
              src: '/images/atYcombinator.png',
              caption: 'At Y Combinator',
            },
            {
              src: '/images/withProfBruno.png',
              caption: 'With Prof. Bruno Castro Da Silva',
            },
          ].map((photo) => (
            <div key={photo.caption} className="group">
              <div className="rounded-md border border-border overflow-hidden bg-card">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full aspect-[4/5] object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-2 text-center">
                // {photo.caption}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Identity cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {identityCards.map((card) => (
            <motion.div key={card.title} variants={item}>
              <TerminalWindow showChrome={false} compact>
                <div className="space-y-1">
                  <h3
                    className={`font-mono font-semibold text-sm text-${card.color}`}
                  >
                    {card.title}
                  </h3>
                  <p className="font-mono text-foreground/90 text-xs">
                    {card.role}
                  </p>
                  <p className="font-mono text-muted-foreground text-xs">
                    {card.detail}
                  </p>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--terminal-cyan))] transition-colors duration-150"
              aria-label={link.label}
            >
              <link.icon size={16} />
              <span className="font-mono text-xs hidden sm:inline">
                {link.label.toLowerCase()}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
