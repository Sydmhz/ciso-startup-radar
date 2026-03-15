"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Handshake, Users, TrendingUp } from "lucide-react";
import type { VenturePost } from "@/lib/types";

const partnerListings: VenturePost[] = [
  {
    id: "p1",
    posted_by: null,
    type: "partner",
    title: "Strategic Security Partner - Financial Services",
    description:
      "Leading fintech company seeking a cybersecurity partner to co-develop compliance automation solutions for banks and credit unions. Looking for startups with SOC 2 and PCI-DSS expertise.",
    company: "FinSecure Partners",
    is_active: true,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "p2",
    posted_by: null,
    type: "partner",
    title: "OEM Integration Partner - Cloud Security",
    description:
      "Enterprise cloud provider looking to embed a CSPM solution into our platform. Ideal partner has API-first architecture and multi-cloud support for AWS, Azure, and GCP.",
    company: "CloudFirst Inc.",
    is_active: true,
    created_at: "2024-05-15T00:00:00Z",
  },
  {
    id: "p3",
    posted_by: null,
    type: "partner",
    title: "MSSP Channel Partner Program",
    description:
      "Growing MDR startup launching a channel partner program for MSSPs. Revenue sharing model with white-label option and dedicated partner enablement team.",
    company: "SentinelOps",
    is_active: true,
    created_at: "2024-05-20T00:00:00Z",
  },
  {
    id: "p4",
    posted_by: null,
    type: "partner",
    title: "Joint GTM - Identity Threat Detection",
    description:
      "Identity security vendor seeking IAM providers for joint go-to-market initiative targeting enterprise healthcare customers with HIPAA compliance requirements.",
    company: "IdentityGuard AI",
    is_active: true,
    created_at: "2024-06-05T00:00:00Z",
  },
];

const boardSeats: VenturePost[] = [
  {
    id: "b1",
    posted_by: null,
    type: "board_seat",
    title: "Board of Directors - Series B Security Startup",
    description:
      "Post-Series B endpoint security company seeking an independent board member with CISO experience at a Fortune 500 company. Compensation includes equity and cash retainer.",
    company: "EndpointArmor",
    is_active: true,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "b2",
    posted_by: null,
    type: "board_seat",
    title: "Advisory Board - Pre-Seed AI Security",
    description:
      "AI-native application security startup looking for advisory board members with deep AppSec and DevSecOps experience. Equity-based compensation with quarterly commitment.",
    company: "SecureAI Labs",
    is_active: true,
    created_at: "2024-05-25T00:00:00Z",
  },
  {
    id: "b3",
    posted_by: null,
    type: "board_seat",
    title: "Technical Advisor - GRC Platform",
    description:
      "Fast-growing GRC startup needs a technical advisor experienced with SOC 2, ISO 27001, and FedRAMP frameworks. 5 hours/month commitment with competitive equity package.",
    company: "ComplianceForge",
    is_active: true,
    created_at: "2024-06-03T00:00:00Z",
  },
  {
    id: "b4",
    posted_by: null,
    type: "board_seat",
    title: "Board Observer - Seed Stage OT Security",
    description:
      "OT/ICS security startup seeking board observer with experience in critical infrastructure protection. Ideal candidate has led security at energy or manufacturing companies.",
    company: "IndustrialShield",
    is_active: true,
    created_at: "2024-06-08T00:00:00Z",
  },
];

const dealFlow: VenturePost[] = [
  {
    id: "d1",
    posted_by: null,
    type: "deal_flow",
    title: "Series A - API Security Platform",
    description:
      "API security startup raising $15M Series A. 300% YoY revenue growth, 50+ enterprise customers including three Fortune 100 companies. Led by Lightspeed Venture Partners.",
    company: "APIShield",
    is_active: true,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "d2",
    posted_by: null,
    type: "deal_flow",
    title: "Seed Round - Privacy Engineering Tools",
    description:
      "Privacy-by-design engineering platform raising $5M seed round. Automates GDPR, CCPA, and data residency compliance for developers. Strong traction with SaaS companies.",
    company: "PrivacyOps",
    is_active: true,
    created_at: "2024-05-28T00:00:00Z",
  },
  {
    id: "d3",
    posted_by: null,
    type: "deal_flow",
    title: "Pre-Seed - Autonomous SOC Platform",
    description:
      "Former Mandiant engineers building an autonomous SOC platform using LLM agents. Raising $2.5M pre-seed with working prototype and two design partners. Backed by Y Combinator.",
    company: "AutoSOC",
    is_active: true,
    created_at: "2024-06-05T00:00:00Z",
  },
  {
    id: "d4",
    posted_by: null,
    type: "deal_flow",
    title: "Series B - Supply Chain Security",
    description:
      "Software supply chain security company raising $40M Series B. SBOM management, vulnerability prioritization, and CI/CD pipeline protection. 200% ARR growth, $8M ARR.",
    company: "ChainGuard Security",
    is_active: true,
    created_at: "2024-06-10T00:00:00Z",
  },
];

function VentureSection({
  title,
  icon: Icon,
  posts,
  visibleCount = 3,
}: {
  title: string;
  icon: React.ElementType;
  posts: VenturePost[];
  visibleCount?: number;
}) {
  const visible = posts.slice(0, visibleCount);
  const blurred = posts.slice(visibleCount);

  const typeBadge = (type: VenturePost["type"]) => {
    switch (type) {
      case "partner":
        return "bg-emerald-100 text-emerald-800";
      case "board_seat":
        return "bg-indigo-100 text-indigo-800";
      case "deal_flow":
        return "bg-amber-100 text-amber-800";
      default:
        return "";
    }
  };

  const typeLabel = (type: VenturePost["type"]) => {
    switch (type) {
      case "partner":
        return "Partnership";
      case "board_seat":
        return "Board Seat";
      case "deal_flow":
        return "Deal Flow";
      default:
        return type;
    }
  };

  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-navy" />
        </div>
        <h2 className="font-serif text-2xl text-navy">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map((post) => (
          <Card key={post.id} className="bg-white">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-[#0A0A0A] leading-snug text-base">
                  {post.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {post.company && (
                  <span className="text-sm text-[#0A0A0A]/60">
                    {post.company}
                  </span>
                )}
                <Badge className={`shrink-0 ${typeBadge(post.type)}`}>
                  {typeLabel(post.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#0A0A0A]/70 line-clamp-3">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blurred section */}
      {blurred.length > 0 && (
        <div className="relative mt-6">
          <div className="filter blur-[4px] select-none pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blurred.map((post) => (
                <Card key={post.id} className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#0A0A0A] leading-snug text-base">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[#0A0A0A]/60">
                        {post.company}
                      </span>
                      <Badge className={`shrink-0 ${typeBadge(post.type)}`}>
                        {typeLabel(post.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#0A0A0A]/70 line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg">
            <Lock className="h-8 w-8 text-navy/40 mb-3" />
            <p className="text-center text-[#0A0A0A]/80 font-medium mb-4 max-w-md px-4">
              Sign in to access the full Venture Network
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-navy hover:bg-navy/90 text-white"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-navy text-navy hover:bg-navy/5"
              >
                <Link href="/apply">Apply as CISO</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VentureNetworkPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            Venture Network
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            Partner listings, board seats, and investment deal flow for verified
            CISOs and security leaders
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VentureSection
            title="Partner Listings"
            icon={Handshake}
            posts={partnerListings}
          />
          <VentureSection
            title="Board & Advisory Seats"
            icon={Users}
            posts={boardSeats}
          />
          <VentureSection
            title="Investment Deal Flow"
            icon={TrendingUp}
            posts={dealFlow}
          />
        </div>
      </section>
    </div>
  );
}
