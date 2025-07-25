import { PortfolioContent } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceHighlightsProps {
  experiences: PortfolioContent[];
  highlightedKeywords: string[];
}

const ExperienceHighlights = ({ experiences, highlightedKeywords }: ExperienceHighlightsProps) => {
  const highlightText = (text: string, keywords: string[]) => {
    if (!keywords.length) return text;
    
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      const isKeyword = keywords.some(keyword => 
        part.toLowerCase() === keyword.toLowerCase()
      );
      
      return isKeyword ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      );
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDuration = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    
    return `${years}y ${remainingMonths}m`;
  };

  const parseAchievements = (description?: string) => {
    if (!description) return [];
    
    // Split by bullet points, dashes, or line breaks
    const achievements = description
      .split(/[•\-\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    return achievements;
  };

  if (!experiences.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Experience Highlights</h2>
        <p className="text-muted-foreground">
          Relevant professional experience and achievements
        </p>
      </div>

      <div className="space-y-6">
        {experiences.slice(0, 3).map((experience, index) => {
          const achievements = parseAchievements(experience.description);
          const duration = calculateDuration(experience.start_date, experience.end_date);

          return (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {highlightText(experience.role || experience.title, highlightedKeywords)}
                      </CardTitle>
                      
                      {experience.company && (
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                          <Building2 size={18} />
                          <span>{experience.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 sm:text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground sm:justify-end">
                        <Calendar size={14} />
                        <span>
                          {formatDate(experience.start_date)} - {formatDate(experience.end_date) || 'Present'}
                        </span>
                      </div>
                      
                      {duration && (
                        <Badge variant="outline" className="text-xs">
                          {duration}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {experience.technologies.map((tech) => {
                        const isHighlighted = highlightedKeywords.some(keyword =>
                          tech.toLowerCase().includes(keyword.toLowerCase())
                        );
                        
                        return (
                          <Badge
                            key={tech}
                            variant={isHighlighted ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {achievements.length > 0 ? (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Key Achievements</h4>
                      <ul className="space-y-2">
                        {achievements.slice(0, 4).map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1.5 text-xs">●</span>
                            <span className="leading-relaxed">
                              {highlightText(achievement, highlightedKeywords)}
                            </span>
                          </li>
                        ))}
                        {achievements.length > 4 && (
                          <li className="text-sm text-muted-foreground italic">
                            +{achievements.length - 4} more achievements
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : experience.description && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Description</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {highlightText(experience.description, highlightedKeywords)}
                      </p>
                    </div>
                  )}

                  {experience.impact_metrics && Object.keys(experience.impact_metrics).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Impact Metrics</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Object.entries(experience.impact_metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-lg font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceHighlights;