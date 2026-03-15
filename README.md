# CISOStartupRadar

The CISO Directory to Explore, Invest and Partner with the Right Cybersecurity Startups.

Built with Next.js 14 App Router, Supabase, Stripe, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase (PostgreSQL + Row Level Security)
- **Payments:** Stripe (subscriptions, checkout, billing portal)
- **UI:** shadcn/ui + Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **CSV Parsing:** Papa Parse (admin directory upload)
- **Fonts:** Instrument Serif (headings), DM Sans (body) via Google Fonts
- **Deploy:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project (optional - app gracefully degrades without it)
- A Stripe account (optional - returns 503 when not configured)

### Installation

```bash
git clone <repo-url>
cd ciso-startup-radar
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_FOUNDERS_PRICE_ID` | Stripe Price ID for Founders tier |
| `STRIPE_FOUNDERS_FEATURED_PRICE_ID` | Stripe Price ID for Featured Founders tier |
| `STRIPE_ENTERPRISE_PRICE_ID` | Stripe Price ID for Enterprise tier |
| `ADMIN_PASSWORD` | Password for admin panel access |
| `RESEND_API_KEY` | Resend API key for emails |
| `NEXT_PUBLIC_APP_URL` | Public app URL (defaults to `http://localhost:3000`) |

All env vars are optional. The app runs in demo mode with mock data when Supabase/Stripe are not configured.

### Database Setup

Run the migration SQL against your Supabase project:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the migration file
# supabase/migrations/001_initial.sql
```

The migration creates all tables with Row Level Security (RLS) policies.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/            # Login, signup pages
│   │   ├── login/
│   │   └── signup/
│   ├── (public)/          # Public-facing pages
│   │   ├── apply/         # CISO application form
│   │   ├── cisos/         # CISO directory
│   │   ├── directory/     # Startup directory + [slug] detail
│   │   ├── pricing/       # Subscription pricing
│   │   ├── privacy/       # Privacy policy
│   │   ├── terms/         # Terms of service
│   │   ├── training/      # Training programs
│   │   ├── venture-network/ # Venture network
│   │   └── page.tsx       # Homepage
│   ├── admin/             # Admin panel (password-protected)
│   │   ├── accounts/      # User management
│   │   ├── ciso-applications/ # Application review
│   │   ├── directory-upload/  # CSV bulk import
│   │   ├── messages/      # Message inbox
│   │   ├── startups/      # Startup management
│   │   └── venture-posts/ # Post moderation
│   ├── api/               # API route handlers
│   │   ├── admin/
│   │   ├── applications/
│   │   ├── messages/
│   │   └── stripe/
│   └── dashboard/         # Authenticated user dashboard
├── components/
│   ├── shared/            # Navbar, Footer, JSON-LD
│   └── ui/                # shadcn/ui components
└── lib/
    ├── supabase/          # Client, server, middleware clients
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Utility functions
```

## User Roles

| Role | Access |
|------|--------|
| `ciso` | Full directory access, CISO resources |
| `founder` | Startup listing, founder tools |
| `founder_featured` | Enhanced listing, priority placement |
| `enterprise` | Team features, analytics |
| `admin` | Full admin panel access |

## Admin Panel

Access at `/admin`. Protected by password authentication and role-based middleware.

Features:
- Dashboard with summary metrics
- CISO application review and approval
- User account management with role editing
- Startup submission moderation
- Venture post moderation
- CSV directory upload with field mapping, preview, and import modes (append/replace/upsert)
- Message inbox

## Stripe Integration

Three subscription tiers:
- **Founders Edition** ($500/mo) - Startup listing and CISO outreach
- **Founders Featured Edition** ($1,000/mo) - Enhanced listing with priority placement and gold badge
- **Enterprise** ($2,500/mo) - Team access, custom integrations, and executive introductions

Webhook events handled: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The app is configured for Vercel with no additional setup needed.

## License

Proprietary. All rights reserved.
