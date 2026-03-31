
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './terminal/TerminalWindow';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">cat ~/.credentials</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="max-w-lg"
        >
          <TerminalWindow title="education.txt" compact>
            <div className="space-y-2 font-mono text-sm">
              <div>
                <span className="text-terminal-cyan font-semibold">
                  University of Massachusetts Amherst
                </span>
              </div>
              <div className="text-foreground/90">
                B.S. Computer Science, Mathematics, Statistics
              </div>
              <div className="text-muted-foreground text-xs">
                Triple degree | 2020 - 2024
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
