import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { job_description_url, job_description_text, company_name, job_title, user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique job handle
    const jobHandle = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Extract job requirements if URL provided
    let extractedText = job_description_text;
    let requirements: string[] = [];
    let skillsMentioned: string[] = [];

    if (job_description_url && !job_description_text) {
      try {
        console.log('Fetching job description from URL:', job_description_url);
        const response = await fetch(job_description_url);
        const html = await response.text();
        
        // Basic HTML text extraction
        extractedText = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        // Extract common requirement patterns
        const reqPatterns = [
          /(?:requirements?|qualifications?|must have|required):?\s*([^.]*)/gi,
          /(?:experience with|proficient in|knowledge of):?\s*([^.]*)/gi
        ];

        reqPatterns.forEach(pattern => {
          const matches = extractedText.match(pattern);
          if (matches) {
            requirements.push(...matches);
          }
        });

        // Extract skills
        const skillPatterns = [
          /\b(?:JavaScript|TypeScript|React|Python|Java|SQL|AWS|Docker|Kubernetes|Node\.js|GraphQL|REST|API)\b/gi
        ];
        
        skillPatterns.forEach(pattern => {
          const matches = extractedText.match(pattern);
          if (matches) {
            skillsMentioned.push(...matches.map(skill => skill.toLowerCase()));
          }
        });

      } catch (error) {
        console.error('Error fetching job description:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch job description from URL' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Store job application
    const { data: jobApp, error: jobError } = await supabase
      .from('job_applications')
      .insert({
        user_id,
        job_handle: jobHandle,
        company_name,
        job_title,
        job_description_url,
        job_description_text: extractedText,
        requirements: requirements.length > 0 ? requirements : null,
        skills_mentioned: [...new Set(skillsMentioned)] // Remove duplicates
      })
      .select()
      .single();

    if (jobError) {
      console.error('Database error:', jobError);
      return new Response(
        JSON.stringify({ error: 'Failed to store job application' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const shareableUrl = `${req.headers.get('origin') || 'https://yoursite.com'}/apply?code=${jobHandle}`;

    return new Response(
      JSON.stringify({
        job_handle: jobHandle,
        shareable_url: shareableUrl,
        job_application: jobApp
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-code function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});