"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Linkedin, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CisoDirectoryEntry } from "@/lib/types";
import allCisos from "@/lib/data/cisos.json";

const cisos = allCisos as CisoDirectoryEntry[];

export default function CisosPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 30;

  const filtered = useMemo(() => {
    if (!search) return cisos;
    const q = search.toLowerCase();
    return cisos.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.previous_role && c.previous_role.toLowerCase().includes(q)) ||
        (c.custom_fields?.["Past Companies"] &&
          c.custom_fields["Past Companies"].toLowerCase().includes(q))
    );
  }, [search]);

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
      <section
        className="py-16 md:py-20 border-b border-white/10"
        style={{
          background:
            "linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
            Network
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            CISO Directory
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            {cisos.length} verified CISOs from Fortune 100 and leading
            enterprises
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0A0A]/40" />
            <Input
              placeholder="Search by name, company, or past role..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-11 rounded-lg bg-gray-50 border-[#E5E7EB]"
            />
          </div>
          <p className="text-center text-xs text-[#0A0A0A]/40 mt-3">
            Showing {filtered.length} of {cisos.length} CISOs
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paged.length === 0 ? (
            <p className="text-center text-[#0A0A0A]/50 py-12">
              No CISOs match your search. Try a different query.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map((ciso) => {
                const pastCompanies =
                  ciso.custom_fields?.["Past Companies"] ||
                  ciso.previous_role ||
                  "";
                return (
                  <div
                    key={ciso.id}
                    className="group relative border border-[#E5E7EB] rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:border-[#E5E7EB]/60"
                    style={{
                      background:
                        "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-sm shrink-0">
                          {ciso.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0A0A0A] text-sm truncate">
                            {ciso.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Building2 className="h-3 w-3 text-[#0A0A0A]/30 shrink-0" />
                            <p className="text-xs text-[#0A0A0A]/50 truncate">
                              {ciso.company}
                            </p>
                          </div>
                        </div>
                      </div>
                      {ciso.linkedin_url && (
                        <a
                          href={ciso.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full hover:bg-blue-50 transition-colors text-[#0A66C2] shrink-0"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {pastCompanies && (
                      <p className="mt-3 text-xs text-[#0A0A0A]/40 leading-relaxed line-clamp-1">
                        <span className="font-medium text-[#0A0A0A]/50">
                          Previously:
                        </span>{" "}
                        {pastCompanies}
                      </p>
                    )}
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
    </div>
  );
}
