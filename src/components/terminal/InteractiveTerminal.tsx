import React, { useState, useRef, useEffect, useCallback } from 'react';

interface HistoryEntry {
  type: 'input' | 'output' | 'system';
  text: string;
}

const SECTIONS = ['about', 'projects', 'experience', 'community', 'writing', 'education', 'contact'];

const LINKS: Record<string, string> = {
  github: 'https://github.com/lonexreb',
  linkedin: 'https://linkedin.com/in/shubhankar-tripathy',
  twitter: 'https://twitter.com/shubhtrips',
  email: 'mailto:shubh@paloa.ai',
  'site2cli': 'https://github.com/lonexreb/site2cli',
  tentalis: 'https://github.com/lonexreb/tentalis',
  mcpstudio: 'https://github.com/lonexreb/MCPstudio',
  youtube: 'https://www.youtube.com/watch?v=WjWTxeL8-4M',
};

function executeCommand(raw: string): string[] {
  const input = raw.trim().toLowerCase();
  const parts = input.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join(' ');

  if (!cmd) return [];

  switch (cmd) {
    case 'help':
      return [
        'Available commands:',
        '',
        '  help                  show this message',
        '  whoami                who is shubhankar',
        '  cat about.md          brief bio',
        '  cat role.txt          current roles',
        '  ls projects/          list projects',
        '  goto <section>        scroll to section',
        '  cd <section>          same as goto',
        '  open <link>           open in new tab',
        '  clear                 clear terminal',
        '  history               command history',
        '',
        `Sections: ${SECTIONS.join(', ')}`,
        `Links: ${Object.keys(LINKS).join(', ')}`,
      ];

    case 'whoami':
      return ['shubhankar tripathy'];

    case 'cat':
      if (arg === 'about.md' || arg === 'about') {
        return [
          'Co-Founder & CTO of Paloa Labs Inc (Palo Alto, CA).',
          'Co-Founder & CEO of Zigsaw (YC AI Hackathon winner).',
          'Google CSRMP Fellow. Triple degree at UMass Amherst.',
          'Building the agent-first world.',
        ];
      }
      if (arg === 'role.txt' || arg === 'role') {
        return [
          'Co-Founder & CTO @ Paloa Labs Inc',
          'Co-Founder & CEO @ Zigsaw',
          'Google CSRMP Fellow (2022B)',
        ];
      }
      if (arg === 'skills.txt' || arg === 'skills') {
        return [
          'Python, TypeScript, C++, Java',
          'RLHF, GRPO, Meta-RL, MCP',
          'PyTorch, Browser Use, NATS',
          'React, Next.js, Tailwind',
        ];
      }
      return [`cat: ${arg || '???'}: No such file or directory`];

    case 'ls':
      if (!arg || arg === '.' || arg === '~/') {
        return ['about.md  role.txt  skills.txt  projects/  community/  publications/'];
      }
      if (arg.includes('project')) {
        return [
          'site2cli/     -- turn websites into CLIs for AI agents (17 stars)',
          'tentalis/     -- meta-RL framework with RLHF/GRPO',
          'MCPstudio/    -- postman for MCP servers',
          'zigsaw/       -- agentic social-marketing (YC winner)',
        ];
      }
      if (arg.includes('communit')) {
        return [
          'yc-hackathon-winner.md',
          'treehacks-winner.md',
          'hackmit-winner.md',
          'neurips-2025.md',
          'google-csrmp.md',
        ];
      }
      return [`ls: cannot access '${arg}': No such file or directory`];

    case 'pwd':
      return ['/home/shubhankar/portfolio'];

    case 'echo':
      return [arg || ''];

    case 'date':
      return [new Date().toString()];

    case 'goto':
    case 'cd': {
      const section = arg.replace(/[~/]/g, '').replace('home', '');
      if (!section) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return ['Navigating to top...'];
      }
      const match = SECTIONS.find((s) => s.startsWith(section));
      if (match) {
        const el = document.getElementById(match);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return [`Navigating to ${match}...`];
        }
      }
      return [`cd: ${arg}: No such section. Try: ${SECTIONS.join(', ')}`];
    }

    case 'open': {
      const key = arg.toLowerCase();
      const url = LINKS[key];
      if (url) {
        window.open(url, '_blank');
        return [`Opening ${key}...`];
      }
      return [`open: ${arg}: unknown link. Try: ${Object.keys(LINKS).join(', ')}`];
    }

    case 'clear':
      return ['__CLEAR__'];

    case 'history':
      return ['__HISTORY__'];

    case 'sudo':
      if (arg.includes('hire')) {
        return [
          '',
          '  [sudo] password for recruiter: ********',
          '  Access granted.',
          '',
          '  Hiring shubhankar...',
          '  Email: shubh@paloa.ai',
          '  Status: Ready to build the future.',
          '',
        ];
      }
      return ['sudo: command not recognized. But nice try.'];

    case 'exit':
    case 'quit':
      return ["Nice try. You can't leave. Type 'help' for commands."];

    case 'neofetch':
      return [
        '  shubh@portfolio',
        '  ---------------',
        '  OS:     agent-first-world v2.0',
        '  Host:   Paloa Labs Inc',
        '  Shell:  portfolio-sh',
        '  Lang:   Python, TypeScript, C++',
        '  Focus:  AI Agents, RL, MCP',
        '  Uptime: since 2020',
      ];

    case 'ping':
      return ['PONG! shubhankar is online and building.'];

    default:
      return [`${cmd}: command not found. Type 'help' for available commands.`];
  }
}

const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'system', text: "Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      const output = executeCommand(trimmed);

      // Special: clear
      if (output.length === 1 && output[0] === '__CLEAR__') {
        setHistory([]);
        setInput('');
        setCmdHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      // Special: history
      if (output.length === 1 && output[0] === '__HISTORY__') {
        const histLines = cmdHistory.map((c, i) => `  ${i + 1}  ${c}`);
        histLines.push(`  ${cmdHistory.length + 1}  ${trimmed}`);
        setHistory((prev) => [
          ...prev,
          { type: 'input', text: trimmed },
          ...histLines.map((t) => ({ type: 'output' as const, text: t })),
        ]);
        setInput('');
        setCmdHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      setHistory((prev) => [
        ...prev,
        { type: 'input', text: trimmed },
        ...output.map((t) => ({ type: 'output' as const, text: t })),
      ]);

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      setInput('');
    },
    [input, cmdHistory]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? cmdHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(cmdHistory[newIndex]);
        }
      }
    },
    [cmdHistory, historyIndex]
  );

  return (
    <div
      ref={scrollRef}
      className="max-h-[200px] overflow-y-auto font-mono text-sm space-y-0.5 cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* History */}
      {history.map((entry, i) => (
        <div key={i} className="leading-relaxed">
          {entry.type === 'input' ? (
            <>
              <span className="terminal-prompt">$ </span>
              <span className="terminal-command">{entry.text}</span>
            </>
          ) : entry.type === 'system' ? (
            <span className="text-muted-foreground text-xs">{entry.text}</span>
          ) : (
            <span className="text-foreground/80 pl-4">{entry.text}</span>
          )}
        </div>
      ))}

      {/* Active prompt */}
      <form onSubmit={handleSubmit} className="flex items-center leading-relaxed">
        <span className="terminal-prompt">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none terminal-command caret-[hsl(var(--terminal-green))] font-mono text-sm ml-0 p-0"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default InteractiveTerminal;
