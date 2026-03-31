
import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceEntry {
  hash: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  achievements: string[];
}

const experiences: ExperienceEntry[] = [
  {
    hash: 'f8a3c1d',
    company: 'Paloa Labs Inc',
    role: 'Co-Founder & CTO',
    period: 'Present',
    description: 'Building AI agent infrastructure in Palo Alto, CA.',
    achievements: [],
  },
  {
    hash: 'e7b2d4f',
    company: 'Zigsaw',
    role: 'Co-Founder & CEO',
    period: '2024 - Present',
    description:
      'Agentic social-marketing content generator using Browser Use.',
    achievements: [
      'Architected agentic pipeline for autonomous content generation',
      'Won YC AI Hackathon for Enterprise Agents (200+ teams)',
    ],
  },
  {
    hash: 'b7c4e9a',
    company: 'Dell Technologies',
    role: 'Data Science Intern',
    period: 'Summer 2023',
    description:
      'Applied ML and data science to enterprise problems.',
    achievements: [
      'Built automated data pipeline increasing efficiency by 40%',
      'Created ML model with 92% accuracy for behavior prediction',
    ],
  },
  {
    hash: 'c9d5f2b',
    company: 'UMass Amherst',
    role: 'Research Assistant',
    period: '2022 - 2024',
    description:
      'Research in physics-informed neural networks and generative AI.',
    achievements: [
      'Co-authored research on GPT-PINN integration',
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">
              git log --oneline --author=&quot;shubhankar&quot;
            </span>
          </p>
        </div>

        <motion.div
          className="space-y-0 border-l-2 border-terminal-green/30 ml-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.hash}
              variants={item}
              className="relative pl-8 pb-8 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-terminal-green" />

              {/* Commit header */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="font-mono text-xs text-terminal-yellow">
                  {exp.hash}
                </span>
                <span className="font-mono text-xs text-terminal-orange">
                  [{exp.period}]
                </span>
              </div>

              {/* Role @ Company */}
              <h3 className="font-mono text-base font-medium text-foreground mb-1">
                {exp.role}{' '}
                <span className="text-terminal-cyan">@ {exp.company}</span>
              </h3>

              {/* Description */}
              {exp.description && (
                <p className="text-foreground/70 text-sm font-sans mb-2">
                  {exp.description}
                </p>
              )}

              {/* Achievements */}
              {exp.achievements.length > 0 && (
                <ul className="space-y-1">
                  {exp.achievements.map((a, i) => (
                    <li
                      key={i}
                      className="font-mono text-xs text-muted-foreground pl-4"
                    >
                      - {a}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
