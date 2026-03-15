import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Linkedin,
  Building2,
  Shield,
} from "lucide-react";
import type { Startup } from "@/lib/types";

// Mock data for a single startup
const mockStartup: Startup = {
  id: "1",
  name: "VaultShield",
  slug: "vaultshield",
  description:
    "VaultShield is a zero-trust data protection platform built for hybrid cloud environments. Our platform provides real-time threat detection, automated incident response, and continuous compliance monitoring across AWS, Azure, and GCP. Founded by former security engineers from CrowdStrike and Palo Alto Networks, VaultShield helps enterprise security teams protect sensitive data without slowing down cloud adoption.",
  sector: "Cloud Security",
  funding_stage: "Series A",
  total_raised: "$12M",
  founding_year: 2022,
  hq: "San Francisco, CA",
  website: "https://vaultshield.io",
  founder_name: "Marcus Rivera",
  founder_linkedin: "https://linkedin.com/in/marcusrivera",
  vc_backers: ["Sequoia Capital", "Cyberstarts", "YL Ventures"],
  is_featured: true,
  is_approved: true,
  custom_fields: {
    "Team Size": "45",
    "Key Customers": "Fortune 500 Financial Services",
    "Compliance Certifications": "SOC 2 Type II, ISO 27001",
    "Integration Partners": "Splunk, CrowdStrike, Okta",
  },
  submitted_by: null,
  created_at: "2024-01-15T00:00:00Z",
};

// In a real app, this would fetch from the database
function getStartup(slug: string): Startup | null {
  if (slug === mockStartup.slug) return mockStartup;
  // Return mock data for any slug to demonstrate the page
  return { ...mockStartup, slug, name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const startup = getStartup(params.slug);
  return {
    title: startup ? `${startup.name} - Cybersecurity Startup Directory` : "Startup Not Found",
    description: startup?.description?.slice(0, 160) ?? "Startup profile on CISOStartupRadar",
  };
}

export default function StartupDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const startup = getStartup(params.slug);

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-navy mb-4">
          Startup Not Found
        </h1>
        <p className="text-[#0A0A0A]/60 mb-6">
          The startup you are looking for does not exist or has been removed.
        </p>
        <Button
          asChild
          className="bg-navy hover:bg-navy/90 text-white"
        >
          <Link href="/directory">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  const infoItems = [
    {
      icon: Shield,
      label: "Sector",
      value: startup.sector,
    },
    {
      icon: DollarSign,
      label: "Funding Stage",
      value: startup.funding_stage,
    },
    {
      icon: DollarSign,
      label: "Total Raised",
      value: startup.total_raised,
    },
    {
      icon: Calendar,
      label: "Founded",
      value: startup.founding_year?.toString(),
    },
    {
      icon: MapPin,
      label: "HQ",
      value: startup.hq,
    },
    {
      icon: Globe,
      label: "Website",
      value: startup.website,
      isLink: true,
    },
  ];

  const customEntries = Object.entries(startup.custom_fields || {});

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 text-[#0A0A0A]/60 hover:text-[#0A0A0A]"
        >
          <Link href="/directory">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-xl bg-navy/10 flex items-center justify-center text-navy font-medium text-xl shrink-0">
            {startup.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl md:text-4xl text-navy">
                {startup.name}
              </h1>
              {startup.is_featured && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {startup.sector && (
                <Badge variant="outline">{startup.sector}</Badge>
              )}
              {startup.funding_stage && (
                <Badge variant="secondary">{startup.funding_stage}</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-lg font-medium text-[#0A0A0A] mb-3">About</h2>
          <p className="text-[#0A0A0A]/70 leading-relaxed">
            {startup.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {infoItems.map(
            (item) =>
              item.value && (
                <Card key={item.label} className="bg-gray-50 border-0">
                  <CardContent className="py-1">
                    <div className="flex items-center gap-2 text-[#0A0A0A]/50 text-xs mb-1">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </div>
                    {item.isLink ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-cta hover:underline"
                      >
                        {item.value.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {item.value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
          )}
        </div>

        {/* Founder */}
        {startup.founder_name && (
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#0A0A0A] mb-3">
              Founder
            </h2>
            <Card className="bg-gray-50 border-0">
              <CardContent className="py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-medium text-sm">
                      {startup.founder_name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-[#0A0A0A]">
                        {startup.founder_name}
                      </p>
                      <p className="text-sm text-[#0A0A0A]/50">Founder</p>
                    </div>
                  </div>
                  {startup.founder_linkedin && (
                    <a
                      href={startup.founder_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-cta hover:text-blue-cta/80"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* VC Backers */}
        {startup.vc_backers && startup.vc_backers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#0A0A0A] mb-3">
              VC Backers
            </h2>
            <div className="flex flex-wrap gap-2">
              {startup.vc_backers.map((backer) => (
                <Badge
                  key={backer}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                >
                  <Building2 className="h-3.5 w-3.5 mr-1.5" />
                  {backer}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {customEntries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#0A0A0A] mb-3">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customEntries.map(([key, value]) => (
                <Card key={key} className="bg-gray-50 border-0">
                  <CardContent className="py-1">
                    <p className="text-xs text-[#0A0A0A]/50 mb-1">{key}</p>
                    <p className="text-sm font-medium text-[#0A0A0A]">
                      {value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Connect CTA */}
        <div className="border-t border-[#E5E7EB] pt-8 text-center">
          <Button
            size="lg"
            className="bg-navy hover:bg-navy/90 text-white px-10 h-12 text-base"
          >
            Connect via Venture Network
          </Button>
          <p className="mt-3 text-sm text-[#0A0A0A]/50">
            <Link href="/apply" className="text-blue-cta hover:underline">
              Verify as a CISO to connect
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
