-- Fix function search path security issues
CREATE OR REPLACE FUNCTION calculate_similarity(vec1 vector, vec2 vector)
RETURNS float
LANGUAGE sql IMMUTABLE STRICT
SECURITY DEFINER SET search_path = public
AS $$
  SELECT 1 - (vec1 <=> vec2);
$$;

CREATE OR REPLACE FUNCTION increment_view_count(handle text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER SET search_path = public
AS $$
  SELECT 1;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Move vector extension to extensions schema
DROP EXTENSION IF EXISTS vector;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;