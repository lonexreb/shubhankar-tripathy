
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './terminal/TerminalWindow';

const contactEntries = [
  { label: 'email', value: 'shubh@paloa.ai', href: 'mailto:shubh@paloa.ai' },
  {
    label: 'email',
    value: 'shubhankar.tripathy.usa@gmail.com',
    href: 'mailto:shubhankar.tripathy.usa@gmail.com',
  },
  {
    label: 'twitter',
    value: '@shubhtrips',
    href: 'https://twitter.com/shubhtrips',
  },
  {
    label: 'github',
    value: 'github.com/lonexreb',
    href: 'https://github.com/lonexreb',
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/shubhankar-tripathy',
    href: 'https://linkedin.com/in/shubhankar-tripathy',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">contact --list</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="max-w-lg"
        >
          <TerminalWindow title="contact" compact>
            <motion.div
              className="space-y-2"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactEntries.map((entry, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="flex items-baseline gap-4 font-mono text-sm"
                >
                  <span className="text-terminal-purple w-20 text-right text-xs shrink-0">
                    {entry.label}
                  </span>
                  <a
                    href={entry.href}
                    target={entry.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-terminal-cyan hover:text-terminal-green transition-colors duration-150 text-xs"
                  >
                    {entry.value}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="font-mono text-xs text-muted-foreground">
                // Open to collaborations on agent infrastructure, open source,
                and research
              </p>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
