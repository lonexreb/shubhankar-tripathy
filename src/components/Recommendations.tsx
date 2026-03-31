
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from './terminal/TerminalWindow';

interface Recommendation {
  name: string;
  title: string;
  credential: string;
  text: string;
  relationship: string;
}

const recommendations: Recommendation[] = [
  {
    name: 'Prof. Bruno Castro Da Silva',
    title: 'Assistant Professor, Autonomous Learning Lab - UMass Amherst',
    credential:
      'Co-Director of the Autonomous Learning Lab. PhD advised by Andrew Barto (pioneer of reinforcement learning).',
    text: "Shubhankar is amazing. He is easily one of the most creative and passionate students to take my graduate-level machine learning course at UMass. In the ~3-4 years since I met him, I've been consistently impressed by how quickly he learns complex new topics and how rigorously he engages with them. He does not stop at learning how to use and deploy ML algorithms. He is consistently and deeply engaged in understanding them at a fundamental level, taking the time to formally re-derive update rules and carefully work through the mathematical assumptions underlying each method. This depth of understanding adds a further layer to his technical capabilities and sets him apart, going well beyond what most ML engineers typically focus on. Any team would be fortunate to have him!",
    relationship: "Bruno was Shubhankar's teacher",
  },
  {
    name: 'Tim Lee',
    title: 'Senior Data & AI Leader | Generative AI Strategist | Principal Data Scientist',
    credential:
      'Machine Learning Product Builder at Dell Technologies.',
    text: "As part of Shubhankar's internship at Dell, he helped us find creative ways to reduce the GPU computational needs for our GenAI models by predicting case outcomes before triggering if a GenAI insight would be useful. He was always eager to delve deeper into complex problems, demonstrating a genuine enthusiasm for learning. His eagerness to share his knowledge of other related topics not only contributed to our team's collective learning but also demonstrated his commitment to collaborative growth. The curiosity and passion Shubankar has for data science is infectious he fuels constant excitement to discover new capabilities. His passion and dedication would be an asset to any data science team.",
    relationship: 'Tim managed Shubhankar directly at Dell',
  },
  {
    name: 'Abhinav Kommalapati',
    title: 'AI & Software Engineering Intern @ DynaPrice | Honors CS Student @ UMass Amherst',
    credential:
      'Prev SWE @ Vitamap, Besanth Technologies. ML Engineer @ UMass Data Science.',
    text: "I had the privilege of learning Machine Learning under the guidance of Shubhankar Tripathy, and I can confidently say that he's one of the most impactful mentors I've ever had. Just a few months ago, I had absolutely no idea what ML even was. I was completely new\u2014clueless about algorithms, models, or even basic data preprocessing. That changed when I met Shubhankar. He didn't just teach me the concepts\u2014he inspired me to believe that I could understand and master them. He has a rare ability to break down complex topics like regression, SVMs, or model evaluation into simple, intuitive explanations. More importantly, he was patient through all my doubts, errors, and frustrations\u2014encouraging me to keep going even when I felt stuck. Thanks to his mentorship, I was able to implement ML algorithms from scratch, build complete projects, and even create my own AI-based application. Every model I've built, and every confidence I now have in ML all of it began with Shubhankar's support. If you're looking for someone who not only understands Machine Learning deeply but also has the passion and clarity to teach it, you won't find many like him. Grateful to have learned from the best.",
    relationship: 'Abhinav reported to Shubhankar directly',
  },
  {
    name: 'Luis Sanchez',
    title: 'Founding Engineer @ Cloud Cruise (YC W24)',
    credential:
      'Y Combinator W24 batch. Worked with Shubhankar across hackathons, research, and engineering projects.',
    text: "I've had the pleasure of working closely with Shubhankar across hackathons, research work, and complex state of the art engineering projects, and he's someone who consistently brings both technical depth and great energy to a team. We've spent plenty of late nights tackling difficult problems together, pushing ideas further than we thought we could, and even winning hackathons along the way. He's sharp, resourceful, and the kind of engineer who doesn't shy away from difficult challenges, but is absorbed by them. Shubhankar also had gone out of his way to advocate for me personally in my job search, which speaks to the kind of teammate and person he is. Beyond his technical ability, he's a genuinely kind person who cares about the people he works with and the teams he's part of, and what stands out most is his attitude. In the best way, he's bold, proactive, and not afraid to push forward when others might hesitate. His combination of technical ability, drive, and loyalty makes him someone I'd gladly work with.",
    relationship: 'Luis worked with Shubhankar on the same team',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Recommendations = () => {
  return (
    <section id="recommendations" className="section">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="mb-10">
          <p className="section-title">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-command">cat recommendations/</span>
          </p>
        </div>

        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {recommendations.map((rec) => (
            <motion.div key={rec.name} variants={item}>
              <TerminalWindow showChrome={false} className="border border-border">
                <div className="space-y-3">
                  {/* Recommender info */}
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-terminal-cyan">
                      {rec.name}
                    </h3>
                    <p className="font-mono text-xs text-foreground/80">
                      {rec.title}
                    </p>
                    <p className="font-mono text-[11px] text-terminal-purple">
                      {rec.credential}
                    </p>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-terminal-green/40 pl-4">
                    <p className="text-foreground/85 text-sm font-sans leading-relaxed italic">
                      &ldquo;{rec.text}&rdquo;
                    </p>
                  </blockquote>

                  {/* Relationship */}
                  <p className="font-mono text-[11px] text-muted-foreground">
                    // {rec.relationship}
                  </p>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
