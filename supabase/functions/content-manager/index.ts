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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const method = req.method;
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const action = pathSegments[pathSegments.length - 1];

    if (method === 'POST' && action === 'content') {
      return await createContent(req, supabase, user.id);
    } else if (method === 'PUT' && pathSegments.includes('content')) {
      const contentId = pathSegments[pathSegments.length - 1];
      return await updateContent(req, supabase, user.id, contentId);
    } else if (method === 'DELETE' && pathSegments.includes('content')) {
      const contentId = pathSegments[pathSegments.length - 1];
      return await deleteContent(supabase, user.id, contentId);
    } else if (method === 'GET' && action === 'content') {
      return await getContent(supabase, user.id);
    } else if (method === 'POST' && action === 'generate-embedding') {
      return await generateEmbedding(req, supabase, user.id);
    }

    return new Response(
      JSON.stringify({ error: 'Invalid endpoint' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in content-manager function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function createContent(req: Request, supabase: any, userId: string) {
  const contentData = await req.json();
  
  // Generate embedding for the content
  let embedding = null;
  if (openAIApiKey) {
    const textToEmbed = `${contentData.title} ${contentData.description} ${contentData.technologies?.join(' ') || ''}`;
    embedding = await generateEmbeddingVector(textToEmbed);
  }

  const { data, error } = await supabase
    .from('portfolio_content')
    .insert({
      ...contentData,
      user_id: userId,
      embedding
    })
    .select()
    .single();

  if (error) {
    console.error('Create content error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function updateContent(req: Request, supabase: any, userId: string, contentId: string) {
  const contentData = await req.json();
  
  // Regenerate embedding if content changed
  let embedding = undefined;
  if (openAIApiKey && (contentData.title || contentData.description || contentData.technologies)) {
    const textToEmbed = `${contentData.title || ''} ${contentData.description || ''} ${contentData.technologies?.join(' ') || ''}`;
    embedding = await generateEmbeddingVector(textToEmbed);
  }

  const updateData = { ...contentData };
  if (embedding) {
    updateData.embedding = embedding;
  }

  const { data, error } = await supabase
    .from('portfolio_content')
    .update(updateData)
    .eq('id', contentId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Update content error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function deleteContent(supabase: any, userId: string, contentId: string) {
  const { error } = await supabase
    .from('portfolio_content')
    .delete()
    .eq('id', contentId)
    .eq('user_id', userId);

  if (error) {
    console.error('Delete content error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function getContent(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get content error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch content' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function generateEmbedding(req: Request, supabase: any, userId: string) {
  const { content_id } = await req.json();

  if (!openAIApiKey) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get content
  const { data: content, error: contentError } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('id', content_id)
    .eq('user_id', userId)
    .single();

  if (contentError || !content) {
    return new Response(
      JSON.stringify({ error: 'Content not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Generate embedding
  const textToEmbed = `${content.title} ${content.description} ${content.technologies?.join(' ') || ''}`;
  const embedding = await generateEmbeddingVector(textToEmbed);

  if (!embedding) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate embedding' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Update content with embedding
  const { data: updatedContent, error: updateError } = await supabase
    .from('portfolio_content')
    .update({ embedding })
    .eq('id', content_id)
    .eq('user_id', userId)
    .select()
    .single();

  if (updateError) {
    console.error('Update embedding error:', updateError);
    return new Response(
      JSON.stringify({ error: 'Failed to update content with embedding' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify(updatedContent),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function generateEmbeddingVector(text: string): Promise<number[] | null> {
  if (!openAIApiKey || !text.trim()) {
    return null;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text.trim(),
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
}