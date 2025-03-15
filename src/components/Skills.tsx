
import React from 'react';
import { ScrollReveal } from './ui/ScrollReveal';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0-100
  }[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      skills: [
        { name: "HTML & CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 85 },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 65 },
        { name: "GraphQL", level: 60 },
      ],
    },
    {
      name: "Design & Tools",
      skills: [
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Git", level: 80 },
        { name: "Responsive Design", level: 95 },
        { name: "UX/UI Design", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="section bg-secondary/50">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical capabilities and proficiencies
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={index} delay={index * 150 + 200}>
              <div className="bg-card shadow-subtle rounded-xl p-8 border border-border/40 h-full">
                <h3 className="text-xl font-medium mb-6">{category.name}</h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out-expo"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={700}>
          <div className="mt-16 bg-card shadow-subtle rounded-xl p-8 border border-border/40">
            <h3 className="text-xl font-medium mb-6 text-center">Additional Expertise</h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Webpack", "Redux", "Next.js", "Vue.js", "SASS/SCSS", 
                "Firebase", "Jest", "Cypress", "AWS", "Docker", 
                "CI/CD", "RESTful APIs", "Agile Methodology", "Performance Optimization",
                "Accessibility", "SEO", "Animation", "Responsive Design"
              ].map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
