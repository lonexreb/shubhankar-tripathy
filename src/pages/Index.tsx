
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <NavBar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Blog />
        <Contact />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
