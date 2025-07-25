import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TailorResponse } from '@/types/portfolio';
import TailoredHeader from '@/components/portfolio/TailoredHeader';
import RelevantProjects from '@/components/portfolio/RelevantProjects';
import SkillsMatrix from '@/components/portfolio/SkillsMatrix';
import ExperienceHighlights from '@/components/portfolio/ExperienceHighlights';
import CallToAction from '@/components/portfolio/CallToAction';
import LoadingSkeleton from '@/components/portfolio/LoadingSkeleton';
import { motion } from 'framer-motion';

const Apply = () => {
  const [searchParams] = useSearchParams();
  const [presentation, setPresentation] = useState<TailorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      setError('Invalid or missing code parameter');
      setLoading(false);
      return;
    }

    fetchTailoredPresentation();
  }, [code]);

  useEffect(() => {
    // Track view analytics when component mounts
    if (presentation) {
      trackView();
    }

    // Track time spent and sections viewed on unmount
    return () => {
      if (presentation) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        trackView({
          time_spent: timeSpent,
          sections_viewed: ['header', 'projects', 'skills', 'experience'],
          actions_taken: { page_viewed: true }
        });
      }
    };
  }, [presentation]);

  const fetchTailoredPresentation = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('tailor', {
        body: { code }
      });

      if (error) throw error;

      setPresentation(data);
      
      // Set dynamic title and meta tags
      if (data.profile && data.job_application) {
        document.title = `${data.profile.full_name} - ${data.job_application.job_title || 'Portfolio'}`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', 
            `${data.profile.full_name}'s portfolio tailored for ${data.job_application.company_name || 'this opportunity'}`
          );
        }
      }
    } catch (err) {
      console.error('Error fetching presentation:', err);
      setError('Failed to load tailored presentation');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (additionalData?: any) => {
    if (!presentation) return;

    try {
      await supabase.functions.invoke('track-view', {
        body: {
          job_handle: presentation.job_handle,
          user_id: presentation.user_id,
          ...additionalData
        }
      });
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  const handleAction = (action: string, data?: any) => {
    trackView({
      actions_taken: { [action]: true, ...data }
    });
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            {error || 'Presentation not found'}
          </h1>
          <p className="text-muted-foreground">
            The link you followed may be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background print:bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <motion.div variants={itemVariants}>
          <TailoredHeader 
            profile={presentation.profile}
            jobApplication={presentation.job_application}
            dynamicTagline={presentation.dynamic_tagline}
            companyColors={presentation.layout_config.company_colors}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <RelevantProjects 
            projects={presentation.selected_content.projects}
            highlightedKeywords={presentation.highlighted_keywords || []}
            onViewProject={(projectId) => handleAction('view_project', { project_id: projectId })}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillsMatrix 
            skills={presentation.selected_content.skills}
            highlightSkills={presentation.layout_config.highlight_skills}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ExperienceHighlights 
            experiences={presentation.selected_content.experiences}
            highlightedKeywords={presentation.highlighted_keywords || []}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CallToAction 
            profile={presentation.profile}
            jobApplication={presentation.job_application}
            onContact={(method) => handleAction('contact_attempt', { method })}
          />
        </motion.div>
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print { display: none !important; }
            .print-break { page-break-after: always; }
            body { print-color-adjust: exact; }
          }
        `
      }} />
    </motion.div>
  );
};

export default Apply;