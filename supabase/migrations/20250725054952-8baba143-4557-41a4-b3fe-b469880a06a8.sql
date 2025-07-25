-- Add helper function for cosine similarity calculation
CREATE OR REPLACE FUNCTION calculate_similarity(vec1 vector, vec2 vector)
RETURNS float
LANGUAGE sql IMMUTABLE STRICT
AS $$
  SELECT 1 - (vec1 <=> vec2);
$$;

-- Add function to increment view count (optional aggregation)
CREATE OR REPLACE FUNCTION increment_view_count(handle text)
RETURNS void
LANGUAGE sql
AS $$
  -- This could update a counter table if needed
  -- For now, just a placeholder
  SELECT 1;
$$;