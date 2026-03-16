export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "ciso" | "founder" | "founder_featured" | "enterprise" | "admin";
  company: string | null;
  linkedin_url: string | null;
  verified: boolean;
  created_at: string;
}

export interface CisoApplication {
  id: string;
  full_name: string;
  title: string;
  company: string;
  linkedin_url: string | null;
  work_email: string;
  certifications: string[];
  referral_source: string | null;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  reviewed_at: string | null;
}

export interface FounderProfile {
  name: string;
  linkedin_url?: string;
}

export interface Startup {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sector: string | null;
  funding_stage: string | null;
  total_raised: string | null;
  founding_year: number | null;
  hq: string | null;
  website: string | null;
  founder_name?: string | null;
  founder_linkedin?: string | null;
  founder_profiles?: FounderProfile[];
  founders_all?: string | null;
  linkedin_url?: string | null;
  vc_backers: string[] | null;
  is_featured: boolean;
  is_approved: boolean;
  custom_fields: Record<string, string>;
  submitted_by?: string | null;
  created_at?: string;
}

export interface CisoDirectoryEntry {
  id: string;
  name: string;
  company: string | null;
  industry: string | null;
  fortune100: boolean;
  newCiso: boolean;
  industry_vertical?: string | null;
  previous_role: string | null;
  linkedin_url: string | null;
  certifications: string[] | null;
  list_type: "fortune100" | "newly_appointed" | null;
  appointed_date: string | null;
  active: boolean;
  custom_fields: Record<string, string>;
  last_updated?: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  provider: string | null;
  format: string | null;
  cost_usd: string | null;
  location_state: string | null;
  accreditation_body: string | null;
  duration_weeks: string | null;
  url: string | null;
  is_approved: boolean;
  custom_fields: Record<string, string>;
  created_at?: string;
}

export interface VenturePost {
  id: string;
  posted_by: string | null;
  type: "partner" | "board_seat" | "deal_flow";
  title: string;
  description: string | null;
  company: string | null;
  is_active: boolean;
  created_at: string;
}

export interface FounderMessage {
  id: string;
  sender_email: string;
  sender_name: string | null;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier: "founders" | "founders_featured" | "enterprise";
  status: string;
  current_period_end: string | null;
  created_at: string;
}

export interface UploadConfig {
  id: string;
  directory_type: "ciso" | "startup" | "training";
  column_mapping: Record<string, ColumnMapping>;
  last_used_at: string | null;
  created_at: string;
}

export interface ColumnMapping {
  target: string;
  type: "known" | "custom" | "ignore";
  custom_label?: string;
}

export type UserRole = Profile["role"];
