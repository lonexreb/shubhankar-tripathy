-- Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  tagline TEXT,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_handle TEXT NOT NULL UNIQUE,
  company_name TEXT,
  job_title TEXT,
  job_description_url TEXT,
  job_description_text TEXT,
  requirements TEXT[],
  skills_mentioned TEXT[],
  viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_content table with vector embeddings
CREATE TABLE public.portfolio_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('project', 'skill', 'experience', 'achievement')),
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[],
  tags TEXT[],
  keywords TEXT[],
  impact_metrics JSONB,
  start_date DATE,
  end_date DATE,
  company TEXT,
  role TEXT,
  proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
  years_experience INTEGER,
  is_featured BOOLEAN DEFAULT false,
  embedding vector(1536), -- OpenAI embeddings dimension
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tailored_presentations table
CREATE TABLE public.tailored_presentations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_handle TEXT NOT NULL,
  user_id UUID NOT NULL,
  selected_content JSONB NOT NULL,
  relevance_scores JSONB,
  layout_config JSONB,
  dynamic_tagline TEXT,
  highlighted_keywords TEXT[],
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create view_analytics table
CREATE TABLE public.view_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_handle TEXT NOT NULL,
  user_id UUID NOT NULL,
  viewer_ip TEXT,
  viewer_agent TEXT,
  company_detected TEXT,
  time_spent INTEGER, -- seconds
  sections_viewed TEXT[],
  actions_taken JSONB, -- clicks, downloads, contacts
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tailored_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.view_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for job_applications
CREATE POLICY "Users can manage their own job applications" 
ON public.job_applications FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for portfolio_content
CREATE POLICY "Users can manage their own portfolio content" 
ON public.portfolio_content FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for tailored_presentations
CREATE POLICY "Users can manage their own presentations" 
ON public.tailored_presentations FOR ALL 
USING (auth.uid() = user_id);

-- Public read access for presentations via job_handle
CREATE POLICY "Public can view presentations by job_handle" 
ON public.tailored_presentations FOR SELECT 
USING (true);

-- Create RLS policies for view_analytics
CREATE POLICY "Users can view their own analytics" 
ON public.view_analytics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert view analytics" 
ON public.view_analytics FOR INSERT 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_job_applications_handle ON public.job_applications(job_handle);
CREATE INDEX idx_job_applications_user ON public.job_applications(user_id);
CREATE INDEX idx_portfolio_content_user ON public.portfolio_content(user_id);
CREATE INDEX idx_portfolio_content_type ON public.portfolio_content(content_type);
CREATE INDEX idx_portfolio_content_embedding ON public.portfolio_content USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_tailored_presentations_handle ON public.tailored_presentations(job_handle);
CREATE INDEX idx_view_analytics_handle ON public.view_analytics(job_handle);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_content_updated_at
  BEFORE UPDATE ON public.portfolio_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();