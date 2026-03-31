
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './terminal/TerminalWindow';

const hackathons = [
  { year: '2024', event: 'YC AI Hackathon', result: 'Winner - Enterprise Agents' },
  { year: '2023', event: 'CalHacks', result: 'Winner' },
  { year: '2022', event: "TreeHacks '22", result: 'Winner' },
  { year: '2022', event: "HackMIT '22", result: 'Winner' },
  { year: '2021', event: 'Intel AI Competition', result: 'Finalist' },
];

const communityItems = [
  'Organized poker night at NeurIPS 2025 -- Stanford AI Lab, Berkeley AI, OpenAI alumni',
  'Co-Founder, Data Science Association at UMass Amherst',
  'Google CSRMP Fellow (2022B Cohort)',
  '14 hackathons attended, 10 projects shipped (Devpost)',
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const Community = () => {
  return (
    <section id="community" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">ls community/</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hackathons table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <TerminalWindow title="hackathons.log" compact>
              <div className="space-y-0">
                {/* Header */}
                <div className="flex font-mono text-[11px] text-terminal-purple uppercase tracking-wider mb-2 border-b border-border pb-1">
                  <span className="w-12">YEAR</span>
                  <span className="flex-1">EVENT</span>
                  <span className="text-right">RESULT</span>
                </div>
                {/* Rows */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {hackathons.map((h, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="flex font-mono text-xs py-1.5 border-b border-border/30 last:border-0"
                    >
                      <span className="w-12 text-terminal-orange">
                        {h.year}
                      </span>
                      <span className="flex-1 text-foreground/90">
                        {h.event}
                      </span>
                      <span className="text-right text-terminal-green text-[11px]">
                        {h.result}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Community leadership */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <TerminalWindow title="community.md" compact>
              <motion.div
                className="space-y-2"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {communityItems.map((text, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    className="font-mono text-xs text-foreground/85 leading-relaxed"
                  >
                    <span className="text-terminal-cyan mr-2">-</span>
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community;
