"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Globe,
  Linkedin,
  X,
  Calendar,
  TrendingUp,
  Lock,
} from "lucide-react";
import type { Startup } from "@/lib/types";
import allStartups from "@/lib/data/startups.json";

const startups = allStartups as Startup[];

/* ── helpers ─────────────────────────────────────────── */

const sectorSet = new Set(startups.map((s) => s.sector).filter(Boolean));
const sectors = ["All", ...Array.from(sectorSet).sort()] as string[];

function getGrowthScore(s: Startup): number {
  const raw = s.custom_fields?.["Galaxy Growth Score"];
  if (!raw) return 0;
  const n = parseFloat(raw);
  return isNaN(n) ? 0 : +(n / 10).toFixed(1);
}

function scoreColor(score: number): string {
  if (score >= 8) return "#22c55e";
  if (score >= 7) return "#84cc16";
  if (score >= 5) return "#eab308";
  return "#ef4444";
}

function domainFromUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    return null;
  }
}

function formatFundingBadge(stage: string | null, raised: string | null) {
  const parts: string[] = [];
  if (stage) {
    // Shorten long stage names
    const s = stage.length > 20 ? stage.slice(0, 20) + "…" : stage;
    parts.push(s);
  }
  if (raised) {
    // Extract just the dollar amount if it's very long
    const match = raised.match(/\$[\d.,]+[BMKbmk]?\+?/);
    parts.push(match ? match[0] : raised.length > 15 ? raised.slice(0, 15) : raised);
  }
  return parts.join(" · ");
}

/* ── Score Circle SVG ──────────────────────────────── */

function GrowthScoreCircle({
  score,
  size = 50,
}: {
  score: number;
  size?: number;
}) {
  const color = scoreColor(score);
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score / 10, 1);
  const offset = circ * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#0A0A0A"
          fontSize={size * 0.32}
          fontWeight={700}
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
        >
          {score % 1 === 0 ? score : score.toFixed(1)}
        </text>
      </svg>
      <span className="text-[9px] font-medium tracking-wider text-[#0A0A0A]/40 uppercase">
        Growth Score
      </span>
    </div>
  );
}

/* ── Detail Side Panel ─────────────────────────────── */

function DetailPanel({
  startup,
  onClose,
}: {
  startup: Startup;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const score = getGrowthScore(startup);
  const domain = domainFromUrl(startup.website);
  const founders = startup.founders_all
    ? startup.founders_all.split(",").map((f) => f.trim())
    : startup.founder_name
    ? [startup.founder_name]
    : [];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slide-in-right"
      >
        <div className="p-6 space-y-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#0A0A0A]/60" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 pr-8">
            {domain ? (
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                alt={startup.name}
                className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-1 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-2xl shrink-0">
                {startup.name.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">
                {startup.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {startup.sector && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1E3A5F] text-white">
                    {startup.sector}
                  </span>
                )}
                {startup.funding_stage && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-gray-100 text-[#0A0A0A]/70">
                    {startup.funding_stage}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">
            {startup.description}
          </p>

          {/* Growth Score */}
          {score > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
              <GrowthScoreCircle score={score} size={60} />
              <div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
                  Growth Score
                </span>
                <p className="text-lg font-bold text-[#0A0A0A]">
                  {score % 1 === 0 ? score : score.toFixed(1)}/10
                </p>
              </div>
            </div>
          )}

          {/* Founded / Country */}
          <div className="grid grid-cols-2 gap-3">
            {startup.founding_year && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="h-3 w-3 text-[#0A0A0A]/40" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
                    Founded
                  </span>
                </div>
                <p className="font-semibold text-[#0A0A0A]">
                  {startup.founding_year}
                </p>
              </div>
            )}
            {startup.hq && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3 w-3 text-[#0A0A0A]/40" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
                    Country
                  </span>
                </div>
                <p className="font-semibold text-[#0A0A0A] text-sm">
                  {startup.hq}
                </p>
              </div>
            )}
          </div>

          {/* Latest Funding */}
          {startup.total_raised && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="h-3 w-3 text-[#0A0A0A]/40" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
                  Latest Funding
                </span>
              </div>
              <p className="text-lg font-bold text-[#0A0A0A]">
                {startup.total_raised}
              </p>
            </div>
          )}

          {/* Founders */}
          {founders.length > 0 && (
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
                Founders
              </span>
              <div className="mt-2 space-y-1.5">
                {founders.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5"
                  >
                    <span className="text-sm font-medium text-[#0A0A0A]">
                      {f}
                    </span>
                    {i === 0 && startup.founder_linkedin && (
                      <a
                        href={startup.founder_linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A66C2] hover:opacity-80"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0A0A0A] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#0A0A0A]/90 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Visit Website
              </a>
            )}
            {startup.linkedin_url && (
              <a
                href={startup.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                LinkedIn
              </a>
            )}
          </div>

          {/* Coming in Full Platform */}
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#0A0A0A]/40">
              Coming in Full Platform
            </span>
            <div className="mt-2 space-y-1.5">
              {["Pitch Deck", "Founder Video", "Demo Recording"].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-[#0A0A0A]/40" />
                    <span className="text-sm text-[#0A0A0A]/60">{label}</span>
                  </div>
                  <span className="text-xs text-[#0A0A0A]/40">Locked</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────── */

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const perPage = 21;

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
    if (sectorFilter !== "All") {
      results = results.filter((s) => s.sector === sectorFilter);
    }

    // Sort by growth score descending
    results.sort((a, b) => {
      const sa = getGrowthScore(a);
      const sb = getGrowthScore(b);
      return sb - sa;
    });

    return results;
  }, [search, sectorFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

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
            Top Cybersecurity Startups to Watch
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            The directory CISOs actually want. {filtered.length}+ companies.
          </p>
          {/* Stats pills */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="text-xs font-medium border border-[#E5E7EB] rounded-full px-3 py-1 text-[#0A0A0A]/60">
              {startups.length}+ Companies
            </span>
            <span className="text-xs font-medium border border-[#E5E7EB] rounded-full px-3 py-1 text-[#0A0A0A]/60">
              {sectors.length - 1} Categories
            </span>
            <span className="text-xs font-medium border border-[#E5E7EB] rounded-full px-3 py-1 text-[#0A0A0A]/60">
              No Login Required
            </span>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0A0A]/40" />
            <Input
              placeholder="Search by company, category, or technology..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-11 rounded-lg bg-gray-50 border-[#E5E7EB]"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => {
                  setSectorFilter(sector);
                  setCurrentPage(1);
                }}
                className={`shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                  sectorFilter === sector
                    ? "bg-[#0A0A0A] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#0A0A0A]/70 hover:bg-gray-50"
                }`}
              >
                {sector}
              </button>
            ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map((startup) => {
                const score = getGrowthScore(startup);
                const domain = domainFromUrl(startup.website);
                const funding = formatFundingBadge(
                  startup.funding_stage,
                  startup.total_raised
                );

                return (
                  <div
                    key={startup.id}
                    onClick={() => setSelectedStartup(startup)}
                    className="group relative bg-white border border-[#E5E7EB] rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-[#E5E7EB]/60"
                  >
                    {/* Top row: logo + name + score */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {domain ? (
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                            alt={startup.name}
                            className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-0.5 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-lg shrink-0">
                            {startup.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0A0A0A] text-base truncate">
                            {startup.name}
                          </h3>
                          <p className="text-sm text-[#0A0A0A]/40">
                            {startup.founding_year || "—"}
                          </p>
                        </div>
                      </div>
                      {score > 0 && <GrowthScoreCircle score={score} />}
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm text-[#0A0A0A]/60 leading-relaxed line-clamp-2">
                      {startup.description}
                    </p>

                    {/* Category + Funding badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {startup.sector && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1E3A5F] text-white">
                          {startup.sector}
                        </span>
                      )}
                      {funding && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded bg-[#fef2f2] text-[#dc2626]">
                          {funding}
                        </span>
                      )}
                    </div>

                    {/* Bottom: location + links */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E7EB]/60">
                      <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]/40 min-w-0 truncate">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {startup.hq || "—"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {startup.website && (
                          <a
                            href={startup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {startup.linkedin_url && (
                          <a
                            href={startup.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-full hover:bg-blue-50 transition-colors text-[#0A66C2]"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

      {/* Detail Panel */}
      {selectedStartup && (
        <DetailPanel
          startup={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}
    </div>
  );
}
