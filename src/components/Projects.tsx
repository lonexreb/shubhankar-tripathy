
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with React and Node.js. Features include user authentication, product filtering, and secure payment processing.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      links: {
        demo: "#",
        github: "#",
      },
    },
    {
      title: "Portfolio Website",
      description: "A minimalist portfolio website designed to showcase creative work. Features smooth animations and responsive design.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      links: {
        demo: "#",
        github: "#",
      },
    },
    {
      title: "Task Management App",
      description: "A productivity application that helps users manage tasks and projects. Includes features like task categorization, reminders, and progress tracking.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      links: {
        demo: "#",
        github: "#",
      },
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore a selection of my recent work and creative endeavors
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 100 + 200}>
              <div className="group h-full rounded-xl overflow-hidden bg-card shadow-subtle card-hover flex flex-col border border-border/40">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    <span className="inline-flex items-center justify-center p-1 rounded-full bg-primary/5 text-primary transition-transform duration-300 transform translate-y-0 group-hover:translate-y-0">
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/40">
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 ml-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={600}>
          <div className="mt-12 text-center">
            <a href="#" className="btn-outline">
              View All Projects
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
