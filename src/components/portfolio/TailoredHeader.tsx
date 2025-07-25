import { Profile, JobApplication } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface TailoredHeaderProps {
  profile: Profile;
  jobApplication: JobApplication;
  dynamicTagline?: string;
  companyColors?: {
    primary: string;
    secondary: string;
  };
}

const TailoredHeader = ({ 
  profile, 
  jobApplication, 
  dynamicTagline,
  companyColors 
}: TailoredHeaderProps) => {
  const primaryColor = companyColors?.primary || 'hsl(var(--primary))';
  const secondaryColor = companyColors?.secondary || 'hsl(var(--secondary))';

  return (
    <Card className="p-8 bg-gradient-to-r from-background to-muted/50 border-0 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div>
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ color: primaryColor }}
            >
              {profile.full_name}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mt-2 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {dynamicTagline || profile.tagline || 'Experienced Developer'}
            </motion.p>
          </div>

          {jobApplication.company_name && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Badge 
                variant="secondary" 
                className="text-sm px-3 py-1"
                style={{ 
                  backgroundColor: secondaryColor + '20',
                  color: primaryColor,
                  borderColor: primaryColor + '30'
                }}
              >
                Tailored for {jobApplication.company_name}
                {jobApplication.job_title && ` • ${jobApplication.job_title}`}
              </Badge>
            </motion.div>
          )}

          {profile.bio && (
            <motion.p 
              className="text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {profile.bio}
            </motion.p>
          )}
        </div>

        <motion.div 
          className="flex flex-col space-y-3 lg:min-w-[250px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {profile.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-muted-foreground" />
              <a 
                href={`mailto:${profile.email}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {profile.email}
              </a>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-muted-foreground" />
              <a 
                href={`tel:${profile.phone}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {profile.phone}
              </a>
            </div>
          )}

          {profile.linkedin_url && (
            <div className="flex items-center gap-3 text-sm">
              <Linkedin size={16} className="text-muted-foreground" />
              <a 
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          )}

          {profile.github_url && (
            <div className="flex items-center gap-3 text-sm">
              <Github size={16} className="text-muted-foreground" />
              <a 
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          )}

          {profile.website_url && (
            <div className="flex items-center gap-3 text-sm">
              <Globe size={16} className="text-muted-foreground" />
              <a 
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfolio Website
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </Card>
  );
};

export default TailoredHeader;