"use client";

import { useState, useMemo } from "react";
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
import { Search, ExternalLink, Clock, DollarSign } from "lucide-react";
import type { TrainingProgram } from "@/lib/types";

const mockPrograms: TrainingProgram[] = [
  {
    id: "t1",
    name: "CISO Executive Leadership Program",
    provider: "SANS Institute",
    format: "In-person",
    cost_usd: 7500,
    location_state: "Virginia",
    accreditation_body: "SANS",
    duration_weeks: 2,
    url: "https://www.sans.org/cyber-security-courses/ciso-training/",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "t2",
    name: "Certified Information Systems Security Professional (CISSP) Prep",
    provider: "ISC2",
    format: "Online",
    cost_usd: 0,
    location_state: null,
    accreditation_body: "ISC2",
    duration_weeks: 12,
    url: "https://www.isc2.org/certifications/cissp",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "t3",
    name: "Cloud Security Architecture Bootcamp",
    provider: "Cloud Security Alliance",
    format: "Hybrid",
    cost_usd: 3500,
    location_state: "California",
    accreditation_body: "CSA",
    duration_weeks: 4,
    url: "https://cloudsecurityalliance.org/education/",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "t4",
    name: "Executive Cyber Risk Management",
    provider: "Carnegie Mellon SEI",
    format: "In-person",
    cost_usd: 5000,
    location_state: "Pennsylvania",
    accreditation_body: "CMU",
    duration_weeks: 1,
    url: "https://www.sei.cmu.edu/education-outreach/",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-03-15T00:00:00Z",
  },
  {
    id: "t5",
    name: "GIAC Security Leadership Certification (GSLC)",
    provider: "GIAC",
    format: "Online",
    cost_usd: 2499,
    location_state: null,
    accreditation_body: "GIAC",
    duration_weeks: 8,
    url: "https://www.giac.org/certifications/security-leadership/",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "t6",
    name: "Zero Trust Architecture Workshop",
    provider: "NIST / Cybersecurity Collaborative",
    format: "Hybrid",
    cost_usd: 1200,
    location_state: "Maryland",
    accreditation_body: "NIST",
    duration_weeks: 3,
    url: "https://www.nist.gov/cybersecurity",
    is_approved: true,
    custom_fields: {},
    created_at: "2024-05-01T00:00:00Z",
  },
];

const formats = ["All", "In-person", "Online", "Hybrid"];
const states = [
  "All",
  "California",
  "Maryland",
  "Pennsylvania",
  "Virginia",
  "New York",
  "Texas",
];
const accreditationBodies = [
  "All",
  "SANS",
  "ISC2",
  "CSA",
  "CMU",
  "GIAC",
  "NIST",
];
const durations = ["All", "1 week", "2-4 weeks", "5-8 weeks", "9+ weeks"];

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [accredFilter, setAccredFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [costFilter, setCostFilter] = useState("All");

  const filtered = useMemo(() => {
    let results = [...mockPrograms];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.provider && p.provider.toLowerCase().includes(q))
      );
    }
    if (formatFilter !== "All") {
      results = results.filter((p) => p.format === formatFilter);
    }
    if (stateFilter !== "All") {
      results = results.filter((p) => p.location_state === stateFilter);
    }
    if (accredFilter !== "All") {
      results = results.filter((p) => p.accreditation_body === accredFilter);
    }
    if (durationFilter !== "All") {
      results = results.filter((p) => {
        const w = p.duration_weeks ?? 0;
        switch (durationFilter) {
          case "1 week":
            return w <= 1;
          case "2-4 weeks":
            return w >= 2 && w <= 4;
          case "5-8 weeks":
            return w >= 5 && w <= 8;
          case "9+ weeks":
            return w >= 9;
          default:
            return true;
        }
      });
    }
    if (costFilter !== "All") {
      results = results.filter((p) => {
        const c = p.cost_usd ?? 0;
        switch (costFilter) {
          case "Free":
            return c === 0;
          case "Under $1,000":
            return c > 0 && c < 1000;
          case "$1,000 - $5,000":
            return c >= 1000 && c <= 5000;
          case "$5,000+":
            return c > 5000;
          default:
            return true;
        }
      });
    }

    return results;
  }, [search, formatFilter, stateFilter, accredFilter, durationFilter, costFilter]);

  const formatBadgeColor = (format: string | null) => {
    switch (format) {
      case "In-person":
        return "bg-green-100 text-green-800";
      case "Online":
        return "bg-blue-100 text-blue-800";
      case "Hybrid":
        return "bg-purple-100 text-purple-800";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            CISO Training Programs
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            Discover executive security training, certifications, and leadership
            programs
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
              placeholder="Search programs by name or provider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Select
              value={formatFilter}
              onValueChange={(val) => setFormatFilter(val as string)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={costFilter}
              onValueChange={(val) => setCostFilter(val as string)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Cost Range" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Free", "Under $1,000", "$1,000 - $5,000", "$5,000+"].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={stateFilter}
              onValueChange={(val) => setStateFilter(val as string)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={accredFilter}
              onValueChange={(val) => setAccredFilter(val as string)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Accreditation" />
              </SelectTrigger>
              <SelectContent>
                {accreditationBodies.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={durationFilter}
              onValueChange={(val) => setDurationFilter(val as string)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-[#0A0A0A]/50 py-12">
              No programs match your filters. Try adjusting your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((program) => (
                <Card key={program.id} className="bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-[#0A0A0A] leading-snug">
                        {program.name}
                      </CardTitle>
                      {program.format && (
                        <Badge
                          className={`shrink-0 ${formatBadgeColor(program.format)}`}
                        >
                          {program.format}
                        </Badge>
                      )}
                    </div>
                    {program.provider && (
                      <p className="text-sm text-[#0A0A0A]/60">
                        {program.provider}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]/70">
                        <DollarSign className="h-4 w-4" />
                        {program.cost_usd === 0
                          ? "Free"
                          : `$${program.cost_usd?.toLocaleString()}`}
                      </div>
                      {program.duration_weeks && (
                        <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]/70">
                          <Clock className="h-4 w-4" />
                          {program.duration_weeks}{" "}
                          {program.duration_weeks === 1 ? "week" : "weeks"}
                        </div>
                      )}
                    </div>
                    {program.accreditation_body && (
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs">
                          {program.accreditation_body}
                        </Badge>
                      </div>
                    )}
                    {program.url && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-navy text-navy hover:bg-navy/5"
                      >
                        <a
                          href={program.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn More
                          <ExternalLink className="h-3.5 w-3.5 ml-2" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
