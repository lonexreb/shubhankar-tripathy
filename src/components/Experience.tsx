
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Briefcase, Trophy, Calendar } from 'lucide-react';

interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
}

const Experience = () => {
  const experiences: WorkExperience[] = [
    {
      company: "Dell Technologies",
      role: "Data Science Intern",
      period: "Summer 2023",
      description: "Worked on machine learning and data analysis projects to improve business processes and create predictive models.",
      achievements: [
        "Developed automated data pipeline increasing efficiency by 40%",
        "Created ML model with 92% accuracy for customer behavior prediction",
        "Implemented dashboard visualization tools for real-time analytics"
      ]
    },
    {
      company: "UMass Amherst",
      role: "Research Assistant",
      period: "2022 - Present",
      description: "Conducting research in machine learning applications, focusing on physics-informed neural networks and generative AI models.",
      achievements: [
        "Co-authored research paper on GPT-PINN integration",
        "Developed novel approach to scientific computing using neural networks",
        "Presented findings at two academic conferences"
      ]
    },
    {
      company: "Tech Startup",
      role: "ML Engineering Intern",
      period: "Summer 2022",
      description: "Assisted in developing AI solutions for early-stage startup focused on computer vision applications.",
      achievements: [
        "Built computer vision algorithm for product detection",
        "Optimized model performance for edge computing devices",
        "Created demo applications for potential investors"
      ]
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Helora - First Place",
      event: "CalHacks",
      date: "2023",
      description: "Won first place for developing a compassionate symptom diagnosis tool using Hume AI emotion detection."
    },
    {
      title: "Float Your Boat - Best Innovation",
      event: "HackMIT",
      date: "2022",
      description: "Recognized for most innovative solution in marine conservation technology challenge."
    },
    {
      title: "Pantry Pal - Best MVP",
      event: "Food Tech Hackathon",
      date: "2022",
      description: "Awarded best minimum viable product for privacy-focused food management application."
    },
    {
      title: "Intel AI Competition Finalist",
      event: "Intel AI Academy",
      date: "2021",
      description: "Selected as a finalist for developing efficient AI models for resource-constrained devices."
    },
  ];

  return (
    <section id="experience" className="section bg-secondary/50">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            My journey through industry, research, and academic experiences
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {/* Work Experiences */}
          <div>
            <ScrollReveal delay={200}>
              <h3 className="text-2xl font-medium mb-8 flex items-center">
                <Briefcase className="mr-2" size={24} />
                <span>Work Experience</span>
              </h3>
            </ScrollReveal>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <ScrollReveal key={index} delay={index * 100 + 300}>
                  <div className="bg-card rounded-xl p-8 shadow-subtle border border-border/40">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium">{exp.role}</h4>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-2" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 mb-6">{exp.description}</p>
                    
                    <h5 className="font-medium mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <ScrollReveal delay={200}>
              <h3 className="text-2xl font-medium mb-8 flex items-center">
                <Trophy className="mr-2" size={24} />
                <span>Hackathons & Achievements</span>
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <ScrollReveal key={index} delay={index * 100 + 300}>
                  <div className="bg-card rounded-xl p-6 shadow-subtle h-full border border-border/40 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-medium">{achievement.title}</h4>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {achievement.date}
                      </span>
                    </div>
                    <p className="text-primary/80 text-sm mb-3">{achievement.event}</p>
                    <p className="text-foreground/70 text-sm flex-grow">{achievement.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
