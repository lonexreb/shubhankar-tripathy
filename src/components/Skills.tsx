
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';

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
      name: "Machine Learning & AI",
      skills: [
        { name: "Machine Learning", level: 95 },
        { name: "Deep Learning", level: 90 },
        { name: "Reinforcement Learning", level: 85 },
        { name: "Generative AI", level: 90 },
        { name: "Natural Language Processing", level: 85 },
      ],
    },
    {
      name: "Programming Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "C++", level: 80 },
        { name: "Java", level: 75 },
        { name: "JavaScript", level: 85 },
        { name: "SQL", level: 85 },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "Scikit-learn", level: 95 },
        { name: "Hugging Face", level: 85 },
        { name: "Next.js", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technical proficiencies and specialized knowledge areas
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
                "AWS", "GCP", "Vercel", "Anyscale", "Supabase",
                "Hume AI EVI2", "Tailwind CSS", "Computer Vision",
                "Statistical Analysis", "Data Visualization", "Time Series Analysis",
                "A/B Testing", "Feature Engineering", "Transfer Learning",
                "MLOps", "LLMs", "Transformers", "Fetch.ai"
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
