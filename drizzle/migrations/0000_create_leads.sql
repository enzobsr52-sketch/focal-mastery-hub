CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  whatsapp text NOT NULL CHECK (char_length(whatsapp) BETWEEN 8 AND 30),
  objective text NOT NULL CHECK (char_length(objective) BETWEEN 2 AND 500),
  source text NOT NULL DEFAULT 'home',
  course_interest text,
  experience_level text,
  equipment text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 120
  AND char_length(whatsapp) BETWEEN 8 AND 30
  AND char_length(objective) BETWEEN 2 AND 500
);
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);