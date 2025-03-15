
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  courses: string[];
}

interface Leadership {
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
}

const Education = () => {
  const educations: Education[] = [
    {
      institution: "University of Massachusetts Amherst",
      degree: "Bachelor of Science in Computer Science",
      period: "2020 - 2024 (Expected)",
      description: "Specializing in Data Science, Machine Learning, and Artificial Intelligence with a focus on advanced neural network architectures and applications.",
      courses: [
        "Machine Learning",
        "Deep Learning",
        "Data Science Fundamentals",
        "Statistical Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning"
      ]
    }
  ];

  const leadershipRoles: Leadership[] = [
    {
      role: "President",
      organization: "Data Science Club",
      period: "2022 - Present",
      description: "Leading the UMass Amherst Data Science Club, organizing workshops, hackathons, and industry networking events.",
      achievements: [
        "Grew membership by 40% through targeted outreach",
        "Organized 12 workshops on AI/ML technologies",
        "Established partnerships with 5 industry sponsors",
        "Facilitated networking between students and industry professionals"
      ]
    },
    {
      role: "Founder",
      organization: "Computer & Data Science Association (CADSA)",
      period: "2021 - Present",
      description: "Founded an interdisciplinary association connecting computer science and data science students for collaborative projects and learning.",
      achievements: [
        "Created platform for interdisciplinary collaboration",
        "Organized cross-departmental hackathon events",
        "Established peer mentoring program",
        "Facilitated research opportunities for undergraduates"
      ]
    }
  ];

  return (
    <section id="education" className="section bg-secondary/50">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Education & Leadership</h2>
          <p className="section-subtitle">
            Academic background and leadership experiences
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {/* Education */}
          <div>
            <ScrollReveal delay={200}>
              <h3 className="text-2xl font-medium mb-8 flex items-center">
                <GraduationCap className="mr-2" size={24} />
                <span>Education</span>
              </h3>
            </ScrollReveal>

            <div className="space-y-8">
              {educations.map((edu, index) => (
                <ScrollReveal key={index} delay={300}>
                  <div className="bg-card rounded-xl p-8 shadow-subtle border border-border/40">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium">{edu.degree}</h4>
                        <p className="text-primary">{edu.institution}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 mb-6">{edu.description}</p>
                    
                    <div className="mb-6">
                      <h5 className="font-medium mb-3 flex items-center">
                        <BookOpen size={16} className="mr-2" />
                        <span>Relevant Coursework:</span>
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <ScrollReveal delay={200}>
              <h3 className="text-2xl font-medium mb-8 flex items-center">
                <Award className="mr-2" size={24} />
                <span>Leadership Roles</span>
              </h3>
            </ScrollReveal>

            <div className="space-y-8">
              {leadershipRoles.map((role, index) => (
                <ScrollReveal key={index} delay={index * 100 + 300}>
                  <div className="bg-card rounded-xl p-8 shadow-subtle border border-border/40">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium">{role.role}</h4>
                        <p className="text-primary">{role.organization}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-2" />
                        <span>{role.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 mb-6">{role.description}</p>
                    
                    <h5 className="font-medium mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {role.achievements.map((achievement, i) => (
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
        </div>
      </div>
    </section>
  );
};

export default Education;
