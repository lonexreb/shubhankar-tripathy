
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Briefcase, GraduationCap, MapPin, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-secondary/50">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Data Scientist and Machine Learning Engineer with a passion for innovative solutions
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="relative aspect-square w-full max-w-md mx-auto md:ml-auto rounded-2xl overflow-hidden shadow-card">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="Shubhankar Tripathy"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-medium mb-4">
                Pushing the boundaries of machine learning and data science
              </h3>
              
              <p className="text-foreground/80">
                I'm a Data Science and Machine Learning professional currently pursuing my academic journey at UMass Amherst, focusing on Data Science, Machine Learning, Statistics, and Deep Learning. As President of the Data Science Club, I'm passionate about advancing AI literacy and application.
              </p>
              
              <p className="text-foreground/80">
                My professional experience includes work at Dell Technologies and various internships where I've applied machine learning and data science to solve real-world problems. I specialize in creating intuitive, AI-driven solutions with a focus on user experience and privacy.
              </p>
              
              <div className="flex gap-4 mt-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:email@example.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-background/50 text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Mail size={18} />
                </a>
              </div>
              
              <ul className="space-y-4 mt-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Professional Experience</h4>
                    <p className="text-sm text-foreground/70">Dell Technologies, Internships, Research Positions</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-foreground/70">University of Massachusetts Amherst</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-foreground/70">Amherst, Massachusetts</p>
                  </div>
                </li>
              </ul>
              
              <div className="pt-4">
                <a href="#contact" className="btn-primary">Get in Touch</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
