"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Startup } from "@/lib/types";

const mockStartups: Startup[] = [
  {
    id: "1",
    name: "VaultShield",
    slug: "vaultshield",
    description:
      "Zero-trust data protection platform for hybrid cloud environments with real-time threat detection and automated response.",
    sector: "Cloud Security",
    funding_stage: "Series A",
    total_raised: "$12M",
    founding_year: 2022,
    hq: "San Francisco, CA",
    website: "https://vaultshield.io",
    founder_name: "Marcus Rivera",
    founder_linkedin: "https://linkedin.com/in/marcusrivera",
    vc_backers: ["Sequoia Capital", "Cyberstarts"],
    is_featured: true,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "ThreatCanvas",
    slug: "threatcanvas",
    description:
      "AI-powered threat intelligence aggregation and visualization for SOC teams. Correlates signals across OSINT, dark web, and internal telemetry.",
    sector: "Threat Intel",
    funding_stage: "Seed",
    total_raised: "$4.5M",
    founding_year: 2023,
    hq: "Austin, TX",
    website: "https://threatcanvas.com",
    founder_name: "Priya Sharma",
    founder_linkedin: "https://linkedin.com/in/priyasharma",
    vc_backers: ["YL Ventures", "Ten Eleven Ventures"],
    is_featured: false,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-03-10T00:00:00Z",
  },
  {
    id: "3",
    name: "IdentityForge",
    slug: "identityforge",
    description:
      "Next-generation identity governance and privileged access management built for decentralized workforces and multi-cloud architectures.",
    sector: "IAM",
    funding_stage: "Series B",
    total_raised: "$35M",
    founding_year: 2021,
    hq: "New York, NY",
    website: "https://identityforge.io",
    founder_name: "James O'Brien",
    founder_linkedin: "https://linkedin.com/in/jamesobrien",
    vc_backers: ["Insight Partners", "Forgepoint Capital"],
    is_featured: true,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-02-20T00:00:00Z",
  },
  {
    id: "4",
    name: "SecurePipeline",
    slug: "securepipeline",
    description:
      "DevSecOps platform that embeds security testing directly into CI/CD pipelines with policy-as-code enforcement and SBOM generation.",
    sector: "DevSecOps",
    funding_stage: "Seed",
    total_raised: "$6M",
    founding_year: 2023,
    hq: "Seattle, WA",
    website: "https://securepipeline.dev",
    founder_name: "Anika Patel",
    founder_linkedin: "https://linkedin.com/in/anikapatel",
    vc_backers: ["Decibel Partners"],
    is_featured: false,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-04-05T00:00:00Z",
  },
  {
    id: "5",
    name: "ComplianceOS",
    slug: "complianceos",
    description:
      "Automated GRC platform that maps controls across SOC 2, ISO 27001, NIST, and CMMC frameworks with continuous monitoring and audit-ready reporting.",
    sector: "GRC",
    funding_stage: "Series A",
    total_raised: "$18M",
    founding_year: 2022,
    hq: "Boston, MA",
    website: "https://complianceos.com",
    founder_name: "Rachel Kim",
    founder_linkedin: "https://linkedin.com/in/rachelkim",
    vc_backers: ["Bessemer Venture Partners", "Rally Ventures"],
    is_featured: false,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-01-30T00:00:00Z",
  },
  {
    id: "6",
    name: "NetSentinel",
    slug: "netsentinel",
    description:
      "Network detection and response platform using behavioral AI to identify lateral movement and advanced persistent threats in real time.",
    sector: "Network Security",
    funding_stage: "Pre-seed",
    total_raised: "$2M",
    founding_year: 2024,
    hq: "Denver, CO",
    website: "https://netsentinel.io",
    founder_name: "Carlos Mendez",
    founder_linkedin: "https://linkedin.com/in/carlosmendez",
    vc_backers: ["Techstars"],
    is_featured: false,
    is_approved: true,
    custom_fields: {},
    submitted_by: null,
    created_at: "2024-05-12T00:00:00Z",
  },
];

const fundingStages = [
  "All",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
];
const sectors = [
  "All",
  "IAM",
  "AppSec",
  "Cloud Security",
  "Threat Intel",
  "GRC",
  "DevSecOps",
  "Network Security",
  "Data Security",
];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [fundingFilter, setFundingFilter] = useState("All");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [vcBacked, setVcBacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let results = [...mockStartups];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }
    if (fundingFilter !== "All") {
      results = results.filter((s) => s.funding_stage === fundingFilter);
    }
    if (sectorFilter !== "All") {
      results = results.filter((s) => s.sector === sectorFilter);
    }
    if (vcBacked) {
      results = results.filter(
        (s) => s.vc_backers && s.vc_backers.length > 0
      );
    }

    // Featured first
    results.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    });

    return results;
  }, [search, fundingFilter, sectorFilter, vcBacked]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            Cybersecurity Startup Directory
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            Discover curated cybersecurity startups vetted by security leaders
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0A0A]/40" />
            <Input
              placeholder="Search startups by name or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 h-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Select
              value={fundingFilter}
              onValueChange={(val) => {
                setFundingFilter(val as string);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Funding Stage" />
              </SelectTrigger>
              <SelectContent>
                {fundingStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sectorFilter}
              onValueChange={(val) => {
                setSectorFilter(val as string);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={vcBacked ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setVcBacked(!vcBacked);
                setCurrentPage(1);
              }}
              className={
                vcBacked
                  ? "bg-navy hover:bg-navy/90 text-white"
                  : "border-[#E5E7EB] text-[#0A0A0A]/70"
              }
            >
              VC-Backed
            </Button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paged.length === 0 ? (
            <p className="text-center text-[#0A0A0A]/50 py-12">
              No startups match your filters. Try adjusting your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((startup) => (
                <Card
                  key={startup.id}
                  className={`relative bg-white ${
                    startup.is_featured
                      ? "ring-2 ring-amber-400"
                      : ""
                  }`}
                >
                  {startup.is_featured && (
                    <div className="absolute top-3 right-4">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-medium text-sm shrink-0">
                        {startup.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <CardTitle className="text-[#0A0A0A]">
                        {startup.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#0A0A0A]/70 line-clamp-2 mb-4">
                      {startup.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {startup.funding_stage && (
                        <Badge variant="secondary">
                          {startup.funding_stage}
                        </Badge>
                      )}
                      {startup.sector && (
                        <Badge variant="outline">{startup.sector}</Badge>
                      )}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-navy text-navy hover:bg-navy/5"
                    >
                      <Link href={`/directory/${startup.slug}`}>
                        View Profile
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === currentPage
                        ? "bg-navy hover:bg-navy/90 text-white"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-4">
            Are you a cybersecurity founder? List your startup
          </h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Get discovered by verified CISOs, enterprise buyers, and investors
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-cta hover:bg-blue-cta/90 text-white px-8 h-11"
          >
            <Link href="/signup">Get Listed</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
