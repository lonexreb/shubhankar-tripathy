
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Youtube, GraduationCap, FileText } from 'lucide-react';
import TerminalWindow from './terminal/TerminalWindow';

interface WritingItem {
  title: string;
  type: string;
  description: string;
  icon: React.ElementType;
  link?: string;
  linkLabel?: string;
  color: string;
}

const writings: WritingItem[] = [
  {
    title: 'Can Multi-Agent RL Solve the Stock Market?',
    type: 'SAIL @ NeurIPS Podcast',
    description:
      'Discussion on multi-agent reinforcement learning applied to financial markets, exploring challenges and opportunities.',
    icon: Youtube,
    link: 'https://www.youtube.com/watch?v=WjWTxeL8-4M',
    linkLabel: '[watch on youtube]',
    color: 'text-terminal-red',
  },
  {
    title: "Cracking the Brain's Secret Code for Success",
    type: 'Medium Article',
    description:
      'How spike-timing-dependent plasticity (STDP) and dopamine implement a biologically plausible update rule, and why it maps cleanly to TD(λ) and modern RL. Co-authored with Ria Chaudhry.',
    icon: FileText,
    link: 'https://medium.com/@reach2shubhankar/cracking-the-brains-secret-code-for-success-how-timing-and-dopamine-decide-what-works-5cb9a3cd0edd',
    linkLabel: '[read on medium]',
    color: 'text-terminal-orange',
  },
  {
    title: 'All-In ML',
    type: 'Book (Co-author)',
    description:
      'Co-authored with Joshua Starmer (StatQuest founder). A comprehensive guide to machine learning from fundamentals to production.',
    icon: BookOpen,
    color: 'text-terminal-yellow',
  },
  {
    title: 'Teaching RLHF from Scratch',
    type: 'Course @ Vizuara',
    description:
      'Comprehensive tutorial on building RLHF pipelines from the ground up -- reward models, PPO, and human feedback integration.',
    icon: GraduationCap,
    color: 'text-terminal-green',
  },
  {
    title: 'Attention in Transformers',
    type: 'Course',
    description:
      'Concepts and Code in PyTorch -- attention mechanisms, multi-head attention, and transformer architecture from scratch.',
    icon: GraduationCap,
    color: 'text-terminal-cyan',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Writing = () => {
  return (
    <section id="writing" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">cat publications/</span>
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {writings.map((w) => (
            <motion.div key={w.title} variants={item}>
              <TerminalWindow showChrome={false} compact className="h-full card-hover border border-border">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <w.icon size={14} className={w.color} />
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                      {w.type}
                    </span>
                  </div>

                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {w.title}
                  </h3>

                  <p className="text-foreground/70 text-xs font-sans leading-relaxed">
                    {w.description}
                  </p>

                  {w.link && (
                    <a
                      href={w.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-terminal-cyan hover:text-terminal-green transition-colors duration-150 mt-1"
                    >
                      {w.linkLabel}
                    </a>
                  )}
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;
