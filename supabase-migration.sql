-- AgentStandard — Package Votes Table
-- Paste this into Supabase Dashboard → SQL Editor → New Query → Run

CREATE TABLE IF NOT EXISTS package_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_slug TEXT NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(package_slug, session_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_slug ON package_votes(package_slug);

-- Allow anonymous reads and inserts (one vote per session)
ALTER TABLE package_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read votes" ON package_votes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert one vote per session" ON package_votes
  FOR INSERT WITH CHECK (true);
