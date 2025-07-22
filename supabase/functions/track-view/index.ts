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

    const {
      job_handle,
      user_id,
      time_spent,
      sections_viewed,
      actions_taken
    } = await req.json();

    if (!job_handle || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Job handle and user ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract visitor information
    const clientIP = req.headers.get('cf-connecting-ip') || 
                    req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Detect company from user agent or referrer (basic implementation)
    const companyDetected = detectCompanyFromRequest(req);

    // Store analytics
    const { data: analytics, error: analyticsError } = await supabase
      .from('view_analytics')
      .insert({
        job_handle,
        user_id,
        viewer_ip: clientIP,
        viewer_agent: userAgent,
        company_detected: companyDetected,
        time_spent: time_spent || 0,
        sections_viewed: sections_viewed || [],
        actions_taken: actions_taken || {}
      })
      .select()
      .single();

    if (analyticsError) {
      console.error('Analytics error:', analyticsError);
      return new Response(
        JSON.stringify({ error: 'Failed to store analytics' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update job application analytics count (optional aggregation)
    const { error: updateError } = await supabase
      .rpc('increment_view_count', { 
        handle: job_handle 
      });

    if (updateError) {
      console.log('Warning: Could not update view count:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        analytics_id: analytics.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in track-view function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function detectCompanyFromRequest(req: Request): string | null {
  const userAgent = req.headers.get('user-agent')?.toLowerCase() || '';
  const referer = req.headers.get('referer')?.toLowerCase() || '';
  
  // Common company domains and identifiers
  const companyPatterns = [
    { pattern: /google/, name: 'Google' },
    { pattern: /microsoft/, name: 'Microsoft' },
    { pattern: /apple/, name: 'Apple' },
    { pattern: /meta|facebook/, name: 'Meta' },
    { pattern: /amazon/, name: 'Amazon' },
    { pattern: /netflix/, name: 'Netflix' },
    { pattern: /linkedin/, name: 'LinkedIn' },
    { pattern: /uber/, name: 'Uber' },
    { pattern: /airbnb/, name: 'Airbnb' },
    { pattern: /stripe/, name: 'Stripe' },
    { pattern: /tesla/, name: 'Tesla' },
    { pattern: /salesforce/, name: 'Salesforce' }
  ];

  // Check referer first (more reliable)
  for (const { pattern, name } of companyPatterns) {
    if (pattern.test(referer)) {
      return name;
    }
  }

  // Then check user agent
  for (const { pattern, name } of companyPatterns) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }

  return null;
}