
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  link: string;
  tags: string[];
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      title: "The Evolution of Large Language Models in 2023",
      date: "December 15, 2023",
      excerpt: "An exploration of how LLMs have evolved over the past year and what we can expect in the future of generative AI.",
      link: "#",
      tags: ["AI", "LLMs", "Machine Learning"]
    },
    {
      title: "Implementing Physics-Informed Neural Networks for Scientific Computing",
      date: "November 10, 2023",
      excerpt: "A technical deep dive into how PINNs can be used to solve complex physics problems using neural networks.",
      link: "#",
      tags: ["PINNs", "Neural Networks", "Scientific Computing"]
    },
    {
      title: "Privacy-Preserving Machine Learning: Techniques and Applications",
      date: "October 5, 2023",
      excerpt: "Examining methods to create ML models that protect user privacy while maintaining performance.",
      link: "#",
      tags: ["Privacy", "Machine Learning", "Data Ethics"]
    },
    {
      title: "Building Emotion-Aware AI Systems with Hume AI",
      date: "September 15, 2023",
      excerpt: "How emotion recognition technologies can create more human-centered AI applications.",
      link: "#",
      tags: ["Emotion AI", "Hume AI", "UX Design"]
    },
  ];

  return (
    <section id="blog" className="section">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
          <h2 className="section-title">Blog & Articles</h2>
          <p className="section-subtitle">
            Thoughts, insights, and technical writing on machine learning and AI
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 100 + 200}>
              <a 
                href={post.link} 
                className="group block bg-card rounded-xl p-6 shadow-subtle border border-border/40 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar size={14} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors duration-200 flex items-center justify-between">
                  <span>{post.title}</span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </h3>
                
                <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-3">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={600}>
          <div className="mt-12 text-center">
            <a href="#" className="btn-outline">
              View All Articles
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Blog;
