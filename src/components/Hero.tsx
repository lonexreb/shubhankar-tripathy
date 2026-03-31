
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './terminal/TerminalWindow';
import InteractiveTerminal from './terminal/InteractiveTerminal';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface TerminalLine {
  type: 'prompt' | 'output' | 'blank';
  text: string;
  highlight?: boolean;
}

const lines: TerminalLine[] = [
  { type: 'prompt', text: 'whoami' },
  { type: 'output', text: 'shubhankar tripathy', highlight: true },
  { type: 'blank', text: '' },
  { type: 'prompt', text: 'cat role.txt' },
  { type: 'output', text: 'Co-Founder & CTO @ Paloa Labs Inc' },
  { type: 'output', text: 'Co-Founder & CEO @ Zigsaw' },
  { type: 'output', text: 'Building the agent-first world' },
  { type: 'blank', text: '' },
  { type: 'prompt', text: 'ls highlights/' },
  { type: 'output', text: 'paloa-labs/  site2cli/  yc-hackathon/  neurips-sail/  all-in-ml/' },
];

const TypingPrompt: React.FC<{
  command: string;
  onComplete: () => void;
  startDelay?: number;
}> = ({ command, onComplete, startDelay = 0 }) => {
  const { displayText, isComplete } = useTypingAnimation({
    text: command,
    speed: 35,
    startDelay,
    onComplete,
  });

  return (
    <span>
      <span className="terminal-prompt">$ </span>
      <span className="terminal-command">{displayText}</span>
      {!isComplete && <span className="terminal-cursor" />}
    </span>
  );
};

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [promptsDone, setPromptsDone] = useState<Record<number, boolean>>({});
  const [bootComplete, setBootComplete] = useState(false);

  // Find prompt line indices
  const promptIndices = lines
    .map((l, i) => (l.type === 'prompt' ? i : -1))
    .filter((i) => i >= 0);

  const handlePromptComplete = (lineIndex: number) => {
    setPromptsDone((prev) => ({ ...prev, [lineIndex]: true }));

    // Show all output lines until the next prompt
    const nextPromptIdx = promptIndices.find((i) => i > lineIndex);
    const showUntil = nextPromptIdx !== undefined ? nextPromptIdx : lines.length;

    // Reveal output lines one by one with stagger
    let delay = 80;
    for (let i = lineIndex + 1; i < showUntil; i++) {
      const idx = i;
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, idx + 1));
      }, delay);
      delay += 60;
    }

    // After outputs, trigger next prompt or mark boot complete
    if (nextPromptIdx !== undefined) {
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, nextPromptIdx + 1));
      }, delay + 200);
    } else {
      // Last prompt done -- show interactive terminal
      setTimeout(() => setBootComplete(true), delay + 300);
    }
  };

  // Start first prompt
  useEffect(() => {
    const timer = setTimeout(() => setVisibleLines(1), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 pt-24 pb-8 flex flex-col items-center justify-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <TerminalWindow title="shubhankar@portfolio:~">
            <div className="space-y-1 min-h-[280px] md:min-h-[260px]">
              {lines.map((line, i) => {
                if (i >= visibleLines) return null;

                if (line.type === 'blank') {
                  return <div key={i} className="h-4" />;
                }

                if (line.type === 'prompt') {
                  return (
                    <div key={i} className="leading-relaxed">
                      <TypingPrompt
                        command={line.text}
                        onComplete={() => handlePromptComplete(i)}
                      />
                    </div>
                  );
                }

                // Output lines
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className={`leading-relaxed pl-4 ${
                      line.highlight
                        ? 'text-[hsl(var(--terminal-cyan))] font-semibold text-base'
                        : 'text-foreground/90'
                    }`}
                  >
                    {line.text}
                  </motion.div>
                );
              })}

              {/* Interactive terminal after boot completes */}
              {bootComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-border/30"
                  >
                    <InteractiveTerminal />
                  </motion.div>
                )}
            </div>
          </TerminalWindow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
        >
          <a href="#projects" className="btn-primary">
            [view projects]
          </a>
          <a href="#contact" className="btn-outline">
            [get in touch]
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
