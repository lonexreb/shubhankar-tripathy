
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Community from '@/components/Community';
import Recommendations from '@/components/Recommendations';
import Writing from '@/components/Writing';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-background font-mono"
      >
        <NavBar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Community />
        <Recommendations />
        <Writing />
        <Education />
        <Contact />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
