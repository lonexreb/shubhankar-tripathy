import { PortfolioContent } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface RelevantProjectsProps {
  projects: PortfolioContent[];
  highlightedKeywords: string[];
  onViewProject: (projectId: string) => void;
}

const RelevantProjects = ({ 
  projects, 
  highlightedKeywords, 
  onViewProject 
}: RelevantProjectsProps) => {
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

  if (!projects.length) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Relevant Projects</h2>
        <p className="text-muted-foreground">
          Key projects that align with your requirements
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {highlightText(project.title, highlightedKeywords)}
                  </CardTitle>
                  {project.relevance_score && (
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      {Math.round(project.relevance_score * 100)}% match
                    </Badge>
                  )}
                </div>

                {(project.start_date || project.end_date) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>
                      {formatDate(project.start_date)} - {formatDate(project.end_date) || 'Present'}
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {project.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {highlightText(project.description, highlightedKeywords)}
                  </p>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => {
                        const isHighlighted = highlightedKeywords.some(keyword =>
                          tech.toLowerCase().includes(keyword.toLowerCase())
                        );
                        
                        return (
                          <Badge
                            key={tech}
                            variant={isHighlighted ? "default" : "outline"}
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {project.impact_metrics && Object.keys(project.impact_metrics).length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Impact</h4>
                    <div className="text-sm text-muted-foreground">
                      {Object.entries(project.impact_metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewProject(project.id)}
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Details
                  <ExternalLink size={14} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelevantProjects;