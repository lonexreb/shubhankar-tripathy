import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const jobHandle = url.pathname.split('/').pop();

    if (!jobHandle) {
      return new Response(
        JSON.stringify({ error: 'Job handle is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get job application
    const { data: jobApp, error: jobError } = await supabase
      .from('job_applications')
      .select('*')
      .eq('job_handle', jobHandle)
      .single();

    if (jobError || !jobApp) {
      console.error('Job not found:', jobError);
      return new Response(
        JSON.stringify({ error: 'Job application not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for existing tailored presentation
    const { data: existingPresentation } = await supabase
      .from('tailored_presentations')
      .select('*')
      .eq('job_handle', jobHandle)
      .single();

    if (existingPresentation && !existingPresentation.expires_at || 
        (existingPresentation.expires_at && new Date(existingPresentation.expires_at) > new Date())) {
      console.log('Returning cached presentation');
      return new Response(
        JSON.stringify(existingPresentation),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', jobApp.user_id)
      .single();

    if (profileError) {
      console.error('Profile not found:', profileError);
      return new Response(
        JSON.stringify({ error: 'User profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get portfolio content
    const { data: portfolioContent, error: contentError } = await supabase
      .from('portfolio_content')
      .select('*')
      .eq('user_id', jobApp.user_id);

    if (contentError) {
      console.error('Content error:', contentError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch portfolio content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create job description embedding for matching
    let jobEmbedding;
    const jobDescription = jobApp.job_description_text || '';
    
    if (jobDescription && openAIApiKey) {
      try {
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: jobDescription,
          }),
        });

        const embeddingData = await embeddingResponse.json();
        jobEmbedding = embeddingData.data[0].embedding;
      } catch (error) {
        console.error('Error generating embedding:', error);
      }
    }

    // Score and select content
    const scoredContent = await scoreContent(portfolioContent, jobApp, jobEmbedding, supabase);
    const selectedContent = selectTopContent(scoredContent);
    
    // Generate dynamic tagline
    const dynamicTagline = await generateDynamicTagline(profile, jobApp, selectedContent);

    // Create tailored presentation
    const presentation = {
      job_handle: jobHandle,
      user_id: jobApp.user_id,
      selected_content: selectedContent,
      relevance_scores: scoredContent.map(item => ({
        id: item.id,
        score: item.relevance_score
      })),
      layout_config: {
        theme: 'professional',
        highlight_skills: jobApp.skills_mentioned || [],
        company_colors: await detectCompanyColors(jobApp.company_name)
      },
      dynamic_tagline: dynamicTagline,
      highlighted_keywords: extractKeywords(jobDescription),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };

    // Store tailored presentation
    const { data: savedPresentation, error: saveError } = await supabase
      .from('tailored_presentations')
      .upsert(presentation, { onConflict: 'job_handle' })
      .select()
      .single();

    if (saveError) {
      console.error('Save error:', saveError);
      return new Response(
        JSON.stringify({ error: 'Failed to save tailored presentation' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update job application viewed_at
    await supabase
      .from('job_applications')
      .update({ viewed_at: new Date().toISOString() })
      .eq('job_handle', jobHandle);

    return new Response(
      JSON.stringify({
        ...savedPresentation,
        profile,
        job_application: jobApp
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in tailor function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function scoreContent(content: any[], jobApp: any, jobEmbedding: number[] | null, supabase: any) {
  const scoredContent = [];

  for (const item of content) {
    let score = 0;

    // Base scoring factors
    if (item.is_featured) score += 0.2;
    
    // Skill matching (40% weight)
    if (jobApp.skills_mentioned) {
      const skillMatches = jobApp.skills_mentioned.filter((skill: string) => 
        item.technologies?.some((tech: string) => 
          tech.toLowerCase().includes(skill.toLowerCase())
        ) || 
        item.keywords?.some((keyword: string) => 
          keyword.toLowerCase().includes(skill.toLowerCase())
        )
      );
      score += (skillMatches.length / jobApp.skills_mentioned.length) * 0.4;
    }

    // Content type relevance (30% weight)
    if (item.content_type === 'project') score += 0.3;
    else if (item.content_type === 'experience') score += 0.25;
    else if (item.content_type === 'skill') score += 0.2;

    // Vector similarity (30% weight) if embeddings available
    if (jobEmbedding && item.embedding) {
      try {
        const similarity = await calculateCosineSimilarity(jobEmbedding, item.embedding, supabase);
        score += similarity * 0.3;
      } catch (error) {
        console.error('Error calculating similarity:', error);
      }
    }

    scoredContent.push({
      ...item,
      relevance_score: Math.min(score, 1.0) // Cap at 1.0
    });
  }

  return scoredContent.sort((a, b) => b.relevance_score - a.relevance_score);
}

function selectTopContent(scoredContent: any[]) {
  const projects = scoredContent.filter(item => item.content_type === 'project').slice(0, 3);
  const skills = scoredContent.filter(item => item.content_type === 'skill').slice(0, 8);
  const experiences = scoredContent.filter(item => item.content_type === 'experience').slice(0, 3);
  const achievements = scoredContent.filter(item => item.content_type === 'achievement').slice(0, 2);

  return {
    projects,
    skills,
    experiences,
    achievements
  };
}

async function calculateCosineSimilarity(vec1: number[], vec2: any, supabase: any): Promise<number> {
  try {
    // Use Supabase's vector similarity function
    const { data, error } = await supabase.rpc('calculate_similarity', {
      vec1: vec1,
      vec2: vec2
    });
    
    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Similarity calculation error:', error);
    return 0;
  }
}

async function generateDynamicTagline(profile: any, jobApp: any, selectedContent: any): Promise<string> {
  if (!openAIApiKey) {
    return `${profile.full_name} - Experienced Developer`;
  }

  const topSkills = selectedContent.skills?.slice(0, 3).map((s: any) => s.title).join(', ') || '';
  const relevantExperience = selectedContent.experiences?.[0]?.role || '';

  const prompt = `Generate a professional tagline for ${profile.full_name} applying to ${jobApp.job_title || 'a position'} at ${jobApp.company_name || 'the company'}. 
  
  Key skills: ${topSkills}
  Recent role: ${relevantExperience}
  
  Make it concise (under 60 characters), compelling, and tailored to the role. Focus on value proposition.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim().replace(/"/g, '');
  } catch (error) {
    console.error('Error generating tagline:', error);
    return `${profile.full_name} - Experienced ${relevantExperience || 'Developer'}`;
  }
}

async function detectCompanyColors(companyName: string | null): Promise<any> {
  // Simple company color mapping - could be enhanced with logo detection
  const companyColors: Record<string, any> = {
    'google': { primary: '#4285f4', secondary: '#ea4335' },
    'microsoft': { primary: '#0078d4', secondary: '#00bcf2' },
    'apple': { primary: '#007aff', secondary: '#5856d6' },
    'meta': { primary: '#1877f2', secondary: '#42b883' },
    'amazon': { primary: '#ff9900', secondary: '#232f3e' }
  };

  if (companyName) {
    const company = companyName.toLowerCase();
    for (const [key, colors] of Object.entries(companyColors)) {
      if (company.includes(key)) {
        return colors;
      }
    }
  }

  return { primary: '#2563eb', secondary: '#1e40af' }; // Default blue theme
}

function extractKeywords(text: string): string[] {
  if (!text) return [];
  
  const keywords = text
    .toLowerCase()
    .match(/\b(?:react|vue|angular|node|python|java|typescript|javascript|aws|docker|kubernetes|sql|graphql|rest|api|frontend|backend|fullstack|agile|scrum)\b/g);
  
  return [...new Set(keywords || [])];
}