-- CISOStartupRadar Database Schema
-- Run this migration in your Supabase SQL editor

-- profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('ciso', 'founder', 'founder_featured', 'enterprise', 'admin')) DEFAULT 'founder',
  company TEXT,
  linkedin_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ciso_applications
CREATE TABLE ciso_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  linkedin_url TEXT,
  work_email TEXT NOT NULL,
  certifications TEXT[],
  referral_source TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);

-- startups
CREATE TABLE startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sector TEXT,
  funding_stage TEXT,
  total_raised TEXT,
  founding_year INTEGER,
  hq TEXT,
  website TEXT,
  founder_name TEXT,
  founder_linkedin TEXT,
  vc_backers TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  custom_fields JSONB DEFAULT '{}',
  submitted_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ciso_directory
CREATE TABLE ciso_directory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  industry_vertical TEXT,
  previous_role TEXT,
  linkedin_url TEXT,
  certifications TEXT[],
  list_type TEXT CHECK (list_type IN ('fortune100', 'newly_appointed')),
  appointed_date DATE,
  active BOOLEAN DEFAULT true,
  custom_fields JSONB DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- training_programs
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT,
  format TEXT,
  cost_usd NUMERIC,
  location_state TEXT,
  accreditation_body TEXT,
  duration_weeks INTEGER,
  url TEXT,
  is_approved BOOLEAN DEFAULT true,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- venture_posts
CREATE TABLE venture_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID,
  type TEXT CHECK (type IN ('partner', 'board_seat', 'deal_flow')),
  title TEXT NOT NULL,
  description TEXT,
  company TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- founder_messages
CREATE TABLE founder_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email TEXT NOT NULL,
  sender_name TEXT,
  company TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  tier TEXT CHECK (tier IN ('founders', 'founders_featured', 'enterprise')),
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- upload_configs
CREATE TABLE upload_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  directory_type TEXT CHECK (directory_type IN ('ciso', 'startup', 'training')),
  column_mapping JSONB,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ciso_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE ciso_directory ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read their own, admins can read all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Startups: approved are public, admins see all
CREATE POLICY "Public can view approved startups" ON startups FOR SELECT USING (is_approved = true);
CREATE POLICY "Admins can manage startups" ON startups FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- CISO Directory: CISOs and admins can view
CREATE POLICY "CISOs can view directory" ON ciso_directory FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ciso', 'admin'))
);
CREATE POLICY "Admins can manage directory" ON ciso_directory FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- CISO Applications: admins only
CREATE POLICY "Admins can manage applications" ON ciso_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can insert applications" ON ciso_applications FOR INSERT WITH CHECK (true);

-- Training: public read, admin manage
CREATE POLICY "Public can view training" ON training_programs FOR SELECT USING (is_approved = true);
CREATE POLICY "Admins can manage training" ON training_programs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Venture Posts: authenticated users can view, admins manage
CREATE POLICY "Authenticated view venture posts" ON venture_posts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Founders can create posts" ON venture_posts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('founder', 'founder_featured'))
);
CREATE POLICY "Admins can manage venture posts" ON venture_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Messages: admins only read, anyone can insert
CREATE POLICY "Admins can manage messages" ON founder_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can send messages" ON founder_messages FOR INSERT WITH CHECK (true);

-- Subscriptions: users see own, admins see all
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage subscriptions" ON subscriptions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Upload configs: admins only
CREATE POLICY "Admins can manage upload configs" ON upload_configs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'founder');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
