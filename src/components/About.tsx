
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-secondary/50">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate professional dedicated to creating meaningful digital solutions
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="relative aspect-square w-full max-w-md mx-auto md:ml-auto rounded-2xl overflow-hidden shadow-card">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Profile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-medium mb-4">
                Bringing ideas to life through design and technology
              </h3>
              
              <p className="text-foreground/80">
                I'm a dedicated professional with expertise in creating elegant, user-centered digital experiences. With a strong foundation in both design thinking and technical implementation, I bring a holistic approach to every project I undertake.
              </p>
              
              <p className="text-foreground/80">
                My journey in the digital realm has equipped me with the skills to transform complex problems into intuitive solutions. I'm constantly exploring new technologies and methodologies to stay at the cutting edge of the industry.
              </p>
              
              <ul className="space-y-4 mt-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Professional Experience</h4>
                    <p className="text-sm text-foreground/70">Over 5 years in digital product development</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Education Background</h4>
                    <p className="text-sm text-foreground/70">Bachelor's in Computer Science</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-foreground/70">San Francisco, California</p>
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
