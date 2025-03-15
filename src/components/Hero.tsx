
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6">
            Data Scientist & Machine Learning Engineer
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight md:leading-tight mb-6 text-foreground"
        >
          Shubhankar<br />Tripathy
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12"
        >
          Leveraging AI and machine learning to solve complex problems with elegant solutions. 
          UMass Amherst data scientist focused on creating impactful technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1, 
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a 
          href="#about" 
          className="flex flex-col items-center justify-center text-foreground/50 hover:text-foreground transition-colors duration-300"
          aria-label="Scroll to About section"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-bounce-subtle" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
