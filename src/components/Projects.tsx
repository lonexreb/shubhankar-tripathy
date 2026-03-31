
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import TerminalWindow from './terminal/TerminalWindow';

interface Project {
  title: string;
  description: string;
  tags: string[];
  stars?: number;
  image?: string;
  links: {
    github?: string;
    demo?: string;
  };
}

const projects: Project[] = [
  {
    title: 'site2cli',
    description:
      'Turn any website into a CLI/API for AI agents. Progressive formalization with auto API discovery and MCP server generation.',
    tags: ['Python', 'MCP', 'CLI', 'AI Agents'],
    stars: 17,
    links: {
      github: 'https://github.com/lonexreb/site2cli',
    },
  },
  {
    title: 'tentalis',
    description:
      'Meta-RL framework for continuous agent improvement with RLHF/GRPO. Event-driven NATS architecture for scalable agent training.',
    tags: ['Python', 'RLHF', 'GRPO', 'Meta-RL', 'NATS'],
    links: {
      github: 'https://github.com/lonexreb/tentalis',
    },
  },
  {
    title: 'MCPstudio',
    description:
      'Postman for MCP servers. Build, test, and debug Model Context Protocol server implementations.',
    tags: ['TypeScript', 'MCP', 'FastAPI', 'React'],
    stars: 2,
    links: {
      github: 'https://github.com/lonexreb/MCPstudio',
    },
  },
  {
    title: 'Zigsaw',
    description:
      'Agentic social media marketing content generation platform using Browser Use. Won YC AI Hackathon Enterprise Agents (hosted by Dedalus Labs @ YC). Built with Luis Sanchez & Neal Conway.',
    tags: ['Python', 'Browser Use', 'AI Agents', 'YC'],
    image: '/images/zigsaw-yc-win.jpg',
    links: {
      demo: 'https://zigsaw.dev',
    },
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">ls -la ~/projects/</span>
          </p>
          <p className="section-subtitle">
            <span className="text-muted-foreground">
              // {projects.length} items found
            </span>
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <TerminalWindow
                showChrome={false}
                className="h-full card-hover border border-border hover:border-terminal-cyan/40"
              >
                <div className="flex flex-col h-full gap-3">
                  {/* Optional image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-sm border border-border/50 -mt-1"
                      loading="lazy"
                    />
                  )}

                  {/* Title + stars */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono font-semibold text-base text-terminal-yellow">
                      {project.title}
                    </h3>
                    {project.stars && (
                      <span className="flex items-center gap-1 text-xs text-terminal-orange font-mono">
                        <Star size={12} />
                        {project.stars}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 text-sm font-sans leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-0.5 border border-border rounded-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-terminal-cyan hover:text-terminal-green transition-colors duration-150"
                      >
                        <Github size={13} />
                        [source]
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-terminal-cyan hover:text-terminal-green transition-colors duration-150"
                      >
                        <ExternalLink size={13} />
                        [demo]
                      </a>
                    )}
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
