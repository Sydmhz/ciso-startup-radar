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
import allPrograms from "@/lib/data/training.json";

const programs = allPrograms as TrainingProgram[];

// Derive unique formats from real data
const formatSet = new Set(programs.map((p) => p.format).filter(Boolean));
const formats = ["All", ...Array.from(formatSet).sort()] as string[];

// Derive unique accreditation bodies from real data
const accredSet = new Set(
  programs.map((p) => p.accreditation_body).filter(Boolean)
);
const accreditationBodies = ["All", ...Array.from(accredSet).sort()] as string[];

export default function TrainingPage() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState("All");
  const [accredFilter, setAccredFilter] = useState("All");

  const filtered = useMemo(() => {
    let results = [...programs];

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
    if (accredFilter !== "All") {
      results = results.filter((p) => p.accreditation_body === accredFilter);
    }

    return results;
  }, [search, formatFilter, accredFilter]);

  const formatBadgeColor = (format: string | null) => {
    switch (format) {
      case "Boot Camp":
        return "bg-red-100 text-red-800";
      case "Certificate Program":
        return "bg-green-100 text-green-800";
      case "Coaching":
        return "bg-yellow-100 text-yellow-800";
      case "Executive Education":
        return "bg-purple-100 text-purple-800";
      case "Learning Path":
        return "bg-blue-100 text-blue-800";
      case "Professional Certification":
        return "bg-indigo-100 text-indigo-800";
      case "Summit/Conference":
        return "bg-pink-100 text-pink-800";
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
            {programs.length} executive security training programs,
            certifications, and leadership courses
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
              <SelectTrigger className="w-[200px]">
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
              value={accredFilter}
              onValueChange={(val) => setAccredFilter(val as string)}
            >
              <SelectTrigger className="w-[220px]">
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
                <Card key={program.id} className="bg-white flex flex-col">
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
                  <CardContent className="flex-1 flex flex-col">
                    {/* Cost and Duration */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {program.cost_usd && (
                        <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]/70">
                          <DollarSign className="h-4 w-4" />
                          {program.cost_usd}
                        </div>
                      )}
                      {program.duration_weeks && (
                        <div className="flex items-center gap-1.5 text-sm text-[#0A0A0A]/70">
                          <Clock className="h-4 w-4" />
                          {program.duration_weeks}
                        </div>
                      )}
                    </div>

                    {/* Accreditation */}
                    {program.accreditation_body &&
                      program.accreditation_body !== "None" && (
                        <div className="mb-4">
                          <Badge variant="outline" className="text-xs">
                            {program.accreditation_body}
                          </Badge>
                        </div>
                      )}

                    {/* Custom Fields */}
                    {program.custom_fields?.["Audience Level"] && (
                      <p className="text-xs text-[#0A0A0A]/50 mb-1">
                        Audience:{" "}
                        <span className="font-medium text-[#0A0A0A]/70">
                          {program.custom_fields["Audience Level"]}
                        </span>
                      </p>
                    )}
                    {program.custom_fields?.["Delivery Mode"] &&
                      program.custom_fields["Delivery Mode"] !==
                        "Not disclosed" && (
                        <p className="text-xs text-[#0A0A0A]/50 mb-3">
                          Delivery:{" "}
                          <span className="font-medium text-[#0A0A0A]/70">
                            {program.custom_fields["Delivery Mode"]}
                          </span>
                        </p>
                      )}

                    {program.custom_fields?.["Description"] && (
                      <p className="text-sm text-[#0A0A0A]/70 line-clamp-3 mb-3">
                        {program.custom_fields["Description"]}
                      </p>
                    )}

                    {program.custom_fields?.["Why It Matters"] && (
                      <p className="text-xs text-[#0A0A0A]/50 line-clamp-2 mb-4">
                        <span className="font-medium">Why it matters:</span>{" "}
                        {program.custom_fields["Why It Matters"]}
                      </p>
                    )}

                    {/* Learn More Button */}
                    <div className="mt-auto">
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
                    </div>
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
