"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CisoDirectoryEntry } from "@/lib/types";
import allCisos from "@/lib/data/cisos.json";

const cisos = allCisos as CisoDirectoryEntry[];

/* helper: extract clean company name (strip role notes like "(CSO)") */
function cleanCompany(raw: string): string {
  return raw.replace(/\s*\(.*?\)\s*$/, "").trim();
}

/* helper: get company logo from Google Favicon API */
function companyLogoUrl(company: string): string {
  const name = cleanCompany(company).toLowerCase().replace(/[^a-z0-9]/g, "");
  // Map well-known companies to their domains
  const domainMap: Record<string, string> = {
    apple: "apple.com", google: "google.com", meta: "meta.com", amazon: "amazon.com",
    microsoft: "microsoft.com", netflix: "netflix.com", nike: "nike.com",
    adobe: "adobe.com", intel: "intel.com", ibm: "ibm.com", oracle: "oracle.com",
    cisco: "cisco.com", salesforce: "salesforce.com", walmart: "walmart.com",
    jpmorgan: "jpmorgan.com", jpmorganchase: "jpmorganchase.com",
    goldmansachs: "goldmansachs.com", morganstanley: "morganstanley.com",
    bankofamerica: "bankofamerica.com", wellsfargo: "wellsfargo.com",
    citigroup: "citigroup.com", citi: "citigroup.com",
    unitedhealth: "unitedhealthgroup.com", unitedhealthgroup: "unitedhealthgroup.com",
    johnson: "jnj.com", johnsonjohnson: "jnj.com",
    procter: "pg.com", proctergamble: "pg.com",
    exxonmobil: "exxonmobil.com", chevron: "chevron.com",
    pfizer: "pfizer.com", merck: "merck.com", abbvie: "abbvie.com",
    cocacola: "coca-cola.com", pepsico: "pepsico.com",
    disney: "disney.com", waltdisney: "disney.com",
    boeing: "boeing.com", lockheedmartin: "lockheedmartin.com",
    generalmotors: "gm.com", ford: "ford.com", tesla: "tesla.com",
    att: "att.com", verizon: "verizon.com", tmobile: "t-mobile.com",
    comcast: "comcast.com", bestbuy: "bestbuy.com",
    homedepot: "homedepot.com", lowes: "lowes.com", target: "target.com",
    costco: "costco.com", kroger: "kroger.com",
    ups: "ups.com", fedex: "fedex.com",
    dollartree: "dollartree.com", halliburton: "halliburton.com",
    rtx: "rtx.com", raytheon: "rtx.com",
    generaldynamics: "gd.com", northropgrumman: "northropgrumman.com",
    cvshealth: "cvshealth.com", cvs: "cvshealth.com",
    unitedparcelservice: "ups.com",
    deltairlines: "delta.com", delta: "delta.com",
    americanexpress: "americanexpress.com", amex: "americanexpress.com",
    visa: "visa.com", mastercard: "mastercard.com",
    paypal: "paypal.com", stripe: "stripe.com",
    uber: "uber.com", lyft: "lyft.com", airbnb: "airbnb.com",
    travelers: "travelers.com", allstate: "allstate.com",
    coupang: "coupang.com", paramount: "paramount.com", paramountglobal: "paramount.com",
    freddiemac: "freddiemac.com", mckesson: "mckesson.com",
    mondelezinternational: "mondelezinternational.com", mondelez: "mondelezinternational.com",
    livenation: "livenationentertainment.com", livenationentertainment: "livenationentertainment.com",
    bakerhughes: "bakerhughes.com", centene: "centene.com", corteva: "corteva.com",
    tjx: "tjx.com", tdsynnex: "tdsynnex.com", colgatepalmolive: "colgatepalmolive.com",
    colgate: "colgatepalmolive.com", ge: "ge.com", generalelectric: "ge.com",
    honeywell: "honeywell.com", "3m": "3m.com", caterpillar: "caterpillar.com",
    deere: "deere.com", johndeere: "deere.com",
    americanairlines: "aa.com", unitedairlines: "united.com",
    southwestairlines: "southwest.com", southwest: "southwest.com",
    starbucks: "starbucks.com", mcdonalds: "mcdonalds.com",
    phillips66: "phillips66.com", marathon: "marathonpetroleum.com",
    conocophillips: "conocophillips.com", valero: "valero.com",
    humana: "humana.com", anthem: "anthem.com", elevance: "elevancehealth.com",
    elevancehealth: "elevancehealth.com", cigna: "cigna.com",
    prudential: "prudential.com", metlife: "metlife.com",
    charlesschwab: "schwab.com", schwab: "schwab.com",
    fidelity: "fidelity.com", blackrock: "blackrock.com",
    statestreet: "statestreet.com", bnymellon: "bnymellon.com",
    usbank: "usbank.com", pnc: "pnc.com", truist: "truist.com",
    capitalone: "capitalone.com", discover: "discover.com",
    oldrepublic: "oldrepublictitle.com", oldrepublictitle: "oldrepublictitle.com",
    wps: "wps.com",
    cargill: "cargill.com", adm: "adm.com",
    hershey: "hersheys.com", hersheys: "hersheys.com",
    kraft: "kraftheinzcompany.com", kraftheinz: "kraftheinzcompany.com",
    generalmills: "generalmills.com", kellogg: "kelloggs.com",
    tyson: "tysonfoods.com", tysonfoods: "tysonfoods.com",
    lockheed: "lockheedmartin.com",
    northrop: "northropgrumman.com",
    lm: "lockheedmartin.com",
    raytheontech: "rtx.com",
    baesystems: "baesystems.com", bae: "baesystems.com",
    leidos: "leidos.com", saic: "saic.com", booz: "boozallen.com",
    boozallen: "boozallen.com", boozallenhamilton: "boozallen.com",
    zoom: "zoom.us", slack: "slack.com", dropbox: "dropbox.com",
    snowflake: "snowflake.com", crowdstrike: "crowdstrike.com",
    paloalto: "paloaltonetworks.com", paloaltonetworks: "paloaltonetworks.com",
    fortinet: "fortinet.com", zscaler: "zscaler.com",
    splunk: "splunk.com", datadog: "datadoghq.com",
    servicenow: "servicenow.com", workday: "workday.com",
    twilio: "twilio.com", okta: "okta.com",
    crowdstrike: "crowdstrike.com",
    symantec: "broadcom.com", broadcom: "broadcom.com",
    vmware: "vmware.com", dell: "dell.com",
    hp: "hp.com", hpe: "hpe.com", hewlettpackard: "hpe.com",
    lenovo: "lenovo.com", samsung: "samsung.com",
    qualcomm: "qualcomm.com", amd: "amd.com", nvidia: "nvidia.com",
    micron: "micron.com", texasinstruments: "ti.com",
  };
  const domain = domainMap[name] || `${cleanCompany(company).toLowerCase().replace(/\s+/g, "")}.com`;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

/* helper: generate DiceBear avatar URL for nice initials */
function avatarUrl(name: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e3a5f&textColor=ffffff&fontSize=40&fontFamily=Arial&fontWeight=600`;
}

type SortField = "name" | "company";
type SortDir = "asc" | "desc";

export default function CisosPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const perPage = 40;

  const filtered = useMemo(() => {
    let results = [...cisos];
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.company && c.company.toLowerCase().includes(q)) ||
          (c.previous_role && c.previous_role.toLowerCase().includes(q)) ||
          (c.custom_fields?.["Past Companies"] &&
            c.custom_fields["Past Companies"].toLowerCase().includes(q))
      );
    }
    results.sort((a, b) => {
      const aVal = (sortField === "name" ? a.name : a.company) || "";
      const bVal = (sortField === "name" ? b.name : b.company) || "";
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return results;
  }, [search, sortField, sortDir]);

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

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setCurrentPage(1);
  }

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

      {/* Bloomberg-style List */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table header */}
          <div className="border border-[#E5E7EB] rounded-t-xl overflow-hidden">
            <div
              className="grid items-center px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                gridTemplateColumns: "1fr 1fr 1.5fr 48px",
                background:
                  "linear-gradient(135deg, #0A0F1C 0%, #111827 100%)",
              }}
            >
              <button
                onClick={() => toggleSort("name")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-left"
              >
                Name
                <ArrowUpDown className="h-3 w-3" />
              </button>
              <button
                onClick={() => toggleSort("company")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-left"
              >
                Current Company
                <ArrowUpDown className="h-3 w-3" />
              </button>
              <span className="text-white/60 hidden md:block">
                Previous Companies
              </span>
              <span className="text-white/60 text-center">Link</span>
            </div>
          </div>

          {/* Rows */}
          <div className="border-x border-b border-[#E5E7EB] rounded-b-xl overflow-hidden">
            {paged.length === 0 ? (
              <p className="text-center text-[#0A0A0A]/50 py-12">
                No CISOs match your search.
              </p>
            ) : (
              paged.map((ciso, idx) => {
                const pastCompanies =
                  ciso.custom_fields?.["Past Companies"] ||
                  ciso.previous_role ||
                  "";
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={ciso.id}
                    className={`grid items-center px-5 py-3.5 border-b border-[#E5E7EB]/50 last:border-b-0 transition-colors hover:bg-[#F0F4FF]/50 ${
                      isEven ? "bg-white" : "bg-[#F8FAFC]/50"
                    }`}
                    style={{
                      gridTemplateColumns: "1fr 1fr 1.5fr 48px",
                    }}
                  >
                    {/* Name + Photo */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={avatarUrl(ciso.name)}
                          alt={ciso.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#0A0A0A] truncate">
                        {ciso.name}
                      </span>
                    </div>

                    {/* Current Company */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={companyLogoUrl(ciso.company || "")}
                        alt=""
                        className="w-5 h-5 rounded object-contain shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        loading="lazy"
                      />
                      <span className="text-sm text-[#0A0A0A]/70 truncate">
                        {ciso.company}
                      </span>
                    </div>

                    {/* Previous Companies */}
                    <div className="hidden md:block min-w-0">
                      {pastCompanies ? (
                        <span className="text-xs text-[#0A0A0A]/40 truncate block">
                          {pastCompanies}
                        </span>
                      ) : (
                        <span className="text-xs text-[#0A0A0A]/20">—</span>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="flex justify-center">
                      {ciso.linkedin_url ? (
                        <a
                          href={ciso.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full hover:bg-blue-50 transition-colors text-[#0A66C2]"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-[#0A0A0A]/15">
                          <Linkedin className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
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
