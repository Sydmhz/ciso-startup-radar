"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Users,
  Building2,
  Shield,
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

  /* count stats for the KPI strip */
  const uniqueCompanies = new Set(cisos.map((c) => cleanCompany(c.company || ""))).size;
  const withLinkedin = cisos.filter((c) => c.linkedin_url).length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F4FA 40%, #E8EEF6 100%)" }}>
      {/* Header */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A0F1C 0%, #0F1B2E 30%, #1E3A5F 70%, #0A0F1C 100%)",
        }}
      >
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #0057FF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1E3A5F 0%, transparent 50%)",
        }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-[#0057FF]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Verified Network
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            CISO Directory
          </h1>
          <p className="text-white/40 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            {cisos.length} security leaders from Fortune 100 and leading enterprises
          </p>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="border-b border-[#E5E7EB]" style={{
        background: "linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)",
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB]">
            <div className="py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-3.5 w-3.5 text-[#0057FF]" />
                <span className="text-2xl font-bold text-[#0A0A0A]">{cisos.length}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#0A0A0A]/40 font-medium">CISOs</span>
            </div>
            <div className="py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="h-3.5 w-3.5 text-[#1E3A5F]" />
                <span className="text-2xl font-bold text-[#0A0A0A]">{uniqueCompanies}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#0A0A0A]/40 font-medium">Companies</span>
            </div>
            <div className="py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                <span className="text-2xl font-bold text-[#0A0A0A]">{withLinkedin}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#0A0A0A]/40 font-medium">Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6">
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
              className="pl-11 h-11 rounded-xl bg-white border-[#E5E7EB] shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
          <p className="text-center text-xs text-[#0A0A0A]/35 mt-3">
            Showing {filtered.length} of {cisos.length} CISOs
          </p>
        </div>
      </section>

      {/* Bloomberg-style List */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table header */}
          <div className="rounded-t-xl overflow-hidden shadow-sm">
            <div
              className="grid items-center px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                gridTemplateColumns: "1.2fr 1fr 1.8fr",
                background: "linear-gradient(135deg, #0A0F1C 0%, #1E3A5F 100%)",
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
            </div>
          </div>

          {/* Rows */}
          <div className="border-x border-b border-[#E5E7EB]/70 rounded-b-xl overflow-hidden shadow-sm bg-white">
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
                    className={`grid items-center px-5 py-3.5 border-b border-[#E5E7EB]/40 last:border-b-0 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#F0F4FF]/60 hover:to-[#F8FAFF]/60 group ${
                      isEven ? "bg-white" : "bg-[#F8FAFD]/60"
                    }`}
                    style={{
                      gridTemplateColumns: "1.2fr 1fr 1.8fr",
                    }}
                  >
                    {/* Name + LinkedIn icon as avatar */}
                    <div className="flex items-center gap-3 min-w-0">
                      {ciso.linkedin_url ? (
                        <a
                          href={ciso.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
                          }}
                          title={`View ${ciso.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4 text-white" />
                        </a>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #1E3A5F 0%, #0F2440 100%)",
                          }}
                        >
                          <Shield className="h-4 w-4 text-white/60" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-[#0A0A0A] truncate block">
                          {ciso.name}
                        </span>
                      </div>
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
                      <span className="text-sm text-[#0A0A0A]/65 truncate">
                        {ciso.company}
                      </span>
                    </div>

                    {/* Previous Companies */}
                    <div className="hidden md:block min-w-0">
                      {pastCompanies ? (
                        <span className="text-xs text-[#0A0A0A]/35 truncate block leading-relaxed">
                          {pastCompanies}
                        </span>
                      ) : (
                        <span className="text-xs text-[#0A0A0A]/15">—</span>
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
                className="rounded-lg"
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
                    className="rounded-lg"
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
                      ? "rounded-lg text-white"
                      : "rounded-lg"
                  }
                  style={
                    page === currentPage
                      ? { background: "linear-gradient(135deg, #1E3A5F 0%, #0057FF 100%)" }
                      : undefined
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
                    className="rounded-lg"
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
                className="rounded-lg"
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
