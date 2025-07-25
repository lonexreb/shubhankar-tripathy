import { PortfolioContent } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface SkillsMatrixProps {
  skills: PortfolioContent[];
  highlightSkills: string[];
}

const SkillsMatrix = ({ skills, highlightSkills }: SkillsMatrixProps) => {
  const getSkillLevel = (proficiency?: number) => {
    if (!proficiency) return 'Intermediate';
    if (proficiency <= 2) return 'Beginner';
    if (proficiency <= 3) return 'Intermediate';
    if (proficiency <= 4) return 'Advanced';
    return 'Expert';
  };

  const getSkillProgress = (proficiency?: number) => {
    return ((proficiency || 3) / 5) * 100;
  };

  const categorizeSkills = (skills: PortfolioContent[]) => {
    const categories: Record<string, PortfolioContent[]> = {
      'Frontend': [],
      'Backend': [],
      'Tools & Platforms': [],
      'Other': []
    };

    skills.forEach(skill => {
      const title = skill.title.toLowerCase();
      const description = skill.description?.toLowerCase() || '';
      const tags = skill.tags?.join(' ').toLowerCase() || '';
      const content = `${title} ${description} ${tags}`;

      if (content.includes('frontend') || content.includes('react') || content.includes('vue') || 
          content.includes('angular') || content.includes('css') || content.includes('html') ||
          content.includes('javascript') || content.includes('typescript')) {
        categories['Frontend'].push(skill);
      } else if (content.includes('backend') || content.includes('server') || content.includes('api') ||
                 content.includes('database') || content.includes('node') || content.includes('python') ||
                 content.includes('java') || content.includes('sql')) {
        categories['Backend'].push(skill);
      } else if (content.includes('tool') || content.includes('platform') || content.includes('aws') ||
                 content.includes('docker') || content.includes('kubernetes') || content.includes('git')) {
        categories['Tools & Platforms'].push(skill);
      } else {
        categories['Other'].push(skill);
      }
    });

    // Remove empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  };

  if (!skills.length) {
    return null;
  }

  const categorizedSkills = categorizeSkills(skills);

  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Skills & Expertise</h2>
        <p className="text-muted-foreground">
          Technical skills relevant to this opportunity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(categorizedSkills).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-center">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySkills.map((skill, index) => {
                  const isHighlighted = highlightSkills.some(highlight =>
                    skill.title.toLowerCase().includes(highlight.toLowerCase()) ||
                    skill.technologies?.some(tech => 
                      tech.toLowerCase().includes(highlight.toLowerCase())
                    )
                  );

                  const progress = getSkillProgress(skill.proficiency_level);
                  const level = getSkillLevel(skill.proficiency_level);

                  return (
                    <motion.div
                      key={skill.id}
                      className={`space-y-2 p-3 rounded-lg transition-colors ${
                        isHighlighted ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${isHighlighted ? 'text-primary' : 'text-foreground'}`}>
                              {skill.title}
                            </h4>
                            {isHighlighted && (
                              <Badge variant="default" className="text-xs">
                                Match
                              </Badge>
                            )}
                          </div>
                          
                          {skill.years_experience && (
                            <p className="text-sm text-muted-foreground">
                              {skill.years_experience} {skill.years_experience === 1 ? 'year' : 'years'} experience
                            </p>
                          )}
                        </div>
                        
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {level}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Proficiency</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress 
                          value={progress} 
                          className={`h-2 ${isHighlighted ? '[&>div]:bg-primary' : ''}`}
                        />
                      </div>

                      {skill.description && (
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      )}

                      {skill.technologies && skill.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {skill.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {skill.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{skill.technologies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMatrix;