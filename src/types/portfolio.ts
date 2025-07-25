export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  tagline?: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  job_handle: string;
  company_name?: string;
  job_title?: string;
  job_description_url?: string;
  job_description_text?: string;
  requirements?: string[];
  skills_mentioned?: string[];
  viewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioContent {
  id: string;
  user_id: string;
  content_type: 'project' | 'skill' | 'experience' | 'achievement';
  title: string;
  description?: string;
  technologies?: string[];
  tags?: string[];
  keywords?: string[];
  impact_metrics?: Record<string, any>;
  start_date?: string;
  end_date?: string;
  company?: string;
  role?: string;
  proficiency_level?: number;
  years_experience?: number;
  is_featured: boolean;
  embedding?: number[];
  relevance_score?: number;
  created_at: string;
  updated_at: string;
}

export interface TailoredPresentation {
  id: string;
  job_handle: string;
  user_id: string;
  selected_content: {
    projects: PortfolioContent[];
    skills: PortfolioContent[];
    experiences: PortfolioContent[];
    achievements: PortfolioContent[];
  };
  relevance_scores?: Record<string, number>;
  layout_config: {
    theme: string;
    highlight_skills: string[];
    company_colors?: {
      primary: string;
      secondary: string;
    };
  };
  dynamic_tagline?: string;
  highlighted_keywords?: string[];
  expires_at?: string;
  created_at: string;
}

export interface ViewAnalytics {
  id: string;
  job_handle: string;
  user_id: string;
  viewer_ip?: string;
  viewer_agent?: string;
  company_detected?: string;
  time_spent?: number;
  sections_viewed?: string[];
  actions_taken?: Record<string, any>;
  created_at: string;
}

export interface GenerateCodeRequest {
  job_description_url?: string;
  job_description_text?: string;
  company_name?: string;
  job_title?: string;
  user_id: string;
}

export interface GenerateCodeResponse {
  job_handle: string;
  shareable_url: string;
  job_application: JobApplication;
}

export interface TailorResponse extends TailoredPresentation {
  profile: Profile;
  job_application: JobApplication;
}