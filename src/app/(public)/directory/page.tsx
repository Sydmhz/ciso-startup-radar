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
import allStartups from "@/lib/data/startups.json";

const startups = allStartups as Startup[];

// Derive unique sectors from real data, sorted alphabetically
const sectorSet = new Set(startups.map((s) => s.sector).filter(Boolean));
const sectors = ["All", ...Array.from(sectorSet).sort()] as string[];

// Group funding stages into broader categories for filtering
const fundingStageGroups: Record<string, (stage: string) => boolean> = {
  "Pre-seed / Angel": (s) =>
    /pre.?seed|angel|bootstrap|grant|incubator/i.test(s),
  Seed: (s) => /^seed/i.test(s) || /yc\s/i.test(s) || /y combinator/i.test(s),
  "Series A": (s) => /series a/i.test(s) && !/post/i.test(s),
  "Series B": (s) => /series b/i.test(s),
  "Series C+": (s) =>
    /series [c-z]/i.test(s) && !/series a/i.test(s) && !/series b/i.test(s),
  "Growth / PE": (s) => /growth|private equity|pe.?backed/i.test(s),
  Acquired: (s) => /acquired/i.test(s),
};
const fundingStages = ["All", ...Object.keys(fundingStageGroups)];

function matchesFundingGroup(
  stage: string | null,
  group: string
): boolean {
  if (!stage) return false;
  const matcher = fundingStageGroups[group];
  return matcher ? matcher(stage) : false;
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [fundingFilter, setFundingFilter] = useState("All");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [vcBacked, setVcBacked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const filtered = useMemo(() => {
    let results = [...startups];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.sector && s.sector.toLowerCase().includes(q))
      );
    }
    if (fundingFilter !== "All") {
      results = results.filter((s) =>
        matchesFundingGroup(s.funding_stage, fundingFilter)
      );
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

  // Show a window of page numbers around the current page
  const pageWindow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages, startPage + pageWindow - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
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
            {filtered.length} curated cybersecurity startups vetted by security
            leaders
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
              placeholder="Search startups by name, description, or sector..."
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
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[220px]">
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
                    startup.is_featured ? "ring-2 ring-amber-400" : ""
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
                        {startup.name.charAt(0)}
                      </div>
                      <CardTitle className="text-[#0A0A0A] line-clamp-1">
                        {startup.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#0A0A0A]/70 line-clamp-2 mb-4">
                      {startup.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {startup.funding_stage && (
                        <Badge variant="secondary">
                          {startup.funding_stage}
                        </Badge>
                      )}
                      {startup.sector && (
                        <Badge variant="outline">{startup.sector}</Badge>
                      )}
                    </div>
                    {startup.custom_fields?.["Galaxy Growth Score"] && (
                      <p className="text-xs text-[#0A0A0A]/50 mb-3">
                        Galaxy Growth Score:{" "}
                        <span className="font-medium text-navy">
                          {startup.custom_fields["Galaxy Growth Score"]}
                        </span>
                      </p>
                    )}
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
              {startPage > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </Button>
                  {startPage > 2 && (
                    <span className="text-[#0A0A0A]/40 px-1">...</span>
                  )}
                </>
              )}
              {visiblePages.map((page) => (
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
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span className="text-[#0A0A0A]/40 px-1">...</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
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
